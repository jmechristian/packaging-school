import { API } from 'aws-amplify';

const BOOSTER_MILESTONES = [10, 20];

const QUERY_GET_PROGRESS_BY_ID = `
  query GetBoosterCourseProgress($id: ID!) {
    getBoosterCourseProgress(id: $id) {
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

function normalizeCourses(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const courseId = String(item?.courseId || '').trim();
      if (!courseId) return null;
      const lessonIds = normalizeLessonIds(item?.lessonIds);
      const lessonTitles = Array.isArray(item?.lessonTitles)
        ? [...new Set(item.lessonTitles.map((v) => String(v || '').trim()).filter(Boolean))]
        : [];
      const totalLessonCount = Number(item?.totalLessonCount || 0);
      return {
        courseId,
        courseTitle: String(item?.courseTitle || '').trim() || null,
        lessonIds,
        lessonTitles,
        totalLessonCount,
      };
    })
    .filter(Boolean);
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

async function appSync(query, variables) {
  try {
    const result = await API.graphql({ query, variables });
    return {
      json: {
        data: result?.data || null,
        errors: result?.errors || null,
      },
    };
  } catch (error) {
    if (Array.isArray(error?.errors)) {
      return {
        json: {
          data: error?.data || null,
          errors: error.errors,
        },
      };
    }
    throw error;
  }
}

async function getProgress(progressId, courseId) {
  const { json } = await appSync(QUERY_GET_PROGRESS_BY_ID, {
    id: progressId,
  });
  throwIfGraphqlErrors(json, `AppSync progress query failed for course ${courseId}`);
  return json?.data?.getBoosterCourseProgress || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const userId = String(req.body?.userId || '').trim();
  const userEmail = String(req.body?.userEmail || '').trim().toLowerCase();
  const courses = normalizeCourses(req.body?.courses);

  if (!userId || !userEmail || !courses.length) {
    return res.status(400).json({
      message: 'userId, userEmail, and courses are required.',
    });
  }

  try {
    const progress = [];
    const issuedCodes = [];

    for (const group of courses) {
      const courseId = group.courseId;
      const progressId = `${userId}#${courseId}`;
      // eslint-disable-next-line no-await-in-loop
      const existing = await getProgress(progressId, courseId);

      const completedLessonIds = [
        ...new Set([...(existing?.completedLessonIds || []), ...group.lessonIds]),
      ];
      const completedLessonTitles = [
        ...new Set([...(existing?.completedLessonTitles || []), ...group.lessonTitles]),
      ];
      const totalLessonCount = Number(group.totalLessonCount || existing?.totalLessonCount || 0);
      const percentComplete = pct(completedLessonIds.length, totalLessonCount);
      const milestonesIssued = Array.isArray(existing?.milestonesIssued)
        ? existing.milestonesIssued
        : [];

      const baseInput = {
        id: progressId,
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
          input: { ...baseInput, milestonesIssued: nextMilestones },
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
        const codeId = `${userId}#${courseId}#${milestonePercent}`;

        // eslint-disable-next-line no-await-in-loop
        const { json } = await appSync(MUTATION_CREATE_DISCOUNT_CODE, {
          input: {
            id: codeId,
            userId,
            userEmail,
            thinkificCourseId: courseId,
            milestonePercent,
            code: makeCode(milestonePercent),
            issuedAt: new Date().toISOString(),
            isRedeemed: false,
          },
        });
        // If code already exists (idempotency), ignore and continue.
        if (Array.isArray(json?.errors) && json.errors.length > 0) {
          const message = json.errors.map((e) => e?.message).join(' | ');
          if (!String(message).toLowerCase().includes('already exists')) {
            throwIfGraphqlErrors(
              json,
              `AppSync create discount code failed for course ${courseId} milestone ${milestonePercent}`
            );
          }
          continue;
        }
        const created = json?.data?.createBoosterDiscountCode;
        if (created) issuedCodes.push(created);
      }
    }

    return res.status(200).json({ message: 'success', progress, issuedCodes });
  } catch (error) {
    return res.status(500).json({ message: error?.message || 'Failed to upsert booster progress.' });
  }
}
