import jwt from 'jsonwebtoken';

/** Same signing as Thinkific custom SSO / {@link pages/api/generateJWT.js} (15m expiry). */
export function signThinkificSsoUserToken({ email, first_name, last_name }) {
  const secret = process.env.NEXT_PUBLIC_API_KEY;
  if (!secret || !email || !first_name || !last_name) {
    return null;
  }
  const payload = {
    email,
    first_name,
    last_name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900,
  };
  return jwt.sign(payload, secret);
}
