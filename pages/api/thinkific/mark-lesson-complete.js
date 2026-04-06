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

function isSuccessfulGraphql(response, json, mutationKey) {
  if (!response.ok) return false;
  const { hasUserErrors, hasGraphqlErrors } = summarizePayload(json, mutationKey);
  return !hasUserErrors && !hasGraphqlErrors;
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
    const { hasUserErrors, hasGraphqlErrors } = summarizePayload(
      r.json,
      'markLessonComplete'
    );

    if (!r.response.ok) {
      return res.status(r.response.status).json({
        httpStatus: r.response.status,
        email: email?.trim() || null,
        lessonId,
        usedMutation: 'markLessonComplete',
        authorization: 'api_key',
        note: 'Request failed at Thinkific beta/graphql.',
        graphql: r.json,
      });
    }

    if (hasGraphqlErrors || hasUserErrors) {
      return res.status(422).json({
        httpStatus: 422,
        email: email?.trim() || null,
        lessonId,
        usedMutation: 'markLessonComplete',
        authorization: 'api_key',
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
