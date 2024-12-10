export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);

    // Extract user information from the request body
    const { first_name, last_name, company, email } = req.body.payload;

    // Create a cookie value
    const cookieValue = `first_name=${first_name}; last_name=${last_name}; company=${company}; email=${email}`;

    // Set the cookie in the response header
    res.setHeader(
      'Set-Cookie',
      `thinkific-user=${encodeURIComponent(cookieValue)}; Path=/; HttpOnly`
    );

    res.status(200).json({ name: 'John Doe' });
  }

  if (req.method === 'GET') {
    res.status(200).json({ name: 'John Doe' });
  }
}
