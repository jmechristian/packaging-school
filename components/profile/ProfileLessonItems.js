import React from 'react';
import { MdPlayCircle } from 'react-icons/md';
import AuthorName from '../../components/shared/AuthorName';
import { MdOutlineTimer } from 'react-icons/md';
import { useRouter } from 'next/router';
const ProfileLessonItems = ({ lesson }) => {
  const router = useRouter();
  return (
    <div>
      <div className='border flex flex-col rounded-lg space-y-2 hover:shadow-md transition-shadow bg-gray-100 p-2.5'>
        <div
          className='w-full aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center bg-cover bg-center relative'
          style={{
            backgroundImage: `url(${lesson.seoImage})`,
          }}
        >
          <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center'></div>
          <button
            onClick={() => {
              router.push(`/lessons/${lesson.slug}`);
            }}
            className='text-white hover:text-clemson transition-all duration-300 text-sm font-bold relative z-10 cursor-pointer'
          >
            <MdPlayCircle size={55} />
          </button>
        </div>
        <div className='flex flex-col gap-1 h-16'>
          <div className='flex w-full'>
            <div className='font-medium text-gray-900 tracking-tight leading-tight line-clamp-2'>
              {lesson.title}
            </div>
          </div>
          {lesson.author && (
            <div className='flex flex-wrap w-full gap-0.5 '>
              {lesson.author.map((a, i) => (
                <div key={a} className='w-fit flex items-center gap-0'>
                  <AuthorName id={a} />
                  {i < lesson.author.length - 1 && (
                    <span className='text-gray-500 text-xs'>, </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='w-full h-px bg-gray-300'></div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='text-gray-500 text-xs'>
              {new Date(lesson.createdAt).toLocaleDateString('en-US')}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {lesson.analysis && (
              <div className='flex items-center gap-1'>
                <div className='text-gray-500 text-xs'>
                  <MdOutlineTimer size={16} />
                </div>
                <div className='text-gray-500 text-xs'>
                  {lesson.analysis.readingTime} minutes
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLessonItems;
