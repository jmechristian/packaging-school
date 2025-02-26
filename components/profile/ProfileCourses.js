import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdStar, MdStarBorder, MdSearch } from 'react-icons/md';
import { useRouter } from 'next/router';
const ProfileCourses = ({ userCourses }) => {
  console.log('userCourses', userCourses);
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const router = useRouter();
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
            className='bg-white border border-slate-300 rounded w-full h-[250px] pb-1.5'
          >
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col gap-3'>
                <div
                  className='w-full aspect-[16/9] bg-cover bg-center'
                  style={{ backgroundImage: `url(${course.cardImage.url})` }}
                ></div>
                <div className='flex flex-col gap-1'>
                  <div className='text-xs font-bold px-2 leading-tight'>
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
        <div
          className='group w-full h-full border-dashed border-gray-300 rounded-lg border-2 flex flex-col gap-3 items-center justify-center hover:bg-gray-200 cursor-pointer transition-all duration-300'
          onClick={() => router.push('/all_courses')}
        >
          <div className='w-16 h-16 rounded-full flex items-center justify-center bg-gray-300 group-hover:bg-gray-400 transition-all duration-300'>
            <MdSearch
              size={38}
              className='text-gray-500 group-hover:text-gray-100 transition-all duration-100 group-hover:animate-rotate'
            />
          </div>
          <div className='text-sm text-gray-500 font-bold'>
            Find Your Next Course
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileCourses;
