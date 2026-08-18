const THINKIFIC_REST = 'https://api.thinkific.com/api/public/v1';
const THINKIFIC_GRAPHQL = 'https://api.thinkific.com/stable/graphql';
export const NETWORK_DISTRIBUTION_GROUP = 'PDA - Network 2026';
const PDA_GROUP = NETWORK_DISTRIBUTION_GROUP;

const restHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Auth-API-Key': process.env.NEXT_THINKIFIC_API_KEY,
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
