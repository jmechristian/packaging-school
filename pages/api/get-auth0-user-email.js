import { ManagementClient } from 'auth0';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const management = new ManagementClient({
      clientId: process.env.AUTH0_CLIENT_ID_2,
      clientSecret: process.env.AUTH0_CLIENT_SECRET_2,
      domain: process.env.AUTH0_ISSUER_BASE_URL.replace('https://', ''),
    });

    const result = await management.usersByEmail.getByEmail({ email });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching Auth0 user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
