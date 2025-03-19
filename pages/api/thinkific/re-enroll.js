export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Enrollment ID is required' });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    const expiryDateString = expiryDate.toISOString();

    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/enrollments/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-API-Key': process.env.NEXT_THINKIFIC_API_KEY,
          'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
        },
        method: 'PUT',
        body: JSON.stringify({
          expiry_date: expiryDateString,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Thinkific API error:', {
        status: response.status,
        statusText: response.statusText,
        enrollmentId: id,
        errorData,
      });

      if (response.status === 404) {
        return res.status(404).json({
          error: `Enrollment ID ${id} not found in Thinkific`,
        });
      }

      return res.status(response.status).json({
        error: `Thinkific API error: ${response.status} ${response.statusText}`,
        details: errorData,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enrollment expired successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
