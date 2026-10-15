import { getSession } from '@auth0/nextjs-auth0';
import { isApprovedSalesLeader } from '../../../helpers/networkDistributionLeaders';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession(req, res);
  const email = session?.user?.email?.toLowerCase();
  if (!email) {
    return res.status(200).json({ isSalesLeader: false });
  }

  try {
    const isLeader = await isApprovedSalesLeader(email);
    return res.status(200).json({ isSalesLeader: Boolean(isLeader) });
  } catch (error) {
    console.error('ND is-sales-leader failed:', error);
    return res.status(200).json({ isSalesLeader: false });
  }
}
