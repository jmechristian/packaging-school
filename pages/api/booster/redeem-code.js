import { API } from 'aws-amplify';

const QUERY_GET_CODE = `
  query GetBoosterDiscountCode($id: ID!) {
    getBoosterDiscountCode(id: $id) {
      id
      userId
      thinkificCourseId
      milestonePercent
      code
      isRedeemed
    }
  }
`;

const QUERY_COURSE_CODES = `
  query ListBoosterDiscountCodes($filter: ModelBoosterDiscountCodeFilterInput, $limit: Int) {
    listBoosterDiscountCodes(filter: $filter, limit: $limit) {
      items {
        id
        milestonePercent
        isRedeemed
      }
    }
  }
`;

const MUTATION_UPDATE_CODE = `
  mutation UpdateBoosterDiscountCode($input: UpdateBoosterDiscountCodeInput!) {
    updateBoosterDiscountCode(input: $input) {
      id
      thinkificCourseId
      milestonePercent
      code
      issuedAt
      redeemedAt
      isRedeemed
    }
  }
`;

function throwIfGraphqlErrors(json, context) {
  if (Array.isArray(json?.errors) && json.errors.length > 0) {
    const detail = json.errors
      .map((err) => err?.message)
      .filter(Boolean)
      .join(' | ');
    throw new Error(`${context}: ${detail || 'GraphQL request failed'}`);
  }
}

async function appSync(query, variables) {
  try {
    const result = await API.graphql({ query, variables });
    return { data: result?.data || null, errors: result?.errors || null };
  } catch (error) {
    if (Array.isArray(error?.errors)) {
      return { data: error?.data || null, errors: error.errors };
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = String(req.body?.userId || '').trim();
  const codeId = String(req.body?.codeId || '').trim();

  if (!userId || !codeId) {
    return res.status(400).json({ message: 'userId and codeId are required.' });
  }

  try {
    const codeRes = await appSync(QUERY_GET_CODE, { id: codeId });
    throwIfGraphqlErrors(codeRes, 'Failed to load discount code');
    const code = codeRes?.data?.getBoosterDiscountCode;

    if (!code) {
      return res.status(404).json({ message: 'Discount code not found.' });
    }
    if (code.userId !== userId) {
      return res.status(403).json({ message: 'This code does not belong to you.' });
    }
    if (code.isRedeemed) {
      return res.status(200).json({ message: 'success', code });
    }

    // Enforce one-time ladder: if any other code for this course is redeemed,
    // block redeeming a different one.
    const courseCodesRes = await appSync(QUERY_COURSE_CODES, {
      limit: 50,
      filter: {
        userId: { eq: userId },
        thinkificCourseId: { eq: code.thinkificCourseId },
      },
    });
    throwIfGraphqlErrors(courseCodesRes, 'Failed to verify course codes');
    const alreadyRedeemed = (
      courseCodesRes?.data?.listBoosterDiscountCodes?.items || []
    ).some((item) => item?.isRedeemed && item?.id !== codeId);

    if (alreadyRedeemed) {
      return res.status(409).json({
        message:
          'You have already redeemed a discount code for this course. Only one code can be used per course.',
      });
    }

    const updateRes = await appSync(MUTATION_UPDATE_CODE, {
      input: {
        id: codeId,
        isRedeemed: true,
        redeemedAt: new Date().toISOString(),
      },
    });
    throwIfGraphqlErrors(updateRes, 'Failed to redeem discount code');

    return res.status(200).json({
      message: 'success',
      code: updateRes?.data?.updateBoosterDiscountCode,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || 'Failed to redeem discount code.' });
  }
}
