export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: 'error',
      error:
        'id is required. Please provide an id in the URL query parameters (e.g. /api/thinkific/get-course-outline?id=123)',
    });
  }

  const query = `
    query Course($courseId: ID!, $first: Int, $lessonsFirst2: Int) {
  course(id: $courseId) {
    id
    instructor {
      fullName
      bio
      title
    }
    description
    name
    title
    curriculum {
      chaptersCount
      lessonsCount
      totalVideoContentTime
      chapters(first: $first) {
        edges {
          node {
            title
            position
            id
            lessons(first: $lessonsFirst2) {
              edges {
                node {
                  title
                  lessonType
                  id
                }
              }
            }
          }
        }
      }
    }
    product {
      cardImageUrl
      checkoutUrl
      primaryPrice {
        displayPrice
      }
    }
  }
}
  `;

  try {
    const response = await fetch('https://api.thinkific.com/stable/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_THINKIFIC_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          first: 15,
          lessonsFirst2: 15,
          courseId: id,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'error',
        error: data?.message || `Request failed with status ${response.status}`,
      });
    }

    if (data?.errors) {
      return res.status(400).json({
        message: 'error',
        error: data.errors[0]?.message || 'GraphQL error',
        errors: data.errors,
      });
    }

    return res.status(200).json({ message: 'success', data });
  } catch (error) {
    console.error('Error fetching course outline:', error);
    return res.status(500).json({
      message: 'error',
      error: error.message || 'Internal server error',
    });
  }
}
