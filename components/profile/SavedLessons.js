import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ProfileLessonItem from './ProfileLessonItem';

const SavedLessons = () => {
  const { awsUser } = useSelector((state) => state.auth);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 7;

  // Calculate pagination
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = awsUser.savedLessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );
  const totalPages = Math.ceil(awsUser.savedLessons.length / lessonsPerPage);

  return (
    <div className='flex flex-col gap-4 bg-white rounded-lg p-4 min-h-[320px]'>
      <div className='font-bold text-gray-900 w-full'>Saved Lessons</div>
      {awsUser.savedLessons.length > 0 ? (
        <>
          <div className='flex flex-col gap-0.5 border border-gray-200 rounded-lg h-full'>
            {currentLessons.map((lesson) => (
              <ProfileLessonItem key={lesson} lessonId={lesson} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className='flex justify-center gap-2 text-sm'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50'
              >
                &lt;
              </button>
              <span className='px-3 py-1'>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='px-3 py-1 rounded bg-gray-200 disabled:opacity-50'
              >
                &gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-lg p-6 h-full'>
          <div>No Lessons Saved</div>
          <button
            className='text-sm  bg-gray-900 px-4 py-2 rounded-lg text-white'
            onClick={() => router.push('/lessons')}
          >
            Browse Library
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedLessons;
