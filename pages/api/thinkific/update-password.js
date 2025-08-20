export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, password } = req.body;

    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/users/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-API-Key': process.env.NEXT_THINKIFIC_API_KEY,
          'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
        },
        method: 'PUT',
        body: JSON.stringify({
          password: password,
        }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Thinkific API error: ${response.status} ${response.statusText}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
