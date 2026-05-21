const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';
const LESSON_CACHE_TTL_MS = 1000 * 60 * 15;
const lessonLookupCache = new Map();

const QUERY_LESSON_COURSE_NAME = `
  query Lesson($lessonId: ID!) {
    lesson(id: $lessonId) {
      id
      title
      takeUrl
      course {
        id
        name
        description
        cardImage {
          url
        }
        product {
          checkoutUrl
        }
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimited(response, json) {
  if (response?.status === 429) return true;
  const errors = json?.errors;
  if (!Array.isArray(errors)) return false;
  return errors.some((err) => String(err?.message || '').includes('429'));
}

async function postLessonGraphqlWithRetry(lessonId, token) {
  let lastResponse;
  let lastJson = {};
  const backoffMs = [200, 500, 1000];

  for (let i = 0; i < backoffMs.length; i += 1) {
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

async function fetchLessonCourseName(lessonId, token) {
  const cached = lessonLookupCache.get(lessonId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const { response, json } = await postLessonGraphqlWithRetry(lessonId, token);
  const value = {
    lessonId,
    httpStatus: response?.status || 500,
    ok: response?.ok || false,
    courseId: json?.data?.lesson?.course?.id || null,
    lessonTitle: json?.data?.lesson?.title || null,
    courseName: json?.data?.lesson?.course?.name || null,
    courseDescription: json?.data?.lesson?.course?.description || null,
    courseCardImageUrl: json?.data?.lesson?.course?.cardImage?.url || null,
    takeUrl: json?.data?.lesson?.takeUrl || null,
    checkoutUrl: json?.data?.lesson?.course?.product?.checkoutUrl || null,
    graphqlErrors: json?.errors || null,
  };

  if (value.courseId || value.courseName || value.takeUrl || value.checkoutUrl) {
    lessonLookupCache.set(lessonId, {
      value,
      expiresAt: Date.now() + LESSON_CACHE_TTL_MS,
    });
  }

  return value;
}

function normalizeDistinct(values) {
  return [...new Set(values.filter(Boolean))];
}

function mapByLessonId(items, key) {
  return items.reduce((acc, item) => {
    if (item?.lessonId && item?.[key]) {
      acc[item.lessonId] = item[key];
    }
    return acc;
  }, {});
}

function mapCourseIdByLessonId(items) {
  return items.reduce((acc, item) => {
    if (item?.lessonId && item?.courseId) {
      acc[item.lessonId] = item.courseId;
    }
    return acc;
  }, {});
}

function mapCourseDetailsByCourseId(items) {
  return items.reduce((acc, item) => {
    if (!item?.courseId) return acc;
    if (acc[item.courseId]) return acc;
    acc[item.courseId] = {
      id: item.courseId,
      name: item.courseName || null,
      description: item.courseDescription || null,
      cardImageUrl: item.courseCardImageUrl || null,
    };
    return acc;
  }, {});
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

    const names = normalizeDistinct(results.map((r) => r.courseName));
    const courseIds = normalizeDistinct(results.map((r) => r.courseId));
    const courseIdsByLessonId = mapCourseIdByLessonId(results);
    const courseDetailsByCourseId = mapCourseDetailsByCourseId(results);
    const takeUrlsByLessonId = mapByLessonId(results, 'takeUrl');
    const checkoutUrlsByLessonId = mapByLessonId(results, 'checkoutUrl');

    res.status(200).json({
      lessonIds,
      names,
      courseIds,
      courseIdsByLessonId,
      courseDetailsByCourseId,
      takeUrlsByLessonId,
      checkoutUrlsByLessonId,
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Failed to resolve lesson course names',
      lessonIds,
    });
  }
}
