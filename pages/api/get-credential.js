export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: 'Missing required fields: id is required',
    });
  }

  const response = await fetch(
    `https://api.accredible.com/v1/credentials/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${process.env.ACCREDIBLE_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  return res.status(response.status).json(data);
}
