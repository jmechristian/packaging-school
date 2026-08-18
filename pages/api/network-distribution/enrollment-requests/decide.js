import { getSession } from '@auth0/nextjs-auth0';
import {
  getLibraryEnrollmentRequest,
  updateLibraryEnrollmentRequest,
} from '../../../../helpers/libraryEnrollmentRequests';
import {
  createThinkificBundleEnrollment,
  createThinkificEnrollment,
  ensureNetworkDistributionThinkific,
  getNetworkDistributionBundleId,
} from '../../../../helpers/thinkificLibrary';
import {
  sendLibraryEnrollmentApprovedEmail,
  sendLibraryEnrollmentDeclinedEmail,
} from '../../../../helpers/libraryEnrollmentEmails';
import { getAppBaseUrl } from '../../../../helpers/appBaseUrl';
import { getAWSUser } from '../../../../helpers/api';

const htmlPage = (title, message, ok = true) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body { font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 64px 24px; color: #111; }
      .card { max-width: 520px; margin: 0 auto; border: 2px solid #111; border-radius: 16px; padding: 32px; }
      h1 { color: ${ok ? '#0A1D3A' : '#B91C1C'}; font-size: 24px; }
      a { color: #0A1D3A; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${title}</h1>
      <p>${message}</p>
    </div>
  </body>
</html>`;

const wantsHtml = (req) => {
  if (req.method === 'GET') return true;
  const accept = req.headers.accept || '';
  return accept.includes('text/html');
};

const buildCourseUrl = (request) => {
  if (!request?.courseLink) return null;
  const cleaned = String(request.courseLink).replace(/^Link:\s*/i, '').trim();
  if (!cleaned) return null;
  if (cleaned.includes('coupon=')) return cleaned;
  const coupon = request.couponCode || 'networklibrary';
  return `${cleaned}${cleaned.includes('?') ? '&' : '?'}coupon=${coupon}`;
};

const decideRequest = async ({ request, action, declineReason, decidedByEmail, req }) => {
  if (request.status !== 'PENDING') {
    return { request, alreadyDecided: true };
  }

  const baseUrl = getAppBaseUrl(req);
  const now = new Date().toISOString();

  if (action === 'decline') {
    const updated = await updateLibraryEnrollmentRequest({
      id: request.id,
      status: 'DECLINED',
      decidedAt: now,
      decidedByEmail,
      declineReason: declineReason || null,
    });

    await sendLibraryEnrollmentDeclinedEmail({
      to: request.requesterEmail,
      requesterName: request.requesterName,
      courseName: request.courseName,
      catalogUrl: `${baseUrl}/network-distribution`,
      declineReason,
    });

    return { request: updated };
  }

  let thinkificEnrollmentId = request.thinkificEnrollmentId || null;
  const { user } = await ensureNetworkDistributionThinkific({
    email: request.requesterEmail,
    name: request.requesterName,
  });

  const bundleId = getNetworkDistributionBundleId(request);
  try {
    if (bundleId) {
      const enrollment = await createThinkificBundleEnrollment({
        userId: user.id,
        bundleId,
      });
      thinkificEnrollmentId = enrollment?.id
        ? String(enrollment.id)
        : thinkificEnrollmentId;
    } else if (request.thinkificId) {
      const enrollment = await createThinkificEnrollment({
        userId: user.id,
        courseId: request.thinkificId,
      });
      thinkificEnrollmentId = enrollment?.id
        ? String(enrollment.id)
        : thinkificEnrollmentId;
    }
  } catch (enrollError) {
    console.error('Thinkific enrollment failed:', enrollError);
  }

  const updated = await updateLibraryEnrollmentRequest({
    id: request.id,
    status: 'APPROVED',
    decidedAt: now,
    decidedByEmail,
    thinkificEnrollmentId,
  });

  const courseUrl = buildCourseUrl(request);
  await sendLibraryEnrollmentApprovedEmail({
    to: request.requesterEmail,
    requesterName: request.requesterName,
    courseName: request.courseName,
    courseImage: request.courseImage,
    dashboardUrl: `${baseUrl}/profile?tab=courses`,
    courseUrl: courseUrl || `${baseUrl}/network-distribution`,
  });

  return { request: updated };
};

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.method === 'GET' ? req.query.id : req.body?.id || req.query.id;
  const action = String(
    req.method === 'GET' ? req.query.action : req.body?.action || req.query.action,
  ).toLowerCase();
  const token =
    req.method === 'GET' ? req.query.token : req.body?.token || req.query.token;
  const declineReason =
    req.method === 'GET' ? req.query.reason : req.body?.reason;

  if (!id || !['approve', 'decline'].includes(action)) {
    if (wantsHtml(req)) {
      return res
        .status(400)
        .send(htmlPage('Invalid request', 'Missing request id or action.', false));
    }
    return res.status(400).json({ message: 'Missing request id or action.' });
  }

  try {
    const request = await getLibraryEnrollmentRequest(id);
    if (!request) {
      if (wantsHtml(req)) {
        return res
          .status(404)
          .send(htmlPage('Not found', 'This enrollment request does not exist.', false));
      }
      return res.status(404).json({ message: 'Request not found.' });
    }

    const session = await getSession(req, res);
    const sessionEmail = session?.user?.email?.toLowerCase();
    const tokenMatches = token && token === request.decisionToken;
    let leaderMatches =
      sessionEmail && sessionEmail === request.salesLeaderEmail?.toLowerCase();

    if (!leaderMatches && sessionEmail) {
      const leader = await getAWSUser(sessionEmail);
      leaderMatches = Boolean(
        leader?.id && leader.id === request.salesLeaderUserID,
      );
    }

    if (!tokenMatches && !leaderMatches) {
      if (wantsHtml(req)) {
        return res
          .status(403)
          .send(
            htmlPage(
              'Not authorized',
              'This approval link is invalid or expired.',
              false,
            ),
          );
      }
      return res.status(403).json({ message: 'Not authorized to decide this request.' });
    }

    const result = await decideRequest({
      request,
      action,
      declineReason,
      decidedByEmail: sessionEmail || request.salesLeaderEmail,
      req,
    });

    const verb = action === 'approve' ? 'approved' : 'declined';
    if (wantsHtml(req)) {
      const title = result.alreadyDecided
        ? 'Already processed'
        : action === 'approve'
          ? 'Enrollment approved'
          : 'Enrollment declined';
      const message = result.alreadyDecided
        ? `This request was already ${String(result.request.status).toLowerCase()}.`
        : `You ${verb} ${request.requesterName}'s request for ${request.courseName}.`;
      return res.status(200).send(htmlPage(title, message, true));
    }

    const { decisionToken, ...safe } = result.request || {};
    return res.status(200).json({ item: safe, alreadyDecided: result.alreadyDecided });
  } catch (error) {
    console.error('Decide enrollment request failed:', error);
    if (wantsHtml(req)) {
      return res
        .status(500)
        .send(htmlPage('Error', 'Could not process this request. Please try again.', false));
    }
    return res.status(500).json({ message: 'Failed to process request.' });
  }
}
