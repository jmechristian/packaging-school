import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createSpsInterest } from '../../../helpers/spsInterest';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 180).toLowerCase();
  const company = clean(req.body?.company, 160);
  const interest = clean(req.body?.interest, 40) || 'attend';

  if (!name || !email || !email.includes('@')) {
    return res.status(400).json({ message: 'Name and a valid email are required.' });
  }

  if (!['attend', 'sponsor', 'both'].includes(interest)) {
    return res.status(400).json({ message: 'Choose attend, sponsor, or both.' });
  }

  try {
    const item = await createSpsInterest({
      name,
      email,
      company: company || null,
      interest,
    });

    try {
      const interestLabel =
        interest === 'both' ? 'sponsor and attend' : interest;
      await sesClient.send(
        new SendEmailCommand({
          Source: CONTACT_EMAIL,
          ReplyToAddresses: [email],
          Destination: { ToAddresses: [CONTACT_EMAIL] },
          Message: {
            Subject: {
              Charset: 'UTF-8',
              Data: `SPS interest: ${name}`,
            },
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: [
                  'New Southeastern Packaging Summit interest.',
                  '',
                  `Name: ${name}`,
                  `Email: ${email}`,
                  `Company: ${company || '—'}`,
                  `Interest: ${interestLabel}`,
                ].join('\n'),
              },
            },
          },
        }),
      );
    } catch (mailError) {
      console.error('SPS interest email failed:', mailError);
    }

    return res.status(201).json({ id: item?.id });
  } catch (error) {
    console.error('SPS interest save failed:', error);
    return res.status(500).json({
      message: 'Could not save your request. Email info@packagingschool.com.',
    });
  }
}
