import { Amplify, API } from 'aws-amplify';
import awsExports from '../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const REQUEST_FIELDS = `
  id
  librarySlug
  status
  requesterUserID
  requesterEmail
  requesterName
  salesLeaderUserID
  salesLeaderEmail
  salesLeaderName
  courseId
  courseName
  courseImage
  courseLink
  thinkificId
  couponCode
  decisionToken
  decidedAt
  decidedByEmail
  declineReason
  thinkificEnrollmentId
  page
  createdAt
  updatedAt
`;

const CREATE_REQUEST = /* GraphQL */ `
  mutation CreateLibraryEnrollmentRequest(
    $input: CreateLibraryEnrollmentRequestInput!
  ) {
    createLibraryEnrollmentRequest(input: $input) {
      ${REQUEST_FIELDS}
    }
  }
`;

const UPDATE_REQUEST = /* GraphQL */ `
  mutation UpdateLibraryEnrollmentRequest(
    $input: UpdateLibraryEnrollmentRequestInput!
  ) {
    updateLibraryEnrollmentRequest(input: $input) {
      ${REQUEST_FIELDS}
    }
  }
`;

const GET_REQUEST = /* GraphQL */ `
  query GetLibraryEnrollmentRequest($id: ID!) {
    getLibraryEnrollmentRequest(id: $id) {
      ${REQUEST_FIELDS}
    }
  }
`;

const BY_REQUESTER_USER = /* GraphQL */ `
  query EnrollmentRequestsByRequesterUser(
    $requesterUserID: ID!
    $nextToken: String
  ) {
    enrollmentRequestsByRequesterUser(
      requesterUserID: $requesterUserID
      limit: 100
      nextToken: $nextToken
    ) {
      items {
        ${REQUEST_FIELDS}
      }
      nextToken
    }
  }
`;

const BY_SALES_LEADER_USER = /* GraphQL */ `
  query EnrollmentRequestsBySalesLeaderUser(
    $salesLeaderUserID: ID!
    $nextToken: String
  ) {
    enrollmentRequestsBySalesLeaderUser(
      salesLeaderUserID: $salesLeaderUserID
      limit: 100
      nextToken: $nextToken
    ) {
      items {
        ${REQUEST_FIELDS}
      }
      nextToken
    }
  }
`;

const BY_REQUESTER_EMAIL = /* GraphQL */ `
  query EnrollmentRequestsByRequesterEmail(
    $requesterEmail: String!
    $nextToken: String
  ) {
    enrollmentRequestsByRequesterEmail(
      requesterEmail: $requesterEmail
      limit: 100
      nextToken: $nextToken
    ) {
      items {
        ${REQUEST_FIELDS}
      }
      nextToken
    }
  }
`;

const BY_SALES_LEADER = /* GraphQL */ `
  query EnrollmentRequestsBySalesLeader(
    $salesLeaderEmail: String!
    $nextToken: String
  ) {
    enrollmentRequestsBySalesLeader(
      salesLeaderEmail: $salesLeaderEmail
      limit: 100
      nextToken: $nextToken
    ) {
      items {
        ${REQUEST_FIELDS}
      }
      nextToken
    }
  }
`;

const BY_DECISION_TOKEN = /* GraphQL */ `
  query EnrollmentRequestsByDecisionToken(
    $decisionToken: String!
    $nextToken: String
  ) {
    enrollmentRequestsByDecisionToken(
      decisionToken: $decisionToken
      limit: 10
      nextToken: $nextToken
    ) {
      items {
        ${REQUEST_FIELDS}
      }
      nextToken
    }
  }
`;

const paginate = async (query, variableKey, variableValue) => {
  const items = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query,
      variables: { [variableKey]: variableValue, nextToken },
    });
    const connection = Object.values(res.data)[0];
    items.push(...(connection?.items || []).filter(Boolean));
    nextToken = connection?.nextToken || null;
  } while (nextToken);

  return items;
};

export const createLibraryEnrollmentRequest = async (input) => {
  const res = await API.graphql({
    query: CREATE_REQUEST,
    variables: { input },
  });
  return res.data.createLibraryEnrollmentRequest;
};

export const updateLibraryEnrollmentRequest = async (input) => {
  const res = await API.graphql({
    query: UPDATE_REQUEST,
    variables: { input },
  });
  return res.data.updateLibraryEnrollmentRequest;
};

export const getLibraryEnrollmentRequest = async (id) => {
  const res = await API.graphql({
    query: GET_REQUEST,
    variables: { id },
  });
  return res.data.getLibraryEnrollmentRequest;
};

export const getEnrollmentRequestsByRequesterUser = (userId) =>
  paginate(BY_REQUESTER_USER, 'requesterUserID', userId);

export const getEnrollmentRequestsBySalesLeaderUser = (userId) =>
  paginate(BY_SALES_LEADER_USER, 'salesLeaderUserID', userId);

export const getEnrollmentRequestsByRequesterEmail = (email) =>
  paginate(BY_REQUESTER_EMAIL, 'requesterEmail', email.toLowerCase());

export const getEnrollmentRequestsBySalesLeader = (email) =>
  paginate(BY_SALES_LEADER, 'salesLeaderEmail', email.toLowerCase());

export const getEnrollmentRequestByDecisionToken = async (token) => {
  const items = await paginate(BY_DECISION_TOKEN, 'decisionToken', token);
  return items[0] || null;
};
