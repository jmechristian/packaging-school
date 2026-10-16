import { Amplify, API } from 'aws-amplify';
import awsExports from '../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const CREATE_INTEREST = /* GraphQL */ `
  mutation CreateSpsInterest($input: CreateSpsInterestInput!) {
    createSpsInterest(input: $input) {
      id
      name
      email
      company
      interest
      createdAt
    }
  }
`;

export const createSpsInterest = async (input) => {
  const res = await API.graphql({
    query: CREATE_INTEREST,
    variables: { input },
  });
  return res.data.createSpsInterest;
};
