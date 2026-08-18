import { getSession } from '@auth0/nextjs-auth0';
import crypto from 'crypto';
import { getAWSUser } from '../../../../helpers/api';
import {
  createLibraryEnrollmentRequest,
  getEnrollmentRequestsByRequesterUser,
  getEnrollmentRequestsBySalesLeaderUser,
} from '../../../../helpers/libraryEnrollmentRequests';
import { ensureNetworkDistributionThinkific } from '../../../../helpers/thinkificLibrary';
import { sendLibraryEnrollmentRequestEmail } from '../../../../helpers/libraryEnrollmentEmails';
import { getAppBaseUrl } from '../../../../helpers/appBaseUrl';
import { isWorkEmail } from '../../../../helpers/workEmail';

const LIBRARY_SLUG = 'network-distribution';
const COUPON_CODE = 'networklibrary';

const publicRequest = (item) => {
  if (!item) return item;
  const { decisionToken, ...rest } = item;
  return rest;
};

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  const sessionEmail = session.user.email.toLowerCase();

  if (req.method === 'POST' && !isWorkEmail(sessionEmail)) {
    return res.status(400).json({
      message: 'Use your work email. Personal addresses are not accepted.',
    });
  }

  const awsUser = await getAWSUser(sessionEmail);
  if (!awsUser?.id) {
    return res.status(400).json({
      message: 'No Packaging School account was found for this email.',
    });
  }

  if (req.method === 'GET') {
    const scope = req.query.scope === 'leader' ? 'leader' : 'mine';
    try {
      const items =
        scope === 'leader'
          ? await getEnrollmentRequestsBySalesLeaderUser(awsUser.id)
          : await getEnrollmentRequestsByRequesterUser(awsUser.id);

      return res.status(200).json({
        items: items.map(publicRequest).sort((a, b) =>
          (b.createdAt || '').localeCompare(a.createdAt || ''),
        ),
      });
    } catch (error) {
      console.error('List enrollment requests failed:', error);
      return res.status(500).json({ message: 'Failed to load requests.' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    salesLeaderEmail,
    courseId,
    courseName,
    courseImage,
    courseLink,
    thinkificId,
    couponCode,
    page,
  } = req.body || {};

  if (!isWorkEmail(salesLeaderEmail)) {
    return res.status(400).json({
      message: 'A valid work email for your sales leader is required.',
    });
  }

  if (!courseName || !courseId) {
    return res.status(400).json({ message: 'Course information is required.' });
  }

  const leaderEmail = salesLeaderEmail.trim().toLowerCase();

  try {
    const salesLeader = await getAWSUser(leaderEmail);
    if (!salesLeader?.id) {
      return res.status(400).json({
        message:
          'That sales leader email is not set up yet. Ask them to create a Packaging School account first.',
      });
    }

    const existing = await getEnrollmentRequestsByRequesterUser(awsUser.id);
    const duplicate = existing.find(
      (item) =>
        item.courseId === courseId &&
        item.librarySlug === LIBRARY_SLUG &&
        item.status === 'PENDING',
    );

    if (duplicate) {
      return res.status(409).json({
        message: 'You already have a pending request for this course.',
        item: publicRequest(duplicate),
      });
    }

    const name =
      awsUser.name ||
      session.user.name ||
      [session.user.given_name, session.user.family_name]
        .filter(Boolean)
        .join(' ') ||
      sessionEmail;

    try {
      await ensureNetworkDistributionThinkific({
        email: sessionEmail,
        firstName: session.user.given_name,
        lastName: session.user.family_name,
        name,
      });
    } catch (thinkificError) {
      console.warn('Thinkific ensure/group failed (non-fatal):', thinkificError);
    }

    const decisionToken = crypto.randomBytes(32).toString('hex');
    const created = await createLibraryEnrollmentRequest({
      librarySlug: LIBRARY_SLUG,
      status: 'PENDING',
      requesterUserID: awsUser.id,
      requesterEmail: sessionEmail,
      requesterName: name,
      salesLeaderUserID: salesLeader.id,
      salesLeaderEmail: leaderEmail,
      salesLeaderName: salesLeader.name || null,
      courseId,
      courseName,
      courseImage: courseImage || null,
      courseLink: courseLink || null,
      thinkificId: thinkificId || null,
      couponCode: couponCode || COUPON_CODE,
      decisionToken,
      page: page || '/network-distribution',
    });

    const baseUrl = getAppBaseUrl(req);
    const decideUrl = (action) =>
      `${baseUrl}/api/network-distribution/enrollment-requests/decide?id=${encodeURIComponent(
        created.id,
      )}&action=${action}&token=${encodeURIComponent(decisionToken)}`;

    await sendLibraryEnrollmentRequestEmail({
      to: leaderEmail,
      requesterName: name,
      requesterEmail: sessionEmail,
      courseName,
      courseImage,
      approveUrl: decideUrl('approve'),
      declineUrl: decideUrl('decline'),
      dashboardUrl: `${baseUrl}/network-distribution/approvals`,
    });

    return res.status(201).json({ item: publicRequest(created) });
  } catch (error) {
    console.error('Create enrollment request failed:', error);
    return res.status(500).json({ message: 'Failed to submit enrollment request.' });
  }
}
