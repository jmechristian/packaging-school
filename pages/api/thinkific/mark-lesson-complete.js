/**
 * Thinkific support: lesson completion may require user-scoped auth ("secure token
 * generation for each user session"). We sign the same SSO JWT as generateJWT
 * (NEXT_PUBLIC_API_KEY) and try GraphQL with that Bearer token before the
 * public GraphQL API key (NEXT_THINKIFIC_PUBLIC_API_KEY).
 *
 * Order: user JWT → markLessonComplete, then API key → markLessonComplete,
 * then user JWT → viewLesson, then API key → viewLesson (first success wins).
 */
import { signThinkificSsoUserToken } from '../../../helpers/thinkificUserJwt';

const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';

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

function isSuccessfulGraphql(response, json, mutationKey) {
  if (!response.ok) return false;
  const { hasUserErrors, hasGraphqlErrors } = summarizePayload(json, mutationKey);
  return !hasUserErrors && !hasGraphqlErrors;
}

async function postGraphql(bearerToken, query, variables) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  return { response, json };
}

function parseIdentity(body) {
  const email = (body?.email ?? '').trim() || null;
  const first_name = (
    body?.first_name ??
    body?.firstName ??
    ''
  )
    .toString()
    .trim();
  const last_name = (body?.last_name ?? body?.lastName ?? '').toString().trim();
  return { email, first_name, last_name };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body || {};
  const { lessonId: rawLessonId } = body;
  const lessonId = normalizeLessonId(rawLessonId);
  const { email, first_name, last_name } = parseIdentity(body);

  if (!lessonId) {
    return res.status(400).json({
      message: 'lessonId is required',
      hint:
        'Send JSON: { "lessonId": "...", "email": "...", "first_name": "...", "last_name": "..." } — identity fields enable per-session SSO JWT for GraphQL.',
    });
  }

  const apiKey = process.env.NEXT_THINKIFIC_PUBLIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      message: 'Server misconfiguration',
      detail: 'NEXT_THINKIFIC_PUBLIC_API_KEY is not set',
    });
  }

  const userJwt =
    email && first_name && last_name
      ? signThinkificSsoUserToken({ email, first_name, last_name })
      : null;

  const attempts = [];
  let skipMarkLessonCompleteApiKey = false;

  try {
    if (userJwt) {
      const r = await postGraphql(userJwt, MUTATION_MARK_LESSON_COMPLETE, { lessonId });
      attempts.push({
        step: 'markLessonComplete',
        authorization: 'user_sso_jwt',
        httpStatus: r.response.status,
        summary: summarizePayload(r.json, 'markLessonComplete'),
      });
      if (isMarkLessonCompleteNotInSchema(r.json)) {
        skipMarkLessonCompleteApiKey = true;
      } else if (isSuccessfulGraphql(r.response, r.json, 'markLessonComplete')) {
        return res.status(200).json({
          httpStatus: 200,
          email,
          first_name,
          last_name,
          lessonId,
          usedMutation: 'markLessonComplete',
          authorization: 'user_sso_jwt',
          note: 'GraphQL authorized with Thinkific SSO user JWT (same signing as generateJWT).',
          attempts,
          graphql: r.json,
        });
      }
    }

    if (!skipMarkLessonCompleteApiKey) {
      const r = await postGraphql(apiKey, MUTATION_MARK_LESSON_COMPLETE, { lessonId });
      attempts.push({
        step: 'markLessonComplete',
        authorization: 'api_key',
        httpStatus: r.response.status,
        summary: summarizePayload(r.json, 'markLessonComplete'),
      });
      if (isMarkLessonCompleteNotInSchema(r.json)) {
        skipMarkLessonCompleteApiKey = true;
      } else if (isSuccessfulGraphql(r.response, r.json, 'markLessonComplete')) {
        return res.status(200).json({
          httpStatus: 200,
          email,
          first_name,
          last_name,
          lessonId,
          usedMutation: 'markLessonComplete',
          authorization: 'api_key',
          note: userJwt
            ? 'markLessonComplete succeeded with public API key (user JWT attempt did not succeed).'
            : 'GraphQL authorized with public API key. Add email + first_name + last_name to try user SSO JWT first.',
          attempts,
          graphql: r.json,
        });
      }
    }

    if (userJwt) {
      const r = await postGraphql(userJwt, MUTATION_VIEW_LESSON, { lessonId });
      attempts.push({
        step: 'viewLesson',
        authorization: 'user_sso_jwt',
        httpStatus: r.response.status,
        summary: summarizePayload(r.json, 'viewLesson'),
      });
      if (isSuccessfulGraphql(r.response, r.json, 'viewLesson')) {
        return res.status(200).json({
          httpStatus: 200,
          email,
          first_name,
          last_name,
          lessonId,
          usedMutation: 'viewLesson',
          authorization: 'user_sso_jwt',
          note: 'markLessonComplete not available or failed; viewLesson OK with user SSO JWT. Stable schema uses viewLesson until support mutation ships.',
          attempts,
          graphql: r.json,
        });
      }
    }

    const r = await postGraphql(apiKey, MUTATION_VIEW_LESSON, { lessonId });
    attempts.push({
      step: 'viewLesson',
      authorization: 'api_key',
      httpStatus: r.response.status,
      summary: summarizePayload(r.json, 'viewLesson'),
    });

    const { hasUserErrors, hasGraphqlErrors } = summarizePayload(r.json, 'viewLesson');
    const ok = isSuccessfulGraphql(r.response, r.json, 'viewLesson');

    if (r.response.ok && ok) {
      return res.status(200).json({
        httpStatus: 200,
        email,
        first_name,
        last_name,
        lessonId,
        usedMutation: 'viewLesson',
        authorization: 'api_key',
        note: 'Fell back to viewLesson with API key. Provide full identity to test user JWT earlier in the chain.',
        attempts,
        graphql: r.json,
      });
    }

    const status =
      !r.response.ok ? r.response.status : hasGraphqlErrors || hasUserErrors ? 422 : 500;

    return res.status(status).json({
      httpStatus: status,
      email,
      first_name,
      last_name,
      lessonId,
      usedMutation: 'viewLesson',
      authorization: 'api_key',
      note: 'All attempts failed or returned errors; see attempts and graphql.',
      attempts,
      graphql: r.json,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Request failed',
      email,
      first_name,
      last_name,
      lessonId,
      attempts,
    });
  }
}
