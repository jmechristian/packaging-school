import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createEducationPartnerLead } from '../../helpers/educationPartnerLead';

const CONTACT_EMAIL = 'info@packagingschool.com';

const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
  },
});

const clean = (value, max = 200) =>
  String(value || '')
    .trim()
    .slice(0, max);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const email = clean(req.body?.email, 180).toLowerCase();
  const page = clean(req.body?.page, 300);
  const pageTitle = clean(req.body?.pageTitle, 200);

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }

  try {
    const item = await createEducationPartnerLead({
      email,
      page: page || null,
      pageTitle: pageTitle || null,
    });

    const pageLine = [pageTitle, page].filter(Boolean).join(' — ') || '—';

    try {
      await sesClient.send(
        new SendEmailCommand({
          Source: CONTACT_EMAIL,
          ReplyToAddresses: [email],
          Destination: { ToAddresses: [CONTACT_EMAIL] },
          Message: {
            Subject: {
              Charset: 'UTF-8',
              Data: `Education partner inquiry: ${email}`,
            },
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: [
                  'Someone asked to become an education partner.',
                  '',
                  `Email: ${email}`,
                  `Page: ${pageLine}`,
                  '',
                  'They want to highlight a packaging material, process, or technology.',
                ].join('\n'),
              },
            },
          },
        }),
      );
    } catch (mailError) {
      console.error('Education partner email failed:', mailError);
    }

    return res.status(201).json({ id: item?.id });
  } catch (error) {
    console.error('Education partner lead save failed:', error);
    return res.status(500).json({
      message: 'Could not save your email. Email info@packagingschool.com.',
    });
  }
}
