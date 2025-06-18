export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const { name, email, groupId } = body;

  if (!name || !email || !groupId) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, and groupId are required',
    });
  }

  const response = await fetch('https://api.accredible.com/v1/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${process.env.ACCREDIBLE_API_KEY}`,
    },
    body: JSON.stringify({
      credential: {
        recipient: {
          name: name,
          email: email,
        },
        group_id: groupId,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  return res.status(response.status).json(data);
}
