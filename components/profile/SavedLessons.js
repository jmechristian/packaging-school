import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ProfileLessonItem from './ProfileLessonItem';
const SavedLessons = () => {
  const { awsUser } = useSelector((state) => state.auth);
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 bg-white rounded-lg p-4 min-h-[250px]'>
      <div className='font-bold text-gray-900 w-full'>Saved Lessons</div>
      {awsUser.savedLessons.length > 0 ? (
        <div className='flex flex-col gap-0.5 border border-gray-200 rounded-lg h-full'>
          {awsUser.savedLessons.map((lesson) => (
            <ProfileLessonItem key={lesson} lessonId={lesson} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-lg p-6'>
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
