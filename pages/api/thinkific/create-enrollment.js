import { createThinkificEnrollment } from '../../../helpers/thinkificLibrary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { user_id, course_id } = req.body || {};
    if (!user_id || !course_id) {
      return res.status(400).json({ message: 'user_id and course_id are required.' });
    }

    const data = await createThinkificEnrollment({
      userId: user_id,
      courseId: course_id,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Create Thinkific enrollment failed:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
