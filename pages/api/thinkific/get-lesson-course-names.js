const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';

const QUERY_LESSON_COURSE_NAME = `
  query Lesson($lessonId: ID!) {
    lesson(id: $lessonId) {
      id
      takeUrl
      course {
        name
      }
    }
  }
`;

function normalizeLessonIds(raw) {
  if (!Array.isArray(raw)) return [];
  const ids = raw
    .map((v) => String(v || '').trim())
    .filter(Boolean);
  return [...new Set(ids)];
}

async function fetchLessonCourseName(lessonId, token) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY_LESSON_COURSE_NAME,
      variables: { lessonId },
    }),
  });

  const json = await response.json().catch(() => ({}));
  return {
    lessonId,
    httpStatus: response.status,
    ok: response.ok,
    courseName: json?.data?.lesson?.course?.name || null,
    takeUrl: json?.data?.lesson?.takeUrl || null,
    graphqlErrors: json?.errors || null,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const lessonIds = normalizeLessonIds(req.body?.lessonIds);
  if (!lessonIds.length) {
    res.status(400).json({
      message: 'lessonIds is required',
      hint: 'Send JSON: { "lessonIds": ["<Thinkific lesson ID>"] }',
    });
    return;
  }

  const apiKey = process.env.NEXT_THINKIFIC_PUBLIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      message: 'Server misconfiguration',
      detail: 'NEXT_THINKIFIC_PUBLIC_API_KEY is not set',
    });
    return;
  }

  try {
    const results = [];
    for (const lessonId of lessonIds) {
      // Keep these sequential for deterministic response order in UI.
      // Count is typically small (wired lesson IDs list).
      // eslint-disable-next-line no-await-in-loop
      const item = await fetchLessonCourseName(lessonId, apiKey);
      results.push(item);
    }

    const names = [...new Set(results.map((r) => r.courseName).filter(Boolean))];
    const takeUrlsByLessonId = results.reduce((acc, item) => {
      if (item?.lessonId && item?.takeUrl) {
        acc[item.lessonId] = item.takeUrl;
      }
      return acc;
    }, {});

    res.status(200).json({
      lessonIds,
      names,
      takeUrlsByLessonId,
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Failed to resolve lesson course names',
      lessonIds,
    });
  }
}
