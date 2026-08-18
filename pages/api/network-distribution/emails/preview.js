import { getSession } from '@auth0/nextjs-auth0';
import { renderLibraryEnrollmentEmail } from '../../../../helpers/libraryEnrollmentEmails';
import { getAppBaseUrl } from '../../../../helpers/appBaseUrl';

const SAMPLE = (baseUrl) => ({
  requesterName: 'Alex Rivera',
  requesterEmail: 'alex@networkdistribution.com',
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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  const email = session?.user?.email?.toLowerCase() || '';
  if (!email.endsWith('@packagingschool.com')) {
    return res.status(401).json({ message: 'Packaging School login required.' });
  }

  const template = req.query.template || 'request';
  try {
    const { subject, html } = renderLibraryEnrollmentEmail(
      template,
      SAMPLE(getAppBaseUrl(req)),
    );
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html.replace(
      '<body',
      `<body data-subject="${subject.replace(/"/g, '')}"`,
    ));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
