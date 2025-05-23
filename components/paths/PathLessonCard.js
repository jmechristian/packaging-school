import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdCheck } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const PathLessonCard = ({ lesson }) => {
  const router = useRouter();
  const { awsUser } = useSelector((state) => state.auth);
  const isCompleted = useMemo(() => {
    return lesson?.lesson?.usersCompleted?.items?.some(
      (user) => user.userId === awsUser?.id
    );
  }, [lesson?.lesson?.usersCompleted, awsUser]);
  return (
    <div className='w-full grid grid-cols-12 mb-3'>
      <div className='hidden lg:flex lg:items-center lg:w-full lg:col-span-1 relative '>
        <div
          className={`w-[90px] h-[90px] bg-white rounded-full z-10 absolute top-1/2 -translate-y-1/2 -left-12 flex items-center justify-center border-8 border-slate-200 p-0.5 ${
            isCompleted ? 'border-green-500' : 'border-slate-200'
          }`}
        >
          {isCompleted ? (
            <MdCheck size={40} className='text-green-500' />
          ) : (
            <MdCheck size={40} className='text-slate-300' />
          )}
        </div>
      </div>
      <div className='grid grid-cols-12 cols-span-12 lg:col-span-11 border border-gray-600'>
        <div className='col-span-12 md:col-span-5 w-full'>
          <div
            className='w-full aspect-[16/9] bg-gray-600 bg-cover bg-center relative'
            style={{
              backgroundImage: `url(${lesson?.lesson?.seoImage})`,
              backgroundSize: 'cover',
            }}
          >
            <div className='absolute inset-0 bg-black/50'></div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-7 w-full p-6 flex flex-col gap-3 justify-center'>
          <div className='text-lg font-semibold'>{lesson?.lesson?.title}</div>
          <p className=' text-gray-500 line-clamp-3 w-full leading-snug text-sm'>
            {lesson?.lesson?.subhead}
          </p>
          <div className='flex items-center gap-2'>
            <button
              className='bg-base-brand hover:bg-base-dark text-white px-4 py-2 rounded-md text-sm font-semibold'
              onClick={() => {
                router.push(`/lessons/${lesson?.lesson?.slug}`);
              }}
            >
              {isCompleted ? 'Complete Lesson' : 'View Lesson'}
            </button>
            {/* <div className='flex items-center gap-1 text-sm text-gray-500'>
              <MdOutlineTimer />
              <div className='text-sm text-gray-500'>
                {courseData?.hours} hours
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathLessonCard;
