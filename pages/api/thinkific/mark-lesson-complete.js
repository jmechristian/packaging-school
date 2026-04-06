/**
 * Working route confirmed by Thinkific support:
 * - Endpoint: https://api.thinkific.com/beta/graphql
 * - Auth: GraphQL API key bearer (NEXT_THINKIFIC_PUBLIC_API_KEY)
 * - Mutation: markLessonComplete
 */

const GRAPHQL_URL = 'https://api.thinkific.com/beta/graphql';

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

const MUTATION_MARK_LESSON_INCOMPLETE = `
  mutation MarkLessonIncomplete($lessonId: ID!) {
    markLessonIncomplete(input: { clientMutationId: "lessonResetter", lessonId: $lessonId }) {
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

function summarizePayload(json, mutationKey) {
  const payload = json?.data?.[mutationKey];
  const userErrors = payload?.userErrors;
  const graphqlErrors = json?.errors;
  const hasUserErrors = userErrors?.length > 0;
  const hasGraphqlErrors = graphqlErrors?.length > 0;
  return { payload, userErrors, graphqlErrors, hasUserErrors, hasGraphqlErrors };
}

function hasUserErrorCode(json, mutationKey, code) {
  const userErrors = json?.data?.[mutationKey]?.userErrors;
  return Array.isArray(userErrors) && userErrors.some((e) => e?.code === code);
}

async function postGraphql(query, variables, apiKey) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { _parseError: true, _bodyPreview: String(text).slice(0, 500) };
  }
  return { response, json };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body || {};
  const { lessonId: rawLessonId, email } = body;
  const lessonId = normalizeLessonId(rawLessonId);
  const forceRecomplete = Boolean(body.forceRecomplete);

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

  try {
    const r = await postGraphql(MUTATION_MARK_LESSON_COMPLETE, { lessonId }, apiKey);
    let { hasUserErrors, hasGraphqlErrors } = summarizePayload(r.json, 'markLessonComplete');

    if (!r.response.ok) {
      return res.status(r.response.status).json({
        httpStatus: r.response.status,
        email: email?.trim() || null,
        lessonId,
        usedMutation: 'markLessonComplete',
        authorization: 'api_key',
        note: 'Request failed at Thinkific beta/graphql.',
        forceRecomplete,
        graphql: r.json,
      });
    }

    // Optional test helper: if already complete, reset then complete again
    if (
      forceRecomplete &&
      hasUserErrors &&
      hasUserErrorCode(r.json, 'markLessonComplete', 'ALREADY_COMPLETE')
    ) {
      const resetRes = await postGraphql(
        MUTATION_MARK_LESSON_INCOMPLETE,
        { lessonId },
        apiKey
      );
      const resetSummary = summarizePayload(resetRes.json, 'markLessonIncomplete');

      if (!resetRes.response.ok || resetSummary.hasGraphqlErrors || resetSummary.hasUserErrors) {
        return res.status(422).json({
          httpStatus: 422,
          email: email?.trim() || null,
          lessonId,
          usedMutation: 'markLessonIncomplete',
          authorization: 'api_key',
          forceRecomplete,
          note: 'Re-complete requested, but markLessonIncomplete failed.',
          graphql: {
            markLessonCompleteInitial: r.json,
            markLessonIncomplete: resetRes.json,
          },
        });
      }

      const second = await postGraphql(MUTATION_MARK_LESSON_COMPLETE, { lessonId }, apiKey);
      const secondSummary = summarizePayload(second.json, 'markLessonComplete');
      hasUserErrors = secondSummary.hasUserErrors;
      hasGraphqlErrors = secondSummary.hasGraphqlErrors;

      if (!second.response.ok || hasGraphqlErrors || hasUserErrors) {
        return res.status(422).json({
          httpStatus: 422,
          email: email?.trim() || null,
          lessonId,
          usedMutation: 'markLessonComplete',
          authorization: 'api_key',
          forceRecomplete,
          note: 'markLessonIncomplete succeeded, but second markLessonComplete failed.',
          graphql: {
            markLessonCompleteInitial: r.json,
            markLessonIncomplete: resetRes.json,
            markLessonCompleteSecond: second.json,
          },
        });
      }

      return res.status(200).json({
        httpStatus: 200,
        email: email?.trim() || null,
        lessonId,
        usedMutation: 'markLessonComplete',
        authorization: 'api_key',
        forceRecomplete,
        note: 'Lesson was already complete; ran markLessonIncomplete then markLessonComplete successfully.',
        graphql: {
          markLessonCompleteInitial: r.json,
          markLessonIncomplete: resetRes.json,
          markLessonCompleteSecond: second.json,
        },
      });
    }

    if (hasGraphqlErrors || hasUserErrors) {
      return res.status(422).json({
        httpStatus: 422,
        email: email?.trim() || null,
        lessonId,
        usedMutation: 'markLessonComplete',
        authorization: 'api_key',
        forceRecomplete,
        note: 'GraphQL returned errors/userErrors.',
        graphql: r.json,
      });
    }

    return res.status(200).json({
      httpStatus: 200,
      email: email?.trim() || null,
      lessonId,
      usedMutation: 'markLessonComplete',
      authorization: 'api_key',
      forceRecomplete,
      note: 'markLessonComplete succeeded with beta/graphql + API key.',
      graphql: r.json,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Request failed',
      email: email?.trim() || null,
      lessonId,
    });
  }
}
