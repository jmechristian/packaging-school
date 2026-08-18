import { getSession } from '@auth0/nextjs-auth0';
import { sendLibraryEnrollmentTestEmail } from '../../../../helpers/libraryEnrollmentEmails';
import { getAppBaseUrl } from '../../../../helpers/appBaseUrl';

const SAMPLE = (baseUrl, email) => ({
  requesterName: 'Alex Rivera',
  requesterEmail: email,
  courseName: 'Certificate of Packaging Science Bundle',
  courseImage:
    'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/003/803/1507034685.original.jpg',
  approveUrl: `${baseUrl}/api/network-distribution/enrollment-requests/decide?id=preview&action=approve&token=preview`,
  declineUrl: `${baseUrl}/api/network-distribution/enrollment-requests/decide?id=preview&action=decline&token=preview`,
  dashboardUrl: `${baseUrl}/network-distribution/approvals`,
  courseUrl: `${baseUrl}/network-distribution`,
  catalogUrl: `${baseUrl}/network-distribution`,
  declineReason: 'Please enroll in the individual course instead of the bundle.',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  const email = session?.user?.email?.toLowerCase() || '';
  if (!email.endsWith('@packagingschool.com')) {
    return res.status(401).json({ message: 'Packaging School login required.' });
  }

  const template = req.body?.template || 'request';
  const to = req.body?.to || email;

  try {
    await sendLibraryEnrollmentTestEmail({
      to,
      template,
      props: SAMPLE(getAppBaseUrl(req), email),
    });
    return res.status(200).json({ message: 'sent', to, template });
  } catch (error) {
    console.error('Send test enrollment email failed:', error);
    return res.status(500).json({ message: 'Failed to send test email.' });
  }
}
