// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/chapters/${req.query.id}/contents?page=1&limit=50`,
      {
        method: 'GET',
        headers: {
          'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-Auth-Subdomain': 'packagingschool',
          'Content-Type': 'application/json',
        },
      }
    );
    const content = await response.json();

    res.status(200).json({ content });
  }

  if (req.method === 'POST') {
    console.log(req.body);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
