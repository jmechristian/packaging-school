// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const response = await fetch(
      'https://api.thinkific.com/api/public/v1/courses/23185',
      {
        method: 'GET',
        headers: {
          'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-Auth-Subdomain': 'packagingschool',
          'Content-Type': 'application/json',
        },
      }
    );
    const lessonData = await response.json();

    const chapters = lessonData.chapter_ids;

    // New code to fetch data for each chapter
    const chapterDataArray = await Promise.all(
      chapters.map(async (chapterId) => {
        const chapterResponse = await fetch(
          `https://api.thinkific.com/api/public/v1/chapters/${chapterId}`,
          {
            method: 'GET',
            headers: {
              'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
              'X-Auth-Subdomain': 'packagingschool',
              'Content-Type': 'application/json',
            },
          }
        );
        return chapterResponse.json();
      })
    );

    res.status(200).json({ course: lessonData, chapters: chapterDataArray });
  }

  if (req.method === 'POST') {
    console.log(req.body);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
