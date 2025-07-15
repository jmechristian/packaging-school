import axios from 'axios';

export default async function passwordReset(req, res) {
  const { email, returnTo } = req.query;

  if (!email) {
    return res.redirect('/error?message=Email is required for password reset');
  }

  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
  const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID_2;
  const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET_2;

  if (!AUTH0_ISSUER_BASE_URL || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
    return res.redirect('/error?message=Authentication configuration error');
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

    // 2. Create password reset ticket
    const AUTH0_DOMAIN = AUTH0_ISSUER_BASE_URL.replace('https://', '');
    const url = `https://${AUTH0_DOMAIN}/api/v2/tickets/password-change`;

    // Construct full URL for result_url
    const baseUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3001';
    const fullResultUrl = returnTo
      ? `${baseUrl}${returnTo.startsWith('/') ? returnTo : `/${returnTo}`}`
      : `${baseUrl}/profile`;

    console.log('Creating password reset ticket for:', email);
    console.log('Result URL:', fullResultUrl);

    const ticketResponse = await axios.post(
      url,
      {
        email: email,
        connection_id: 'con_0mWq8J8cr8GzbEgx',
        ttl_sec: 3600, // Reduced to 1 hour for testing
        mark_email_as_verified: true,
        includeEmailInRedirect: true,
        result_url: fullResultUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${MANAGEMENT_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 3. The ticket response is already a complete URL
    const resetUrl = ticketResponse.data.ticket;
    console.log('Generated reset URL:', resetUrl);

    // 4. Redirect user directly to the password reset page
    return res.redirect(resetUrl);
  } catch (error) {
    console.error(
      'Password reset error:',
      error.response?.data || error.message
    );

    // Redirect to error page with details
    const errorMessage = encodeURIComponent(
      'Failed to generate password reset link. Please try again.'
    );
    return res.redirect(`/error?message=${errorMessage}`);
  }
}
