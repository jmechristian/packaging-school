export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Log the raw request body to debug
    console.log('Raw request body:', req.body);

    const { email, first_name, last_name } = req.body;

    if (!email || !first_name || !last_name) {
      return res.status(400).json({
        message: 'Missing required fields',
        received: req.body,
      });
    }

    console.log('Creating user in Thinkific:', {
      email,
      first_name,
      last_name,
    });

    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/users`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-API-Key': process.env.NEXT_THINKIFIC_API_KEY,
          'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
        },
        method: 'POST',
        body: JSON.stringify({
          email: email,
          first_name: first_name,
          last_name: last_name,
          provider: 'SSO',
        }),
      }
    );

    const data = await response.json();
    console.log('Thinkific user data:', data);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error creating user in Thinkific:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
