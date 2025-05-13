import React from 'react';
import { useRouter } from 'next/router';
import { MdPlayCircle, MdStarBorder } from 'react-icons/md';
import { reEnroll } from '../../helpers/api';
const CourseItem = ({ course, enrollment, active }) => {
  console.log(course);
  const router = useRouter();
  return (
    course && (
      <div
        key={course.id}
        className={`border flex flex-col rounded-lg space-y-3 hover:shadow-md transition-shadow bg-gray-100 p-2.5`}
      >
        <div
          className='w-full aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center bg-cover bg-center relative'
          style={{
            backgroundImage: `url(${course.cardImage.url})`,
          }}
        >
          <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center'></div>
          <button
            onClick={() => {
              window.open(
                `https://learn.packagingschool.com/courses/take/${course.slug}`,
                '_blank'
              );
            }}
            className='text-white hover:text-clemson transition-all duration-300 text-sm font-bold relative z-10 cursor-pointer'
          >
            <MdPlayCircle size={55} />
          </button>
        </div>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-gray-900 tracking-tight leading-tight'>
              {course.title}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 h-full justify-end'>
          {/* <div className='text-xs text-gray-100'>
            Enrolled:{' '}
            {new Date(enrollment.created_at).toISOString().split('T')[0]}
          </div> */}

          <div className='flex items-center gap-0'>
            <div className='w-full'>
              <div className='w-full h-1 bg-slate-300'>
                <div
                  className='h-1 bg-indigo-500'
                  style={{
                    width: `${enrollment.percentage_completed * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-xs font-bold text-gray-500'>
              {Math.round((enrollment.percentage_completed || 0) * 100)}%
              Complete
            </div>
            <div className='flex justify-end gap-1.5 cursor-pointer'>
              <div className='text-xs text-slate-500 flex items-center '>
                <MdStarBorder className='text-yellow-800' size={16} />
                <MdStarBorder className='text-yellow-800' size={16} />
                <MdStarBorder className='text-yellow-800' size={16} />
                <MdStarBorder className='text-yellow-800' size={16} />
                <MdStarBorder className='text-yellow-800' size={16} />
              </div>
              <div className='text-xs text-slate-600'>Leave a Rating</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CourseItem;
