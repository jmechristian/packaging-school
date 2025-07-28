// pages/api/create-auth0-user.js

import axios from 'axios';

function generatePassword(length = 12) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!';
  const all = upper + lower + numbers + special;

  // Ensure at least one of each required character
  let password = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special,
  ];

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Shuffle the password to avoid predictable placement
  password = password.sort(() => Math.random() - 0.5);

  return password.join('');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
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
    const url = `https://${AUTH0_DOMAIN}/api/v2/users`;

    const password = generatePassword();

    await axios.post(
      url,
      {
        name: `${firstName} ${lastName}`,
        email,
        password: password,
        connection: 'Username-Password-Authentication',
        email_verified: true,
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
