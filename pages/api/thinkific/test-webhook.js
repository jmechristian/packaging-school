export default async function handler(req, res) {
  // Accept all HTTP methods for testing
  console.log('=== WEBHOOK TEST ENDPOINT ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  console.log('Body type:', typeof req.body);
  console.log('Body keys:', req.body ? Object.keys(req.body) : 'No body');
  console.log('=============================');

  // Return success with the received data
  return res.status(200).json({
    success: true,
    message: 'Webhook test endpoint received data',
    received: {
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
    },
  });
}
