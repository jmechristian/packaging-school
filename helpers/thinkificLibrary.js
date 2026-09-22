const THINKIFIC_REST = 'https://api.thinkific.com/api/public/v1';
const THINKIFIC_GRAPHQL = 'https://api.thinkific.com/stable/graphql';
export const NETWORK_DISTRIBUTION_GROUP = 'PDA - Network 2026';
const PDA_GROUP = NETWORK_DISTRIBUTION_GROUP;

const restHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Auth-API-Key':
    process.env.NEXT_THINKIFIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
});

const parseName = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || 'Learner',
    lastName: parts.slice(1).join(' ') || 'Network Distribution',
  };
};

export const getThinkificUserByEmail = async (email) => {
  const restRes = await fetch(
    `${THINKIFIC_REST}/users?query[email]=${encodeURIComponent(email)}`,
    { headers: restHeaders() },
  );

  if (restRes.ok) {
    const restData = await restRes.json();
    const user = restData?.items?.[0];
    if (user?.id) return user;
  }

  const gqlRes = await fetch(THINKIFIC_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_THINKIFIC_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query UserByEmail($email: EmailAddress!) {
          userByEmail(email: $email) {
            id
            email
            firstName
            lastName
          }
        }
      `,
      variables: { email },
    }),
  });

  if (!gqlRes.ok) return null;
  const gqlData = await gqlRes.json();
  const user = gqlData?.data?.userByEmail;
  return user || null;
};

export const createThinkificUser = async ({ email, firstName, lastName }) => {
  const names = parseName(`${firstName || ''} ${lastName || ''}`.trim());
  const response = await fetch(`${THINKIFIC_REST}/users`, {
    method: 'POST',
    headers: restHeaders(),
    body: JSON.stringify({
      email,
      first_name: firstName || names.firstName,
      last_name: lastName || names.lastName,
      provider: 'SSO',
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const existing = await getThinkificUserByEmail(email);
    if (existing) return existing;
    throw new Error(data?.error || data?.message || 'Thinkific user create failed');
  }
  return data;
};

export const addThinkificUserToGroup = async (
  userId,
  groupNames = [PDA_GROUP],
) => {
  const numericId = Number(userId);
  if (!userId || Number.isNaN(numericId)) {
    return { ok: false, data: { message: 'Invalid Thinkific user id' } };
  }
  const response = await fetch(`${THINKIFIC_REST}/group_users`, {
    method: 'POST',
    headers: restHeaders(),
    body: JSON.stringify({
      user_id: numericId,
      group_names: groupNames,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (response.ok || response.status === 201) {
    return { ok: true, data };
  }

  const message = JSON.stringify(data).toLowerCase();
  if (
    response.status === 422 ||
    message.includes('already') ||
    message.includes('exist')
  ) {
    return { ok: true, alreadyInGroup: true, data };
  }

  console.warn('Thinkific add-to-group failed (non-fatal):', {
    status: response.status,
    data,
  });
  return { ok: false, data };
};

export const ensureNetworkDistributionThinkific = async ({
  email,
  firstName,
  lastName,
  name,
}) => {
  if (!email) {
    throw new Error('Email is required to ensure Thinkific user');
  }

  const parsed = parseName(name);
  let user = await getThinkificUserByEmail(email);

  if (!user?.id) {
    user = await createThinkificUser({
      email,
      firstName: firstName || parsed.firstName,
      lastName: lastName || parsed.lastName,
    });
  }

  if (!user?.id) {
    throw new Error('Could not resolve Thinkific user id');
  }

  const groupResult = await addThinkificUserToGroup(user.id, [PDA_GROUP]);
  return { user, groupResult };
};

export const NETWORK_DISTRIBUTION_BUNDLES = {
  'CPS-00': 3803,
  'APC-00': 31389,
  'CSP-00': 358972,
};

export const getNetworkDistributionBundleId = (requestOrCourse) => {
  const courseId = requestOrCourse?.courseId || requestOrCourse?.id;
  if (courseId && NETWORK_DISTRIBUTION_BUNDLES[courseId]) {
    return NETWORK_DISTRIBUTION_BUNDLES[courseId];
  }
  if (requestOrCourse?.thinkificBundleId) {
    return Number(requestOrCourse.thinkificBundleId);
  }
  return null;
};

export const createThinkificEnrollment = async ({ userId, courseId }) => {
  const response = await fetch(`${THINKIFIC_REST}/enrollments`, {
    method: 'POST',
    headers: restHeaders(),
    body: JSON.stringify({
      user_id: Number(userId),
      course_id: Number(courseId),
      activated_at: new Date().toISOString(),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok && response.status !== 201) {
    throw new Error(
      data?.error || data?.message || `Thinkific enrollment failed (${response.status})`,
    );
  }
  return data;
};

export const createThinkificBundleEnrollment = async ({ userId, bundleId }) => {
  const response = await fetch(
    `${THINKIFIC_REST}/bundles/${Number(bundleId)}/enrollments`,
    {
      method: 'POST',
      headers: restHeaders(),
      body: JSON.stringify({
        user_id: Number(userId),
        activated_at: new Date().toISOString(),
      }),
    },
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok && response.status !== 201) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Thinkific bundle enrollment failed (${response.status})`,
    );
  }
  return data;
};

