import { useState, useEffect } from 'react';
import { getCourse } from '../../helpers/api';
import { MdOutlineTimer, MdOutlineBook } from 'react-icons/md';
import ProgressDonut from './ProgressDonut';
const PathCourseCard = ({ course, enrollment }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourse(course.courseId).then((data) => setCourseData(data));
  }, [course.courseId]);
  return (
    <div className='w-full grid grid-cols-12 mb-3'>
      <div className='hidden lg:flex lg:items-center lg:w-full lg:col-span-1 relative '>
        <div className='w-24 h-24 bg-white rounded-full z-10 absolute top-1/2 -translate-y-1/2 -left-12'>
          <ProgressDonut
            progress={Number(
              (enrollment?.percentage_completed * 100 || 0).toFixed(1)
            )}
            size={24}
            color={courseData?.color || '#eee'}
            textColor={courseData?.textColor || '#ff9321'}
            textSize={8}
          />
        </div>
      </div>
      <div className='grid grid-cols-12 cols-span-12 lg:col-span-11 border border-gray-600'>
        <div className='col-span-12 md:col-span-5 w-full'>
          <div className='w-full aspect-[16/9] bg-gray-600'></div>
        </div>
        <div className='col-span-12 md:col-span-7 w-full p-6 flex flex-col gap-2 justify-center'>
          <h4 className='text-xl font-semibold'>{courseData?.title}</h4>
          <p className=' text-gray-500 line-clamp-3 w-full leading-snug'>
            {courseData?.subheadline}
          </p>
          <div className='flex items-center gap-2'>
            <button className='bg-clemson hover:bg-clemson-dark text-white px-4 py-2 rounded-md text-sm font-semibold'>
              Get Full Access
            </button>
            <button className='bg-base-brand hover:bg-base-dark text-white px-4 py-2 rounded-md text-sm font-semibold'>
              View Course
            </button>
            <div className='flex items-center gap-1 text-sm text-gray-500'>
              <MdOutlineTimer />
              <div className='text-sm text-gray-500'>
                {courseData?.hours} hours
              </div>
            </div>
            <div className='text-sm text-gray-500'>|</div>
            <div className='flex items-center gap-1'>
              <div className='text-sm text-gray-500'>
                <MdOutlineBook />
              </div>
              <div className='text-sm text-gray-500'>
                {courseData?.lessons} lessons
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathCourseCard;
