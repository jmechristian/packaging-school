export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.printful.com/countries', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Failed to fetch countries: ${response.status} - ${errorText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json({ data: data.result });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return res.status(500).json({ error: error.message });
  }
}
