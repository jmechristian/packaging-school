import { handleLogin } from '@auth0/nextjs-auth0';
import { returnToWithLearnerName } from '../../../helpers/authLearnerName';

export default async function passwordLogin(req, res) {
  const { email, returnTo, firstName, lastName } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'Username-Password-Authentication',
      login_hint: email || undefined,
    },
    returnTo: returnToWithLearnerName(returnTo, firstName, lastName),
  });
}
