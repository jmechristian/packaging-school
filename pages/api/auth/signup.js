import { handleLogin } from '@auth0/nextjs-auth0';
import { returnToWithLearnerName } from '../../../helpers/authLearnerName';

export default async function signup(req, res) {
  const { returnTo, login_hint, firstName, lastName } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      screen_hint: 'signup',
      login_hint: login_hint || undefined,
    },
    returnTo: returnToWithLearnerName(returnTo, firstName, lastName),
  });
}
