import { useState, useEffect, useMemo } from 'react';
import { getCourse } from '../../helpers/api';
import {
  MdOutlineTimer,
  MdOutlineBook,
  MdOutlineBolt,
  MdCheck,
} from 'react-icons/md';
import ProgressDonut from './ProgressDonut';
const PathCourseCard = ({ course, enrollment, enrollments }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourse(course.courseId).then((data) => {
      setCourseData(data);
    });
  }, [course.courseId]);

  const isEnrolled = useMemo(() => {
    return enrollments.find(
      (e) => Number(e.course_id) === Number(course.thinkificId)
    );
  }, [enrollments, course.thinkificId]);

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
          <div
            className='w-full aspect-[16/9] bg-gray-600 bg-cover bg-center relative'
            style={{
              backgroundImage: `url(${courseData?.seoImage})`,
              backgroundSize: 'cover',
            }}
          >
            <div className='absolute inset-0 bg-black/50'></div>
            <div className='absolute top-3 left-3 z-10 flex items-center gap-1'>
              <div className=' flex items-center gap-1 justify-center bg-base-brand text-white px-2 py-1.5 rounded-md text-sm font-semibold '>
                <div className='text-white'>
                  <MdOutlineBook size={16} />
                </div>
                <div className='text-white uppercase font-medium font-oswald text-xs'>
                  Full Course
                </div>
              </div>
              {isEnrolled && (
                <div className=' flex items-center gap-1 justify-center bg-green-600 text-white px-2 py-1.5 rounded-md text-sm font-semibold '>
                  <div className='text-white'>
                    <MdCheck size={16} />
                  </div>
                  <div className='text-white uppercase font-medium font-oswald text-xs'>
                    Enrolled
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-7 w-full p-6 flex flex-col gap-3 justify-center'>
          <div className='text-lg font-semibold'>{courseData?.title}</div>
          <p className=' text-gray-500 line-clamp-3 w-full leading-snug text-sm'>
            {courseData?.subheadline}
          </p>
          <div className='flex items-center gap-4'>
            <button className='bg-base-brand hover:bg-base-dark text-white px-4 py-2 rounded-md text-sm font-semibold w-48'>
              {isEnrolled ? 'Continue Course' : 'Get Full Access'} &rarr;
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
