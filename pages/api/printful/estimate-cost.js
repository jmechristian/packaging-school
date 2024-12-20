export default async function handler(req, res) {
  try {
    const requestData =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const printfulPayload = {
      recipient: requestData.recipient,
      items: requestData.items,
    };

    const response = await fetch(
      'https://api.printful.com/orders/estimate-costs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
          'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID,
        },
        body: JSON.stringify(printfulPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Failed to estimate cost: ${response.status} - ${errorText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json({ data: data.result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
