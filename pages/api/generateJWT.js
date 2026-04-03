import { signThinkificSsoUserToken } from '../../helpers/thinkificUserJwt';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, first_name, last_name, return_to } = req.body;

  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const token = signThinkificSsoUserToken({ email, first_name, last_name });
    if (!token) {
      return res.status(500).json({ error: 'Failed to sign JWT (check NEXT_PUBLIC_API_KEY)' });
    }

    // Construct the redirect URL
    const thinkificUrl = `https://packagingschool.thinkific.com/api/sso/v2/sso/jwt?jwt=${token}${
      return_to ? `&return_to=${encodeURIComponent(return_to)}` : ''
    }`;

    res.status(200).json({ url: thinkificUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate JWT' });
  }
}
