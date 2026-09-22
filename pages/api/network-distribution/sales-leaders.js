import { getSession } from '@auth0/nextjs-auth0';
import { listActiveSalesLeaders } from '../../../helpers/networkDistributionLeaders';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  if (!session?.user?.email) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  try {
    const leaders = await listActiveSalesLeaders();
    return res.status(200).json({
      items: leaders.map((leader) => ({
        email: leader.email,
        name: leader.name || null,
      })),
    });
  } catch (error) {
    console.error('List ND sales leaders failed:', error);
    return res.status(500).json({ message: 'Failed to load sales leaders.' });
  }
}
