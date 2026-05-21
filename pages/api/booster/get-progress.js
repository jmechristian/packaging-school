import { API } from 'aws-amplify';

const QUERY_PROGRESS_BY_USER = `
  query ListBoosterCourseProgresses($filter: ModelBoosterCourseProgressFilterInput, $limit: Int) {
    listBoosterCourseProgresses(filter: $filter, limit: $limit) {
      items {
        id
        userId
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
  query ListBoosterDiscountCodes($filter: ModelBoosterDiscountCodeFilterInput, $limit: Int) {
    listBoosterDiscountCodes(filter: $filter, limit: $limit) {
      items {
        id
        userId
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
  try {
    const result = await API.graphql({ query, variables });
    return {
      data: result?.data || null,
      errors: result?.errors || null,
    };
  } catch (error) {
    if (Array.isArray(error?.errors)) {
      return {
        data: error?.data || null,
        errors: error.errors,
      };
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = String(req.query?.userId || '').trim();
  if (!userId) {
    return res.status(400).json({ message: 'userId is required.' });
  }

  try {
    const [progressJson, codesJson] = await Promise.all([
      appSync(QUERY_PROGRESS_BY_USER, {
        limit: 100,
        filter: { userId: { eq: userId } },
      }),
      appSync(QUERY_CODES_BY_USER, {
        limit: 200,
        filter: { userId: { eq: userId } },
      }),
    ]);

    if (Array.isArray(progressJson?.errors) && progressJson.errors.length) {
      return res.status(500).json({
        message: progressJson.errors[0]?.message || 'Failed to load booster progress.',
        errors: progressJson.errors,
      });
    }
    if (Array.isArray(codesJson?.errors) && codesJson.errors.length) {
      return res.status(500).json({
        message: codesJson.errors[0]?.message || 'Failed to load booster discount codes.',
        errors: codesJson.errors,
      });
    }

    const progress = progressJson?.data?.listBoosterCourseProgresses?.items || [];
    const codes = codesJson?.data?.listBoosterDiscountCodes?.items || [];

    return res.status(200).json({ message: 'success', progress, codes });
  } catch (error) {
    return res.status(500).json({ message: error?.message || 'Failed to load booster progress.' });
  }
}
