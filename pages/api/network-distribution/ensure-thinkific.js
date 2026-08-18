import { getSession } from '@auth0/nextjs-auth0';
import { ensureNetworkDistributionThinkific } from '../../../helpers/thinkificLibrary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  try {
    const name =
      req.body?.name ||
      session.user.name ||
      [session.user.given_name, session.user.family_name]
        .filter(Boolean)
        .join(' ');

    const result = await ensureNetworkDistributionThinkific({
      email: session.user.email,
      firstName: req.body?.firstName || session.user.given_name,
      lastName: req.body?.lastName || session.user.family_name,
      name,
    });

    return res.status(200).json({
      ok: true,
      thinkificUserId: result.user?.id,
      group: result.groupResult,
    });
  } catch (error) {
    console.error('Ensure Thinkific/PDA group failed:', error);
    return res.status(500).json({ message: 'Failed to prepare Thinkific account.' });
  }
}
