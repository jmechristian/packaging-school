/**
 * Thinkific support provided `markLessonComplete` (not yet in public beta GraphQL).
 * We call it first; if the schema does not expose that field yet, we fall back to
 * `viewLesson`, which exists on stable/graphql today.
 *
 * Email is not part of these mutations; we echo it in JSON for the test harness only.
 */
const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';

/** @see Thinkific support — public beta may not include this field yet */
const MUTATION_MARK_LESSON_COMPLETE = `
  mutation MarkLessonComplete($lessonId: ID!) {
    markLessonComplete(input: { clientMutationId: "lessonUpdater", lessonId: $lessonId }) {
      clientMutationId
      course {
        id
      }
      lesson {
        id
        title
      }
      userErrors {
        code
        message
        path
      }
    }
  }
`;

const MUTATION_VIEW_LESSON = `
  mutation ViewLesson($lessonId: ID!) {
    viewLesson(input: { clientMutationId: "lessonSandbox", lessonId: $lessonId }) {
      clientMutationId
      lesson {
        id
        title
      }
      userErrors {
        code
        message
        path
      }
    }
  }
`;

function normalizeLessonId(raw) {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  return s.length ? s : null;
}

function isMarkLessonCompleteNotInSchema(json) {
  const errs = json?.errors;
  if (!Array.isArray(errs) || errs.length === 0) return false;
  return errs.some(
    (e) =>
      e?.extensions?.code === 'GRAPHQL_VALIDATION_FAILED' &&
      typeof e?.message === 'string' &&
      e.message.includes('markLessonComplete')
  );
}

function summarizePayload(json, mutationKey) {
  const payload = json?.data?.[mutationKey];
  const userErrors = payload?.userErrors;
  const graphqlErrors = json?.errors;
  const hasUserErrors = userErrors?.length > 0;
  const hasGraphqlErrors = graphqlErrors?.length > 0;
  return { payload, userErrors, graphqlErrors, hasUserErrors, hasGraphqlErrors };
}

async function postGraphql(apiKey, query, variables) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  return { response, json };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { lessonId: rawLessonId, email } = req.body || {};
  const lessonId = normalizeLessonId(rawLessonId);

  if (!lessonId) {
    return res.status(400).json({
      message: 'lessonId is required',
      hint: 'Send JSON: { "lessonId": "<Thinkific lesson ID>", "email": "optional" }',
    });
  }

  const apiKey = process.env.NEXT_THINKIFIC_PUBLIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      message: 'Server misconfiguration',
      detail: 'NEXT_THINKIFIC_PUBLIC_API_KEY is not set',
    });
  }

  const emailOut = email?.trim() || null;

  try {
    let usedMutation = 'markLessonComplete';
    let attemptNote =
      'Called markLessonComplete (support); if missing from schema, fell back to viewLesson.';

    let { response, json } = await postGraphql(apiKey, MUTATION_MARK_LESSON_COMPLETE, {
      lessonId,
    });

    if (isMarkLessonCompleteNotInSchema(json)) {
      usedMutation = 'viewLesson';
      attemptNote =
        'markLessonComplete is not on this GraphQL schema yet (per Thinkific: not in public beta); used viewLesson fallback.';
      const second = await postGraphql(apiKey, MUTATION_VIEW_LESSON, { lessonId });
      response = second.response;
      json = second.json;
    }

    const mutationKey = usedMutation === 'markLessonComplete' ? 'markLessonComplete' : 'viewLesson';
    const { hasUserErrors, hasGraphqlErrors } = summarizePayload(json, mutationKey);

    if (!response.ok) {
      return res.status(response.status).json({
        httpStatus: response.status,
        email: emailOut,
        lessonId,
        usedMutation,
        note: attemptNote,
        graphql: json,
      });
    }

    if (hasGraphqlErrors || hasUserErrors) {
      return res.status(422).json({
        httpStatus: 422,
        email: emailOut,
        lessonId,
        usedMutation,
        note: attemptNote,
        graphql: json,
      });
    }

    return res.status(200).json({
      httpStatus: 200,
      email: emailOut,
      lessonId,
      usedMutation,
      note: attemptNote,
      graphql: json,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Request failed',
      email: emailOut,
      lessonId,
    });
  }
}
