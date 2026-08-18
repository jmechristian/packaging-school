import {
  addThinkificUserToGroup,
  getThinkificUserByEmail,
  NETWORK_DISTRIBUTION_GROUP,
} from '../../../helpers/thinkificLibrary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { user_id, email, group_names } = req.body || {};
    let userId = user_id;

    if (!userId && email) {
      const user = await getThinkificUserByEmail(email);
      userId = user?.id;
    }

    if (!userId) {
      return res.status(400).json({ message: 'user_id or email is required.' });
    }

    const result = await addThinkificUserToGroup(
      userId,
      group_names || [NETWORK_DISTRIBUTION_GROUP],
    );

    return res.status(result.ok ? 200 : 502).json(result);
  } catch (error) {
    console.error('Add Thinkific user to group failed:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
