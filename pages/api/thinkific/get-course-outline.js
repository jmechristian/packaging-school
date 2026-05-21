const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';
const COURSE_OUTLINE_CACHE_TTL_MS = 1000 * 60 * 15;
const courseOutlineCache = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimited(response, json) {
  if (response?.status === 429) return true;
  const errors = json?.errors;
  if (!Array.isArray(errors)) return false;
  return errors.some((err) => String(err?.message || '').includes('429'));
}

async function fetchCourseOutlineWithRetry(query, variables, apiKey) {
  let lastResponse;
  let lastJson = {};
  const backoffMs = [200, 500, 1000];

  for (let i = 0; i < backoffMs.length; i += 1) {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await response.json().catch(() => ({}));
    lastResponse = response;
    lastJson = json;

    if (!isRateLimited(response, json)) {
      return { response, json };
    }
    if (i < backoffMs.length - 1) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(backoffMs[i]);
    }
  }
  return { response: lastResponse, json: lastJson };
}

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

  const apiKey = process.env.NEXT_THINKIFIC_PUBLIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      message: 'error',
      error: 'NEXT_THINKIFIC_PUBLIC_API_KEY is not set',
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
    const cacheKey = String(id).trim();
    const cached = courseOutlineCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return res.status(200).json({
        message: 'success',
        data: cached.data,
        fromCache: true,
      });
    }

    const variables = {
      first: 100,
      lessonsFirst2: 100,
      courseId: id,
    };
    const { response, json: data } = await fetchCourseOutlineWithRetry(
      query,
      variables,
      apiKey
    );

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

    courseOutlineCache.set(cacheKey, {
      data,
      expiresAt: Date.now() + COURSE_OUTLINE_CACHE_TTL_MS,
    });

    return res.status(200).json({ message: 'success', data, fromCache: false });
  } catch (error) {
    console.error('Error fetching course outline:', error);
    return res.status(500).json({
      message: 'error',
      error: error.message || 'Internal server error',
    });
  }
}
