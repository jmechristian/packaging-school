import { Amplify, API } from 'aws-amplify';
import awsExports from '../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const CREATE_LEAD = /* GraphQL */ `
  mutation CreateEducationPartnerLead($input: CreateEducationPartnerLeadInput!) {
    createEducationPartnerLead(input: $input) {
      id
      email
      page
      pageTitle
      createdAt
    }
  }
`;

export const createEducationPartnerLead = async (input) => {
  const res = await API.graphql({
    query: CREATE_LEAD,
    variables: { input },
  });
  return res.data.createEducationPartnerLead;
};
