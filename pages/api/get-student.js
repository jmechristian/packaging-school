export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Process a POST request
    const { email } = req.query;
    const data = await fetch(
      `https://api.thinkific.com/api/public/v1/enrollments?page=1&limit=25&query[email]=${email}`,
      {
        method: 'GET',
        headers: {
          'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-Auth-Subdomain': 'packagingschool',
          'Content-Type': 'application/json',
        },
      }
    );
    const answer = await data.json();
    res.status(200).json({ message: 'success', data: answer });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
