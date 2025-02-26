export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, first_name, last_name } = req.query;
  console.log('Creating user in Thinkific:', { email, first_name, last_name });

  const response = await fetch(
    `https://api.thinkific.com/api/public/v1/users`,
    {
      headers: {
        'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
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
}
