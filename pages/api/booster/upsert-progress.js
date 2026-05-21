const APPSYNC_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const APPSYNC_API_KEY = process.env.GRAPHQL_API_KEY;
const THINKIFIC_API_KEY = process.env.NEXT_THINKIFIC_PUBLIC_API_KEY;
const THINKIFIC_GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';
const BOOSTER_MILESTONES = [10, 20];

const QUERY_LESSON_TO_COURSE = `
  query Lesson($lessonId: ID!) {
    lesson(id: $lessonId) {
      id
      title
      course {
        id
        name
      }
    }
  }
`;

const QUERY_COURSE_LESSONS_COUNT = `
  query Course($courseId: ID!) {
    course(id: $courseId) {
      id
      curriculum {
        lessonsCount
      }
    }
  }
`;

const QUERY_PROGRESS_BY_USER = `
  query BoosterProgressByUser($userId: ID!, $filter: ModelBoosterCourseProgressFilterInput, $limit: Int) {
    boosterProgressByUser(userId: $userId, filter: $filter, limit: $limit) {
      items {
        id
        userId
        userEmail
        thinkificCourseId
        courseTitle
        completedLessonIds
        completedLessonTitles
        totalLessonCount
        percentComplete
        milestonesIssued
      }
    }
  }
`;

const QUERY_CODES_BY_USER = `
  query BoosterCodesByUser($userId: ID!, $filter: ModelBoosterDiscountCodeFilterInput, $limit: Int) {
    boosterCodesByUser(userId: $userId, filter: $filter, limit: $limit) {
      items {
        id
        milestonePercent
        code
      }
    }
  }
`;

const MUTATION_CREATE_PROGRESS = `
  mutation CreateBoosterCourseProgress($input: CreateBoosterCourseProgressInput!) {
    createBoosterCourseProgress(input: $input) {
      id
      thinkificCourseId
      courseTitle
      completedLessonIds
      completedLessonTitles
      totalLessonCount
      percentComplete
      milestonesIssued
    }
  }
`;

const MUTATION_UPDATE_PROGRESS = `
  mutation UpdateBoosterCourseProgress($input: UpdateBoosterCourseProgressInput!) {
    updateBoosterCourseProgress(input: $input) {
      id
      thinkificCourseId
      courseTitle
      completedLessonIds
      completedLessonTitles
      totalLessonCount
      percentComplete
      milestonesIssued
    }
  }
`;

const MUTATION_CREATE_DISCOUNT_CODE = `
  mutation CreateBoosterDiscountCode($input: CreateBoosterDiscountCodeInput!) {
    createBoosterDiscountCode(input: $input) {
      id
      thinkificCourseId
      milestonePercent
      code
      issuedAt
    }
  }
`;

function normalizeLessonIds(raw) {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.map((v) => String(v || '').trim()).filter(Boolean))];
}

function pct(completed, total) {
  if (!total || total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round(((completed / total) * 100) * 100) / 100));
}

function makeCode(milestonePercent) {
  return `BOOST-${milestonePercent}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function throwIfGraphqlErrors(json, context) {
  if (Array.isArray(json?.errors) && json.errors.length > 0) {
    const detail = json.errors
      .map((err) => err?.message)
      .filter(Boolean)
      .join(' | ');
    throw new Error(`${context}: ${detail || 'GraphQL request failed'}`);
  }
}

async function postJson(url, headers, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => ({}));
  return { response, json };
}

async function thinkific(query, variables) {
  return postJson(
    THINKIFIC_GRAPHQL_URL,
    {
      Authorization: `Bearer ${THINKIFIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    { query, variables }
  );
}

async function appSync(query, variables) {
  return postJson(
    APPSYNC_ENDPOINT,
    {
      'x-api-key': APPSYNC_API_KEY,
      'Content-Type': 'application/json',
    },
    { query, variables }
  );
}

async function lessonMappings(lessonIds) {
  const rows = [];
  for (const lessonId of lessonIds) {
    // eslint-disable-next-line no-await-in-loop
    const { json } = await thinkific(QUERY_LESSON_TO_COURSE, { lessonId });
    throwIfGraphqlErrors(json, `Thinkific lesson lookup failed for ${lessonId}`);
    const lesson = json?.data?.lesson;
    if (!lesson?.course?.id) continue;
    rows.push({
      lessonId: lesson.id || lessonId,
      lessonTitle: lesson.title || null,
      courseId: lesson.course.id,
      courseTitle: lesson.course.name || null,
    });
  }
  return rows;
}

async function getTotalLessons(courseId) {
  const { json } = await thinkific(QUERY_COURSE_LESSONS_COUNT, { courseId });
  throwIfGraphqlErrors(json, `Thinkific course outline failed for ${courseId}`);
  return Number(json?.data?.course?.curriculum?.lessonsCount || 0);
}

async function getProgress(userId, courseId) {
  const { json } = await appSync(QUERY_PROGRESS_BY_USER, {
    userId,
    limit: 1,
    filter: { thinkificCourseId: { eq: courseId } },
  });
  throwIfGraphqlErrors(json, `AppSync progress query failed for course ${courseId}`);
  return json?.data?.boosterProgressByUser?.items?.[0] || null;
}

