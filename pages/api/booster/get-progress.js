const APPSYNC_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const APPSYNC_API_KEY = process.env.GRAPHQL_API_KEY;

const QUERY_PROGRESS_BY_USER = `
  query BoosterProgressByUser($userId: ID!, $limit: Int) {
    boosterProgressByUser(userId: $userId, limit: $limit) {
      items {
        id
        thinkificCourseId
        courseTitle
        completedLessonIds
        completedLessonTitles
        totalLessonCount
        percentComplete
        milestonesIssued
        updatedAt
      }
    }
  }
`;

const QUERY_CODES_BY_USER = `
  query BoosterCodesByUser($userId: ID!, $limit: Int) {
    boosterCodesByUser(userId: $userId, limit: $limit) {
      items {
        id
        thinkificCourseId
        milestonePercent
        code
        issuedAt
        redeemedAt
        isRedeemed
      }
    }
  }
`;

async function appSync(query, variables) {
  const response = await fetch(APPSYNC_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': APPSYNC_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json().catch(() => ({}));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!APPSYNC_ENDPOINT || !APPSYNC_API_KEY) {
    return res.status(500).json({ message: 'Missing GraphQL endpoint configuration.' });
  }

  const userId = String(req.query?.userId || '').trim();
  if (!userId) {
    return res.status(400).json({ message: 'userId is required.' });
  }

  try {
    const [progressJson, codesJson] = await Promise.all([
      appSync(QUERY_PROGRESS_BY_USER, { userId, limit: 100 }),
      appSync(QUERY_CODES_BY_USER, { userId, limit: 200 }),
    ]);

    const progress = progressJson?.data?.boosterProgressByUser?.items || [];
    const codes = codesJson?.data?.boosterCodesByUser?.items || [];

    return res.status(200).json({ message: 'success', progress, codes });
  } catch (error) {
    return res.status(500).json({ message: error?.message || 'Failed to load booster progress.' });
  }
}
