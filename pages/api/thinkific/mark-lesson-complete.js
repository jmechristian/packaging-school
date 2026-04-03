/**
 * We try the SSO user JWT (same signing as generateJWT) first, then the GraphQL
 * API key. Thinkific typically returns 401 for the SSO JWT on stable/graphql:
 * that token is for the browser SSO redirect, not Authorization on this API.
 * Learner-scoped mutations need whatever Thinkific documents (often API key +
 * user id in variables, OAuth, or a future endpoint)—confirm with support.
 *
 * Order: user JWT → markLessonComplete, API key → markLessonComplete,
 * user JWT → viewLesson, API key → viewLesson (first success wins).
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
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { _parseError: true, _bodyPreview: String(text).slice(0, 500) };
  }
  return { response, json };
}

function attemptRecord(step, authorization, r, mutationKey) {
  return {
    step,
    authorization,
    httpStatus: r.response.status,
    summary: summarizePayload(r.json, mutationKey),
    graphql: r.json,
  };
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
  /** True if any user_sso_jwt call got 401 — SSO JWT is not for this GraphQL API. */
  let userJwtGot401 = false;

  try {
    if (userJwt) {
      const r = await postGraphql(userJwt, MUTATION_MARK_LESSON_COMPLETE, { lessonId });
      if (r.response.status === 401) userJwtGot401 = true;
      attempts.push(
        attemptRecord('markLessonComplete', 'user_sso_jwt', r, 'markLessonComplete')
      );
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
      attempts.push(
        attemptRecord('markLessonComplete', 'api_key', r, 'markLessonComplete')
      );
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
      if (r.response.status === 401) userJwtGot401 = true;
      attempts.push(attemptRecord('viewLesson', 'user_sso_jwt', r, 'viewLesson'));
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
    attempts.push(attemptRecord('viewLesson', 'api_key', r, 'viewLesson'));

    const { hasUserErrors, hasGraphqlErrors } = summarizePayload(r.json, 'viewLesson');
    const ok = isSuccessfulGraphql(r.response, r.json, 'viewLesson');

    if (r.response.ok && ok) {
      const note = userJwtGot401
        ? 'viewLesson succeeded with GraphQL API key (NEXT_THINKIFIC_PUBLIC_API_KEY). SSO user JWT returned 401: that token is for the browser SSO redirect, not Authorization on api.thinkific.com/stable/graphql. Learner-specific completion may need a different mechanism from Thinkific. markLessonComplete is not in this schema yet.'
        : 'Fell back to viewLesson with API key.';
      return res.status(200).json({
        httpStatus: 200,
        email,
        first_name,
        last_name,
        lessonId,
        usedMutation: 'viewLesson',
        authorization: 'api_key',
        note,
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
