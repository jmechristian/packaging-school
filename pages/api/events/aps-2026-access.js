import { isApprovedAps2026Registrant } from '../../../helpers/aps2026Registrants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const email = String(req.body?.email || '').trim();
  const firstName = String(req.body?.firstName || '').trim();
  const lastName = String(req.body?.lastName || '').trim();

  if (!email.includes('@') || !firstName || !lastName) {
    return res.status(400).json({
      message: 'Enter your email, first name, and last name.',
    });
  }

  try {
    const matched = await isApprovedAps2026Registrant({
      email,
      firstName,
      lastName,
    });
    if (!matched) {
      return res.status(403).json({
        message: "That name and email aren't on the 2026 registration list.",
      });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('APS 2026 registration check failed', error);
    return res.status(500).json({
      message: "We couldn't check the registration list. Try again.",
    });
  }
}
