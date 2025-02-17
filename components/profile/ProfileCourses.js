import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdStar, MdStarBorder } from 'react-icons/md';

const ProfileCourses = ({ userCourses }) => {
  console.log('userCourses', userCourses);
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/thinkific/get-enrollments?email=marketing@packagingschool.com`
        );
        const data = await response.json();
        setCourses(data.items || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, [user]);

  const getCompletionPercentage = (courseId) => {
    if (!courses || !Array.isArray(courses)) return 0;
    const matchingCourse = courses.find(
      (c) => c.course_id === parseInt(courseId)
    );
    return (matchingCourse?.percentage_completed || 0) * 100;
  };

  return (
    userCourses && (
      <div className='grid grid-cols-4 gap-6'>
        {userCourses.map((course) => (
          <div
            key={course.id}
            className='bg-white border border-slate-300 rounded w-full h-[300px] pb-3'
          >
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col gap-3'>
                <div
                  className='w-full aspect-[16/9] bg-cover bg-center'
                  style={{ backgroundImage: `url(${course.cardImage.url})` }}
                ></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-sm font-bold px-2 leading-tight'>
                    {course.name}
                  </div>
                  <div className='text-xs text-slate-500 px-2'>
                    {course.instructor.fullName}
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='w-full px-2'>
                  <div className='w-full h-1 bg-slate-300'>
                    <div
                      className='h-1 bg-green-500'
                      style={{
                        width: `${getCompletionPercentage(course.id)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className='w-full flex items-center justify-between px-2'>
                  <div className='text-xs text-slate-500'>
                    {(() => {
                      const matchingCourse = courses.find(
                        (c) => c.course_id === parseInt(course.id)
                      );
                      console.log('Course ID from userCourses:', course.id);
                      console.log(
                        'Available course_ids:',
                        courses.map((c) => c.course_id)
                      );
                      return Math.round(
                        (matchingCourse?.percentage_completed || 0) * 100
                      );
                    })()}
                    % Complete
                  </div>
                  <div className='flex flex-col items-center gap-0.5 cursor-pointer'>
                    <div className='text-xs text-slate-500 flex items-center '>
                      <MdStarBorder className='text-yellow-500' size={16} />
                      <MdStarBorder className='text-yellow-500' size={16} />
                      <MdStarBorder className='text-yellow-500' size={16} />
                      <MdStarBorder className='text-yellow-500' size={16} />
                      <MdStarBorder className='text-yellow-500' size={16} />
                    </div>
                    <div className='text-xs text-slate-500'>Rate Course</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default ProfileCourses;
