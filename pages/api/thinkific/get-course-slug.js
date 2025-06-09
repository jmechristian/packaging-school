export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({
      message: 'error',
      error:
        'courseId is required. Please provide a courseId in the URL query parameters (e.g. /api/thinkific/get-course-slug?courseId=123)',
    });
  }

  const query = `
        query Query($courseId: ID!) {
  course(id: $courseId) {
    slug
  }
}   
      `;

  console.log('Query variables:', { courseId });

  return fetch('https://api.thinkific.com/stable/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_THINKIFIC_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        courseId,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => res.status(200).json({ message: 'success', data }))
    .catch((error) =>
      res.status(500).json({ message: 'error', error: error.message })
    );
}
