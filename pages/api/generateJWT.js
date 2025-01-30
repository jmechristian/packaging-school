import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, first_name, last_name, return_to } = req.body;
  console.log(req.body);

  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Your Thinkific API Key
  const THINKIFIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Use an environment variable

  // Payload for the JWT
  const payload = {
    email,
    first_name,
    last_name,
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 300, // Expires in 5 minutes
  };

  try {
    // Generate the JWT
    const token = jwt.sign(payload, THINKIFIC_API_KEY);

    // Construct the redirect URL
    const thinkificUrl = `https://packagingschool.thinkific.com/api/sso/v2/sso/jwt?jwt=${token}${
      return_to ? `&return_to=${encodeURIComponent(return_to)}` : ''
    }`;

    res.status(200).json({ url: thinkificUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate JWT' });
  }
}
