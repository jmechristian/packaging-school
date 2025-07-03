// pages/api/update-user.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, family_name, given_name, password } = req.body;

  if (!email || !family_name || !given_name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID_2;
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET_2;

  if (!AUTH0_ISSUER_BASE_URL || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
    return res.status(500).json({ error: 'Auth0 configuration missing' });
  }

  try {
    // 1. Get a Management API token
    const tokenResponse = await axios.post(
      `${AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: `${AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: 'client_credentials',
      }
    );

    const MANAGEMENT_API_TOKEN = tokenResponse.data.access_token;

    // 2. Create the user
    const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
    const url = `https://${AUTH0_DOMAIN}/api/v2/users`;

    await axios.post(
      url,
      {
        name: `${given_name} ${family_name}`,
        email,
        password,
        connection: 'Username-Password-Authentication',
        email_verified: false,
        verify_email: false,
        given_name: given_name,
        family_name: family_name,
      },
      {
        headers: {
          Authorization: `Bearer ${MANAGEMENT_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      'Auth0 Create User Error:',
      error.response?.data || error.message
    );
    return res.status(500).json({ error: 'Failed to create user' });
  }
}
