import React from 'react';
import { useRouter } from 'next/router';
import { MdStarBorder } from 'react-icons/md';
const EnrollmentItem = ({ course, enrollment, active }) => {
  const router = useRouter();
  return (
    course && (
      <div
        key={course.id}
        className={`border rounded-lg space-y-2 hover:shadow-md transition-shadow bg-gray-100 ${
          active ? 'ring-4 ring-indigo-500 p-3' : 'opacity-50 p-2'
        }`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <h3 className='text-lg font-semibold text-gray-900'>
              {course.title}
            </h3>
            {active && (
              <div className='text-xs bg-indigo-500 text-white px-2 py-1 rounded-lg'>
                Current Enrollment
              </div>
            )}
          </div>
          <button
            onClick={() => router.push(course.slug)}
            className='text-gray-700 text-sm font-bold'
          >
            Continue &gt;
          </button>
        </div>

        <div className='flex items-end justify-between bg-gray-500 px-3 py-1.5 rounded-lg'>
          <div className='text-xs text-gray-100'>
            Enrolled:{' '}
            {new Date(enrollment.created_at).toISOString().split('T')[0]}
          </div>
          <div className='flex items-center gap-1.5 cursor-pointer'>
            <div className='text-xs text-slate-500 flex items-center '>
              <MdStarBorder className='text-yellow-300' size={16} />
              <MdStarBorder className='text-yellow-300' size={16} />
              <MdStarBorder className='text-yellow-300' size={16} />
              <MdStarBorder className='text-yellow-300' size={16} />
              <MdStarBorder className='text-yellow-300' size={16} />
            </div>
            <div className='text-xs text-slate-100'>Rate Course</div>
          </div>

          <div className='flex items-center gap-0'>
            <div className='w-full px-2'>
              <div className='w-48 h-1 bg-slate-300'>
                <div
                  className='h-1 bg-green-400'
                  style={{
                    width: `${enrollment.percentage_completed * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className='text-xs font-bold text-gray-100'>
              {Math.round((enrollment.percentage_completed || 0) * 100)}%
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EnrollmentItem;
