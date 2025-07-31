import axios from 'axios';

function generatePassword(length = 12) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!';
  const all = upper + lower + numbers + special;
  let password = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special,
  ];
  for (let i = password.length; i < length; i++) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }
  return password.sort(() => Math.random() - 0.5).join('');
}

async function getAuth0Token() {
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID_2;
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET_2;

  if (!AUTH0_ISSUER_BASE_URL || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
    throw new Error('Auth0 configuration missing');
  }

  const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: `${AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: 'client_credentials',
  });

  if (!response.data.access_token) {
    throw new Error('Failed to get Auth0 token');
  }

  return response.data.access_token;
}

async function checkUserExists(email, token) {
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
  const url = `https://${AUTH0_DOMAIN}/api/v2/users-by-email`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        email: email,
      },
    });

    return response.data && response.data.length > 0;
  } catch (error) {
    console.error(
      'Error checking if user exists:',
      error.response?.data || error.message
    );
    throw error;
  }
}

async function createAuth0User(userData, token) {
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
  const url = `https://${AUTH0_DOMAIN}/api/v2/users`;

  const password = generatePassword();

  const body = {
    name: `${userData.first_name} ${userData.last_name}`,
    email: userData.email,
    password,
    connection: 'Username-Password-Authentication',
    email_verified: true,
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      'Error creating Auth0 user:',
      error.response?.data || error.message
    );
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract webhook payload
    const webhookData = req.body;

    // Validate webhook structure
    if (!webhookData || !webhookData.payload || !webhookData.payload.email) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const { payload } = webhookData;
    const { email, first_name, last_name } = payload;

    console.log(`Processing Thinkific signup for: ${email}`);

    // Get Auth0 management token
    const token = await getAuth0Token();

    // Check if user already exists in Auth0
    const userExists = await checkUserExists(email, token);

    if (userExists) {
      console.log(`User ${email} already exists in Auth0, skipping creation`);
      return res.status(200).json({
        success: true,
        message: 'User already exists in Auth0',
        email,
      });
    }

    // Create user in Auth0
    const createdUser = await createAuth0User(payload, token);

    console.log(`Successfully created Auth0 user for: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'User created successfully in Auth0',
      email,
      auth0UserId: createdUser.user_id,
    });
  } catch (error) {
    console.error('Error processing Thinkific webhook:', error);
    return res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message,
    });
  }
}
