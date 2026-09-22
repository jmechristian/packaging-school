import { getSession } from '@auth0/nextjs-auth0';
import {
  isApprovedSalesLeader,
  listLearnersBySalesLeader,
  normalizeEmail,
} from '../../../helpers/networkDistributionLeaders';
import { getEnrollmentRequestsBySalesLeader } from '../../../helpers/libraryEnrollmentRequests';

const THINKIFIC_REST = 'https://api.thinkific.com/api/public/v1';

const normalizeName = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const fetchThinkificEnrollments = async (email) => {
  const response = await fetch(
    `${THINKIFIC_REST}/enrollments?page=1&limit=500&query[email]=${encodeURIComponent(
      email,
    )}`,
    {
      headers: {
        'X-Auth-API-Key':
          process.env.NEXT_THINKIFIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY,
        'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Thinkific enrollments failed (${response.status})`);
  }

  const data = await response.json();
  return data.items || [];
};

const enrollmentMatchesRequest = (enrollment, request) => {
  if (
    request.thinkificId &&
    String(enrollment.course_id) === String(request.thinkificId)
  ) {
    return true;
  }
  return (
    Boolean(request.courseName) &&
    normalizeName(enrollment.course_name) === normalizeName(request.courseName)
  );
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  const sessionEmail = session?.user?.email?.toLowerCase();
  if (!sessionEmail) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  try {
    const isLeader = await isApprovedSalesLeader(sessionEmail);
    if (!isLeader) {
      return res.status(403).json({
        message: 'Only approved sales leaders can view learner progress.',
      });
    }

    const [learners, requests] = await Promise.all([
      listLearnersBySalesLeader(sessionEmail),
      getEnrollmentRequestsBySalesLeader(sessionEmail),
    ]);

    const approvedRequests = requests.filter(
      (item) => item.status === 'APPROVED',
    );

    const roster = new Map();
    learners.forEach((learner) => {
      roster.set(normalizeEmail(learner.email), {
        email: normalizeEmail(learner.email),
        name: learner.name || null,
        firstApprovedAt: learner.firstApprovedAt || null,
        courses: [],
      });
    });

    approvedRequests.forEach((request) => {
      const email = normalizeEmail(request.requesterEmail);
      if (!email) return;
      if (!roster.has(email)) {
        roster.set(email, {
          email,
          name: request.requesterName || null,
          firstApprovedAt: request.decidedAt || null,
          courses: [],
        });
      }
    });

    const learnersOut = [];
    for (const learner of roster.values()) {
      const learnerRequests = approvedRequests.filter(
        (item) => normalizeEmail(item.requesterEmail) === learner.email,
      );

      let enrollments = [];
      try {
        enrollments = await fetchThinkificEnrollments(learner.email);
      } catch (thinkificError) {
        console.error(
          'Thinkific progress fetch failed for',
          learner.email,
          thinkificError,
        );
      }

      const courses = learnerRequests.map((request) => {
        const match = enrollments.find((enrollment) =>
          enrollmentMatchesRequest(enrollment, request),
        );
        return {
          courseId: request.courseId,
          courseName: request.courseName,
          approvedAt: request.decidedAt || null,
          percentComplete:
            match?.percentage_completed != null
              ? Number(match.percentage_completed)
              : null,
          completed: Boolean(match?.completed),
          expired: Boolean(match?.expired),
        };
      });

      learnersOut.push({
        ...learner,
        courses,
      });
    }

    learnersOut.sort((a, b) =>
      (a.name || a.email).localeCompare(b.name || b.email),
    );

    return res.status(200).json({ items: learnersOut });
  } catch (error) {
    console.error('Leader progress failed:', error);
    return res.status(500).json({ message: 'Failed to load learner progress.' });
  }
}
