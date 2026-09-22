import { getSession } from '@auth0/nextjs-auth0';
import {
  getCustomerLibraryBySlug,
  getLibraryEnrollmentRequest,
  updateCustomerLibrary,
  updateLibraryEnrollmentRequest,
} from '../../../../helpers/libraryEnrollmentRequests';
import {
  NETWORK_DISTRIBUTION_COUPON,
  NETWORK_DISTRIBUTION_COUPON_ID,
  NETWORK_DISTRIBUTION_PROMOTION_ID,
  createThinkificBundleEnrollment,
  createThinkificEnrollment,
  ensureNetworkDistributionThinkific,
  getNetworkDistributionBundleId,
  getThinkificCouponById,
  incrementThinkificCouponUsage,
  parseThinkificProductIdFromLink,
} from '../../../../helpers/thinkificLibrary';
import {
  sendLibraryEnrollmentApprovedEmail,
  sendLibraryEnrollmentDeclinedEmail,
  sendLibraryEnrollmentInternalEmail,
} from '../../../../helpers/libraryEnrollmentEmails';
import { getAppBaseUrl } from '../../../../helpers/appBaseUrl';
import { getAWSUser } from '../../../../helpers/api';
import {
  isApprovedSalesLeader,
  upsertLearner,
} from '../../../../helpers/networkDistributionLeaders';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const htmlPage = ({
  title,
  message,
  variant = 'info',
  courseName,
  studentName,
  dashboardUrl,
} = {}) => {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);
  const safeCourse = escapeHtml(courseName);
  const safeStudent = escapeHtml(studentName);
  const safeDashboard = escapeHtml(
    dashboardUrl || `${getAppBaseUrl()}/network-distribution/approvals`,
  );
  const tone =
    variant === 'approved'
      ? { mark: '✓', markBg: '#f4aa00', markColor: '#0A1D3A', label: 'Approved' }
      : variant === 'declined'
        ? { mark: '✕', markBg: '#fecdd3', markColor: '#9f1239', label: 'Declined' }
        : variant === 'already'
          ? { mark: 'i', markBg: '#e2e8f0', markColor: '#0A1D3A', label: 'Already processed' }
          : variant === 'error'
            ? { mark: '!', markBg: '#fecdd3', markColor: '#9f1239', label: 'Needs attention' }
            : { mark: 'i', markBg: '#e2e8f0', markColor: '#0A1D3A', label: 'Enrollment request' };

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      body {
        margin: 0;
        background: #f4f4f5;
        color: #334155;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        padding: 32px 12px;
      }
      .card {
        max-width: 560px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
      }
      .header { background: #0A1D3A; padding: 28px 32px 24px; }
      .eyebrow {
        color: #f4aa00;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin: 0 0 8px;
      }
      .header h1 {
        color: #fff;
        font-size: 22px;
        font-weight: 600;
        line-height: 1.3;
        margin: 0;
      }
      .content { padding: 28px 32px 8px; }
      .status {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 20px;
      }
      .mark {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: ${tone.markBg};
        color: ${tone.markColor};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .status-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #64748b;
        margin: 0 0 2px;
      }
      .status-title {
        font-size: 18px;
        font-weight: 600;
        color: #0A1D3A;
        margin: 0;
      }
      .message {
        font-size: 15px;
        line-height: 1.6;
        margin: 0 0 16px;
      }
      .course {
        background: #f8fafc;
        border-left: 3px solid #f4aa00;
        padding: 14px 16px;
        margin: 8px 0 24px;
      }
      .course-label {
        color: #64748b;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin: 0 0 4px;
      }
      .course-name {
        color: #0A1D3A;
        font-size: 17px;
        font-weight: 600;
        line-height: 1.4;
        margin: 0;
      }
      .footer {
        padding: 8px 32px 28px;
      }
      .button {
        display: inline-block;
        background: #0A1D3A;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 12px 22px;
        border-radius: 6px;
        text-decoration: none;
      }
      .footer-text {
        color: #64748b;
        font-size: 13px;
        line-height: 1.5;
        margin: 20px 0 0;
        padding-top: 16px;
        border-top: 1px solid #e2e8f0;
      }
      a { color: #0A1D3A; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <p class="eyebrow">Network Distribution Library</p>
        <h1>${safeTitle}</h1>
      </div>
      <div class="content">
        <div class="status">
          <div class="mark">${tone.mark}</div>
          <div>
            <p class="status-label">${tone.label}</p>
            ${safeStudent ? `<p class="status-title">${safeStudent}</p>` : ''}
          </div>
        </div>
        <p class="message">${safeMessage}</p>
        ${
          safeCourse
            ? `<div class="course"><p class="course-label">Course</p><p class="course-name">${safeCourse}</p></div>`
            : ''
        }
      </div>
      <div class="footer">
        <a class="button" href="${safeDashboard}">Open approvals dashboard</a>
        <p class="footer-text">Questions? Email <a href="mailto:info@packagingschool.com">info@packagingschool.com</a>.</p>
      </div>
    </div>
  </body>
</html>`;
};

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
  const coupon = request.couponCode || NETWORK_DISTRIBUTION_COUPON;
  return `${cleaned}${cleaned.includes('?') ? '&' : '?'}coupon=${coupon}`;
};

const numericId = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const resolveCouponLookup = async (librarySlug) => {
  const fromEnv = numericId(
    process.env.NEXT_THINKIFIC_NETWORK_PROMOTION_ID ||
      process.env.NETWORK_DISTRIBUTION_PROMOTION_ID,
  );

  let library = null;
  if (librarySlug) {
    try {
      library = await getCustomerLibraryBySlug(librarySlug);
    } catch (error) {
      console.warn('Could not load library promotion id:', error);
    }
  }

  return {
    library,
    promotionId:
      fromEnv ||
      numericId(library?.promotionId) ||
      NETWORK_DISTRIBUTION_PROMOTION_ID,
  };
};

const rememberPromotionId = async (library, promotionId) => {
  if (!library?.id || !promotionId || library.promotionId) return;
  try {
    await updateCustomerLibrary({
      id: library.id,
      promotionId: Number(promotionId),
    });
  } catch (error) {
    console.warn('Could not persist library promotion id:', error);
  }
};

const consumeThinkificCoupon = async (request) => {
  const { library, promotionId } = await resolveCouponLookup(request.librarySlug);
  const coupon = await incrementThinkificCouponUsage({
    code: request.couponCode || NETWORK_DISTRIBUTION_COUPON,
    promotionId,
    productId: parseThinkificProductIdFromLink(request.courseLink),
  });
  await rememberPromotionId(library, coupon?.promotion_id);
  return coupon;
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
  let enrollmentCreated = false;
  let coupon = null;
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
      enrollmentCreated = true;
    } else if (request.thinkificId) {
      const enrollment = await createThinkificEnrollment({
        userId: user.id,
        courseId: request.thinkificId,
      });
      thinkificEnrollmentId = enrollment?.id
        ? String(enrollment.id)
        : thinkificEnrollmentId;
      enrollmentCreated = true;
    }
  } catch (enrollError) {
    console.error('Thinkific enrollment failed:', enrollError);
  }

  if (enrollmentCreated) {
    try {
      coupon = await consumeThinkificCoupon(request);
    } catch (couponError) {
      console.error('Thinkific coupon increment failed:', couponError);
    }
  }

  if (!coupon) {
    try {
      coupon = await getThinkificCouponById(NETWORK_DISTRIBUTION_COUPON_ID);
    } catch (couponLookupError) {
      console.warn('Could not load Thinkific coupon for internal email:', couponLookupError);
    }
  }

  const updated = await updateLibraryEnrollmentRequest({
    id: request.id,
    status: 'APPROVED',
    decidedAt: now,
    decidedByEmail,
    thinkificEnrollmentId,
  });

  try {
    await upsertLearner({
      email: request.requesterEmail,
      salesLeaderEmail: request.salesLeaderEmail,
      name: request.requesterName,
    });
  } catch (rosterError) {
    console.error('ND learner roster upsert failed:', rosterError);
  }

  const courseUrl = buildCourseUrl(request);
  await sendLibraryEnrollmentApprovedEmail({
    to: request.requesterEmail,
    requesterName: request.requesterName,
    courseName: request.courseName,
    courseImage: request.courseImage,
    dashboardUrl: `${baseUrl}/profile?tab=courses`,
    courseUrl: courseUrl || `${baseUrl}/network-distribution`,
  });

  try {
    await sendLibraryEnrollmentInternalEmail({
      salesLeaderName: request.salesLeaderName,
      salesLeaderEmail: request.salesLeaderEmail,
      studentName: request.requesterName,
      studentEmail: request.requesterEmail,
      courseName: request.courseName,
      courseId: request.courseId,
      couponCode: request.couponCode || NETWORK_DISTRIBUTION_COUPON,
      couponUsed: coupon?.quantity_used,
      couponQuantity: coupon?.quantity,
    });
  } catch (internalEmailError) {
    console.error('Internal enrollment email failed:', internalEmailError);
  }

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
      return res.status(400).send(
        htmlPage({
          title: 'Invalid request',
          message: 'Missing request id or action.',
          variant: 'error',
        }),
      );
    }
    return res.status(400).json({ message: 'Missing request id or action.' });
  }

  try {
    const request = await getLibraryEnrollmentRequest(id);
    if (!request) {
      if (wantsHtml(req)) {
        return res.status(404).send(
          htmlPage({
            title: 'Not found',
            message: 'This enrollment request does not exist.',
            variant: 'error',
          }),
        );
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
            htmlPage({
              title: 'Not authorized',
              message: 'This approval link is invalid or expired.',
              variant: 'error',
            }),
          );
      }
      return res.status(403).json({ message: 'Not authorized to decide this request.' });
    }

    const leaderStillApproved = await isApprovedSalesLeader(
      request.salesLeaderEmail,
    );
    if (!leaderStillApproved) {
      if (wantsHtml(req)) {
        return res
          .status(403)
          .send(
            htmlPage({
              title: 'Not authorized',
              message:
                'This sales leader is no longer approved to decide enrollment requests.',
              variant: 'error',
            }),
          );
      }
      return res.status(403).json({
        message:
          'This sales leader is no longer approved to decide enrollment requests.',
      });
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
      const decidedStatus = String(result.request?.status || '').toUpperCase();
      const title = result.alreadyDecided
        ? 'Already processed'
        : action === 'approve'
          ? 'Enrollment approved'
          : 'Enrollment declined';
      const message = result.alreadyDecided
        ? `This request was already ${String(result.request.status).toLowerCase()}.`
        : `You ${verb} ${request.requesterName}'s request for ${request.courseName}.`;
      const variant = result.alreadyDecided
        ? decidedStatus === 'DECLINED'
          ? 'declined'
          : decidedStatus === 'APPROVED'
            ? 'approved'
            : 'already'
        : action === 'approve'
          ? 'approved'
          : 'declined';
      return res.status(200).send(
        htmlPage({
          title,
          message,
          variant,
          courseName: request.courseName,
          studentName: request.requesterName,
        }),
      );
    }

    const { decisionToken, ...safe } = result.request || {};
    return res.status(200).json({ item: safe, alreadyDecided: result.alreadyDecided });
  } catch (error) {
    console.error('Decide enrollment request failed:', error);
    if (wantsHtml(req)) {
      return res.status(500).send(
        htmlPage({
          title: 'Error',
          message: 'Could not process this request. Please try again.',
          variant: 'error',
        }),
      );
    }
    return res.status(500).json({ message: 'Failed to process request.' });
  }
}
