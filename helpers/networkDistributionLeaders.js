import { Amplify, API } from 'aws-amplify';
import awsExports from '../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

export const normalizeEmail = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const LEADER_FIELDS = `
  id
  email
  name
  active
  createdAt
  updatedAt
`;

const LEARNER_FIELDS = `
  id
  email
  salesLeaderEmail
  name
  firstApprovedAt
  status
  createdAt
  updatedAt
`;

const CREATE_LEADER = /* GraphQL */ `
  mutation CreateNetworkDistributionSalesLeader(
    $input: CreateNetworkDistributionSalesLeaderInput!
  ) {
    createNetworkDistributionSalesLeader(input: $input) {
      ${LEADER_FIELDS}
    }
  }
`;

const UPDATE_LEADER = /* GraphQL */ `
  mutation UpdateNetworkDistributionSalesLeader(
    $input: UpdateNetworkDistributionSalesLeaderInput!
  ) {
    updateNetworkDistributionSalesLeader(input: $input) {
      ${LEADER_FIELDS}
    }
  }
`;

const LEADERS_BY_EMAIL = /* GraphQL */ `
  query NdSalesLeadersByEmail($email: String!, $nextToken: String) {
    ndSalesLeadersByEmail(email: $email, limit: 20, nextToken: $nextToken) {
      items {
        ${LEADER_FIELDS}
      }
      nextToken
    }
  }
`;

const LIST_LEADERS = /* GraphQL */ `
  query ListNetworkDistributionSalesLeaders($nextToken: String) {
    listNetworkDistributionSalesLeaders(limit: 100, nextToken: $nextToken) {
      items {
        ${LEADER_FIELDS}
      }
      nextToken
    }
  }
`;

const CREATE_LEARNER = /* GraphQL */ `
  mutation CreateNetworkDistributionLearner(
    $input: CreateNetworkDistributionLearnerInput!
  ) {
    createNetworkDistributionLearner(input: $input) {
      ${LEARNER_FIELDS}
    }
  }
`;

const UPDATE_LEARNER = /* GraphQL */ `
  mutation UpdateNetworkDistributionLearner(
    $input: UpdateNetworkDistributionLearnerInput!
  ) {
    updateNetworkDistributionLearner(input: $input) {
      ${LEARNER_FIELDS}
    }
  }
`;

const LEARNERS_BY_EMAIL = /* GraphQL */ `
  query NdLearnersByEmail($email: String!, $nextToken: String) {
    ndLearnersByEmail(email: $email, limit: 50, nextToken: $nextToken) {
      items {
        ${LEARNER_FIELDS}
      }
      nextToken
    }
  }
`;

const LEARNERS_BY_LEADER = /* GraphQL */ `
  query NdLearnersBySalesLeader($salesLeaderEmail: String!, $nextToken: String) {
    ndLearnersBySalesLeader(
      salesLeaderEmail: $salesLeaderEmail
      limit: 100
      nextToken: $nextToken
    ) {
      items {
        ${LEARNER_FIELDS}
      }
      nextToken
    }
  }
`;

const paginate = async (query, variables = {}) => {
  const items = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query,
      variables: { ...variables, nextToken },
    });
    const connection = Object.values(res.data)[0];
    items.push(...(connection?.items || []).filter(Boolean));
    nextToken = connection?.nextToken || null;
  } while (nextToken);

  return items;
};

export const getSalesLeaderByEmail = async (email) => {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const items = await paginate(LEADERS_BY_EMAIL, { email: normalized });
  return items[0] || null;
};

export const listActiveSalesLeaders = async () => {
  const items = await paginate(LIST_LEADERS);
  return items
    .filter((item) => item.active !== false)
    .sort((a, b) =>
      (a.name || a.email || '').localeCompare(b.name || b.email || ''),
    );
};

export const isApprovedSalesLeader = async (email) => {
  const leader = await getSalesLeaderByEmail(email);
  return Boolean(leader && leader.active !== false);
};

export const createSalesLeader = async ({ email, name, active = true }) => {
  const res = await API.graphql({
    query: CREATE_LEADER,
    variables: {
      input: {
        email: normalizeEmail(email),
        name: name || null,
        active,
      },
    },
  });
  return res.data.createNetworkDistributionSalesLeader;
};

export const updateSalesLeader = async (input) => {
  const res = await API.graphql({
    query: UPDATE_LEADER,
    variables: { input },
  });
  return res.data.updateNetworkDistributionSalesLeader;
};

export const listLearnersByEmail = (email) =>
  paginate(LEARNERS_BY_EMAIL, { email: normalizeEmail(email) });

export const listLearnersBySalesLeader = (email) =>
  paginate(LEARNERS_BY_LEADER, {
    salesLeaderEmail: normalizeEmail(email),
  });

export const upsertLearner = async ({
  email,
  salesLeaderEmail,
  name,
  status = 'ACTIVE',
}) => {
  const learnerEmail = normalizeEmail(email);
  const leaderEmail = normalizeEmail(salesLeaderEmail);
  if (!learnerEmail || !leaderEmail) {
    throw new Error('Learner email and sales leader email are required.');
  }

  const existing = (await listLearnersBySalesLeader(leaderEmail)).find(
    (item) => normalizeEmail(item.email) === learnerEmail,
  );

  if (existing) {
    const nextName = name || existing.name || null;
    if (nextName === existing.name && existing.status === status) {
      return existing;
    }
    const res = await API.graphql({
      query: UPDATE_LEARNER,
      variables: {
        input: {
          id: existing.id,
          name: nextName,
          status,
        },
      },
    });
    return res.data.updateNetworkDistributionLearner;
  }

  const res = await API.graphql({
    query: CREATE_LEARNER,
    variables: {
      input: {
        email: learnerEmail,
        salesLeaderEmail: leaderEmail,
        name: name || null,
        firstApprovedAt: new Date().toISOString(),
        status,
      },
    },
  });
  return res.data.createNetworkDistributionLearner;
};