export const NETWORK_DISTRIBUTION_COUPON = 'networklibrary';
export const NETWORK_DISTRIBUTION_PROMOTION_ID = 2446636;
export const NETWORK_DISTRIBUTION_COUPON_ID = 13088973;

const restJson = async (path, options = {}, attempt = 0) => {
  const response = await fetch(`${THINKIFIC_REST}${path}`, {
    ...options,
    headers: {
      ...restHeaders(),
      ...(options.headers || {}),
    },
  });
  if (response.status === 429 && attempt < 3) {
    const retryAfter = Number(response.headers.get('retry-after')) || 1 + attempt;
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
    return restJson(path, options, attempt + 1);
  }
  const data =
    response.status === 204 ? {} : await response.json().catch(() => ({}));
  return { response, data };
};

const pagination = (data) => data?.meta?.pagination || {};

export const listThinkificCoupons = async (
  promotionId,
  { page = 1, limit = 100 } = {},
) => {
  const { response, data } = await restJson(
    `/coupons?promotion_id=${Number(promotionId)}&page=${page}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(
      data?.error || data?.message || `Failed to list coupons (${response.status})`,
    );
  }
  return data;
};

export const parseThinkificProductIdFromLink = (link) => {
  const cleaned = String(link || '')
    .replace(/^Link:\s*/i, '')
    .trim();
  const match = cleaned.match(/\/enroll\/(\d+)/i);
  return match ? Number(match[1]) : null;
};

export const getThinkificPromotionByCoupon = async ({
  productId,
  couponCode = NETWORK_DISTRIBUTION_COUPON,
}) => {
  if (!productId || !couponCode) return null;
  const { response, data } = await restJson(
    `/promotions/by_coupon?product_id=${Number(productId)}&coupon_code=${encodeURIComponent(
      couponCode,
    )}`,
  );
  if (!response.ok) return null;
  return data;
};

const findCouponOnPromotion = async (promotionId, target) => {
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await listThinkificCoupons(promotionId, { page, limit: 100 });
    const match = (data.items || []).find(
      (coupon) => String(coupon.code || '').toLowerCase() === target,
    );
    if (match) return match;
    totalPages = pagination(data).total_pages || 1;
    page += 1;
  }

  return null;
};

export const findThinkificCouponByCode = async ({
  code = NETWORK_DISTRIBUTION_COUPON,
  promotionId,
  productId,
} = {}) => {
  const target = String(code || '').trim().toLowerCase();
  if (!target) {
    throw new Error('Coupon code is required');
  }

  if (promotionId) {
    const direct = await findCouponOnPromotion(Number(promotionId), target);
    if (direct) return direct;
  }

  if (productId) {
    const promotion = await getThinkificPromotionByCoupon({
      productId,
      couponCode: target,
    });
    if (promotion?.id) {
      const fromProduct = await findCouponOnPromotion(Number(promotion.id), target);
      if (fromProduct) return fromProduct;
    }
  }

  return null;
};

export const getThinkificCouponById = async (couponId) => {
  if (!couponId) return null;
  const { response, data } = await restJson(`/coupons/${Number(couponId)}`);
  if (!response.ok) return null;
  return data;
};

export const incrementThinkificCouponUsage = async ({
  code = NETWORK_DISTRIBUTION_COUPON,
  couponId = NETWORK_DISTRIBUTION_COUPON_ID,
  promotionId = NETWORK_DISTRIBUTION_PROMOTION_ID,
  productId,
} = {}) => {
  const coupon =
    (await getThinkificCouponById(couponId)) ||
    (await findThinkificCouponByCode({
      code,
      promotionId,
      productId,
    }));
  if (!coupon?.id) {
    throw new Error(`Thinkific coupon not found: ${code}`);
  }

  const nextUsed = Number(coupon.quantity_used || 0) + 1;
  const body = {
    code: coupon.code,
    quantity_used: nextUsed,
  };
  if (coupon.quantity != null && coupon.quantity !== '') {
    body.quantity = Number(coupon.quantity);
  }

  const { response, data } = await restJson(`/coupons/${coupon.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Thinkific coupon update failed (${response.status})`,
    );
  }

  return {
    ...coupon,
    quantity_used: nextUsed,
  };
};