async function hasCode(userId, courseId, milestonePercent) {
  const { json } = await appSync(QUERY_CODES_BY_USER, {
    userId,
    limit: 1,
    filter: {
      thinkificCourseId: { eq: courseId },
      milestonePercent: { eq: milestonePercent },
    },
  });
  throwIfGraphqlErrors(
    json,
    `AppSync discount code query failed for course ${courseId} milestone ${milestonePercent}`
  );
  return Boolean(json?.data?.boosterCodesByUser?.items?.[0]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  if (!APPSYNC_ENDPOINT || !APPSYNC_API_KEY || !THINKIFIC_API_KEY) {
    return res.status(500).json({ message: 'Missing required API environment variables.' });
  }

  const userId = String(req.body?.userId || '').trim();
  const userEmail = String(req.body?.userEmail || '').trim().toLowerCase();
  const lessonIds = normalizeLessonIds(req.body?.lessonIds);

  if (!userId || !userEmail || !lessonIds.length) {
    return res.status(400).json({ message: 'userId, userEmail, and lessonIds are required.' });
  }

  try {
    const mappings = await lessonMappings(lessonIds);
    if (!mappings.length) {
      return res.status(400).json({
        message: 'No valid Thinkific lesson-to-course mappings found for lessonIds.',
        lessonIds,
      });
    }
    const byCourse = mappings.reduce((acc, item) => {
      if (!acc[item.courseId]) {
        acc[item.courseId] = {
          courseId: item.courseId,
          courseTitle: item.courseTitle,
          lessonIds: [],
          lessonTitles: [],
        };
      }
      acc[item.courseId].lessonIds.push(item.lessonId);
      if (item.lessonTitle) acc[item.courseId].lessonTitles.push(item.lessonTitle);
      return acc;
    }, {});

    const progress = [];
    const issuedCodes = [];

    for (const courseId of Object.keys(byCourse)) {
      const group = byCourse[courseId];
      // eslint-disable-next-line no-await-in-loop
      const totalLessonCount = await getTotalLessons(courseId);
      // eslint-disable-next-line no-await-in-loop
      const existing = await getProgress(userId, courseId);

      const completedLessonIds = [
        ...new Set([...(existing?.completedLessonIds || []), ...group.lessonIds]),
      ];
      const completedLessonTitles = [
        ...new Set([...(existing?.completedLessonTitles || []), ...group.lessonTitles]),
      ];
      const percentComplete = pct(completedLessonIds.length, totalLessonCount);
      const milestonesIssued = Array.isArray(existing?.milestonesIssued)
        ? existing.milestonesIssued
        : [];

      const baseInput = {
        userId,
        userEmail,
        thinkificCourseId: courseId,
        courseTitle: group.courseTitle || existing?.courseTitle || null,
        completedLessonIds,
        completedLessonTitles,
        totalLessonCount,
        percentComplete,
      };

      const reached = BOOSTER_MILESTONES.filter(
        (milestone) => percentComplete >= milestone && !milestonesIssued.includes(milestone)
      );
      const nextMilestones = [...new Set([...milestonesIssued, ...reached])];

      let saved;
      if (existing?.id) {
        // eslint-disable-next-line no-await-in-loop
        const { json } = await appSync(MUTATION_UPDATE_PROGRESS, {
          input: { id: existing.id, ...baseInput, milestonesIssued: nextMilestones },
        });
        throwIfGraphqlErrors(json, `AppSync update progress failed for course ${courseId}`);
        saved = json?.data?.updateBoosterCourseProgress;
      } else {
        // eslint-disable-next-line no-await-in-loop
        const { json } = await appSync(MUTATION_CREATE_PROGRESS, {
          input: { ...baseInput, milestonesIssued: nextMilestones },
        });
        throwIfGraphqlErrors(json, `AppSync create progress failed for course ${courseId}`);
        saved = json?.data?.createBoosterCourseProgress;
      }
      if (!saved) {
        throw new Error(
          `AppSync returned null progress object for course ${courseId}. Check schema deployment and resolvers.`
        );
      }

      progress.push(saved);

      for (const milestonePercent of reached) {
        // eslint-disable-next-line no-await-in-loop
        const exists = await hasCode(userId, courseId, milestonePercent);
        if (exists) continue;

        // eslint-disable-next-line no-await-in-loop
        const { json } = await appSync(MUTATION_CREATE_DISCOUNT_CODE, {
          input: {
            userId,
            userEmail,
            thinkificCourseId: courseId,
            milestonePercent,
            code: makeCode(milestonePercent),
            issuedAt: new Date().toISOString(),
            isRedeemed: false,
          },
        });
        throwIfGraphqlErrors(
          json,
          `AppSync create discount code failed for course ${courseId} milestone ${milestonePercent}`
        );
        const created = json?.data?.createBoosterDiscountCode;
        if (created) issuedCodes.push(created);
      }
    }

    return res.status(200).json({ message: 'success', progress, issuedCodes });
  } catch (error) {
    return res.status(500).json({ message: error?.message || 'Failed to upsert booster progress.' });
  }
}
