// pages/api/update-user.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, firstName, lastName } = req.body;

  if (!userId || !firstName || !lastName) {
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

    // 2. Update the user
    const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
    const url = `https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(
      userId
    )}`;

    await axios.patch(
      url,
      {
        name: `${firstName} ${lastName}`,
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
      'Auth0 Update User Error:',
      error.response?.data || error.message
    );
    return res.status(500).json({ error: 'Failed to update user' });
  }
}
