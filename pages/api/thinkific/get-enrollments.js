export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.query;

  const response = await fetch(
    `https://api.thinkific.com/api/public/v1/enrollments?page=1&limit=500&query[email]=${email}`,
    {
      headers: {
        'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
        'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
      },
    }
  );

  const data = await response.json();
  return res.status(200).json(data);
}
