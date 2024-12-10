import React, { useState, useEffect } from 'react';
import VideoPlayer from '../../../components/VideoPlayer';
import ChapterDropdown from '../../../components/shared/ChapterDropdown';

const Page = () => {
  const [lessonData, setLessonData] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openChapters, setOpenChapters] = useState({});
  const [chapterContents, setChapterContents] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/get-lesson-data')
      .then((res) => res.json())
      .then((data) => {
        setLessonData(data.course);
        setChapters(data.chapters);
        setIsLoading(false);

        const chapterIds = data.chapters.map((chapter) => chapter.id);
        Promise.all(
          chapterIds.map((id) =>
            fetch(`/api/get-chapter-content/${id}`)
              .then((res) => res.json())
              .then((data) => ({ id, content: data }))
          )
        ).then((contents) => {
          const contentsMap = contents.reduce((acc, { id, content }) => {
            acc[id] = content;
            return acc;
          }, {});
          setChapterContents(contentsMap);
          console.log(contentsMap);
        });
      })
      .catch((error) => {
        console.error('Error fetching lesson data:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleChapter = (id) => {
    setOpenChapters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='flex flex-col gap-6 max-w-7xl mx-auto py-12'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-2 gap-10'>
            <div
              className='aspect-[16/9] w-full h-auto bg-gray-200'
              style={{
                backgroundImage: `url(${lessonData.course_card_image_url})`,
              }}
            >
              {/* <VideoPlayer videoEmbedLink={lessonData.intro_video_youtube} /> */}
            </div>
            <div className='flex flex-col gap-5 border border-gray-500 p-10'>
              <h1 className='text-3xl font-bold'>{lessonData.name}</h1>
              <div className='text-lg'>{lessonData.description}</div>
              <div>
                <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'>
                  Start Course
                </button>
              </div>
            </div>
          </div>
          {chapters.map((chapter) => (
            <ChapterDropdown
              key={chapter.id}
              chapter={chapter}
              isOpen={openChapters[chapter.id]}
              toggleChapter={toggleChapter}
              content={chapterContents[chapter.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
