const GRAPHQL_URL = 'https://api.thinkific.com/beta/graphql';

const QUERY_USER_GID = `
  query UserByEmailForLockStatus($email: EmailAddress!) {
    userByEmail(email: $email) {
      id
      gid
      email
      firstName
      lastName
    }
  }
`;

const QUERY_LESSON_LOCK_STATUS = `
  query LessonLockStatusByUser($lessonId: ID!, $userGid: ID!) {
    lesson(id: $lessonId) {
      id
      title
      lockStatusByUserGid(userGid: $userGid) {
        locked
        lockedReason
        releaseDate
      }
    }
  }
`;

async function postGraphql(apiKey, query, variables) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json().catch(() => ({}));
  return { response, json };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const lessonId = req.query.lessonId?.toString()?.trim();
  const email = req.query.email?.toString()?.trim();

  if (!lessonId || !email) {
    return res.status(400).json({
      message: 'lessonId and email are required',
      hint: 'GET /api/thinkific/get-lesson-lock-status?lessonId=...&email=...',
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
    const userRes = await postGraphql(apiKey, QUERY_USER_GID, { email });
    const user = userRes.json?.data?.userByEmail || null;

    if (!userRes.response.ok) {
      return res.status(userRes.response.status).json({
        message: 'Failed to query user',
        graphql: userRes.json,
      });
    }

    if (!user) {
      return res.status(404).json({
        message: 'Thinkific user not found for email',
        email,
        graphql: userRes.json,
      });
    }

    const lessonRes = await postGraphql(apiKey, QUERY_LESSON_LOCK_STATUS, {
      lessonId,
      userGid: user.gid,
    });

    if (!lessonRes.response.ok) {
      return res.status(lessonRes.response.status).json({
        message: 'Failed to query lesson lock status',
        email,
        lessonId,
        user,
        graphql: lessonRes.json,
      });
    }

    return res.status(200).json({
      email,
      lessonId,
      user,
      lesson: lessonRes.json?.data?.lesson || null,
      graphql: lessonRes.json,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Request failed',
      email,
      lessonId,
    });
  }
}
