import axios from 'axios';
import crypto from 'crypto';

// Payload Sample:
// {
//   "id": "01K1GZSPVXBYVN5HF99D2HR2FZ",
//   "resource": "user",
//   "action": "signup",
//   "tenant_id": "2896",
//   "tenant_global_id": "c5ef5384-7cc9-4c22-b0df-68518b262657",
//   "created_at": "2025-07-31T19:36:57.000Z",
//   "timestamp": 1753990617,
//   "payload": {
//       "id": 228515883,
//       "gid": "01K1GZSPTYY68EBKF0RJ1FJPZQ",
//       "created_at": "2025-07-31T19:36:57.948Z",
//       "first_name": "Mohamad",
//       "last_name": "Ali Dib",
//       "company": null,
//       "email": "moralidib@gmail.com",
//       "roles": [],
//       "avatar_url": null,
//       "bio": null,
//       "headline": null,
//       "affiliate_code": null,
//       "external_source": null,
//       "affiliate_commission": null,
//       "affiliate_commission_type": "%",
//       "affiliate_payout_email": null,
//       "administered_course_ids": null,
//       "custom_profile_fields": [
//           {
//               "id": null,
//               "value": null,
//               "label": "LinkedIn Account ",
//               "custom_profile_field_definition_id": 56972
//           },
//           {
//               "id": null,
//               "value": null,
//               "label": "Phone Number",
//               "custom_profile_field_definition_id": 2561
//           },
//           {
//               "id": null,
//               "value": null,
//               "label": "Job Title",
//               "custom_profile_field_definition_id": 1340
//           },
//           {
//               "id": null,
//               "value": null,
//               "label": "Company name",
//               "custom_profile_field_definition_id": 1339
//           }
//       ]
//   }
// }

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

async function userExists(email) {
  const token = await getAuth0Token();
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

async function createUser(email, first_name, last_name) {
  const token = await getAuth0Token();
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
  const url = `https://${AUTH0_DOMAIN}/api/v2/users`;

  const password = generatePassword();

  const body = {
    name: `${first_name} ${last_name}`,
    email: email,
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

    console.log(`Successfully created Auth0 user for: ${email}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error creating Auth0 user:',
      error.response?.data || error.message
    );
    throw error;
  }
}

async function updateUser(email, first_name, last_name) {
  const token = await getAuth0Token();
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');

  // First, get the user ID by email
  const searchUrl = `https://${AUTH0_DOMAIN}/api/v2/users-by-email`;
  const searchResponse = await axios.get(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    params: {
      email: email,
    },
  });

  if (!searchResponse.data || searchResponse.data.length === 0) {
    throw new Error(`User with email ${email} not found`);
  }

  const userId = searchResponse.data[0].user_id;
  const updateUrl = `https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(
    userId
  )}`;

  try {
    const response = await axios.patch(
      updateUrl,
      {
        name: `${first_name} ${last_name}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Successfully updated Auth0 user for: ${email}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Auth0 user:',
      error.response?.data || error.message
    );
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log('Webhook received:', body);

    const { email, first_name, last_name } = body.payload;

    // Check if user exists in Auth0
    const auth0User = await userExists(email);

    if (!auth0User) {
      // Create user in Auth0
      await createUser(email, first_name, last_name);
    } else {
      // Update user in Auth0
      await updateUser(email, first_name, last_name);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
}
