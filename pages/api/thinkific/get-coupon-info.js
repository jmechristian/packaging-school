export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, coupon } = req.query;

  try {
    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/promotions/by_coupon?product_id=${id}&coupon_code=${coupon}`,
      {
        headers: {
          'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
        },
      }
    );

    const data = await response.json();

    // Check if the response indicates an error
    if (!response.ok || data.error || data.message === 'Record not found') {
      console.log('Thinkific API error:', { status: response.status, data });
      return res.status(404).json({
        error: 'Coupon not found',
        message: data.message || 'Coupon not found for this product',
        coupon: coupon,
        product_id: id,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching coupon info:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch coupon information',
    });
  }
}
