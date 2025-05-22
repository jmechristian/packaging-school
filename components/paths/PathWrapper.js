'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeStudentFromPath,
  getAWSUser,
  addStudentToPath,
} from '../../helpers/api';
import ProgressDonut from '../shared/ProgressDonut';
import { MdOutlineTimer, MdOutlineBook } from 'react-icons/md';
import PathCourseCard from '../shared/PathCourseCard';
import { useRouter } from 'next/navigation';
const PathWrapper = ({ path }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { awsUser, enrollments } = useSelector((state) => state.auth);
  const pathProgress = useMemo(() => {
    if (!path.courses.items?.length || !enrollments?.length) {
      return 0;
    }

    const courseProgresses = path.courses.items.map((course) => {
      const enrollment = enrollments.find(
        (e) => Number(e.course_id) === Number(course.thinkificId)
      );

      if (!enrollment?.percentage_completed) {
        return 0;
      }

      // Convert decimal to percentage (0.1139... becomes 11.39...)
      const percentage = parseFloat(enrollment.percentage_completed) * 100;
      return isNaN(percentage) ? 0 : percentage;
    });

    const totalProgress = courseProgresses.reduce(
      (sum, progress) => sum + progress,
      0
    );

    // Calculate average percentage across all courses
    const finalProgress =
      Math.round((totalProgress / courseProgresses.length) * 10) / 10;

    return finalProgress;
  }, [path.courses.items, enrollments]);

  const currentUser = useMemo(() => {
    return (
      awsUser &&
      path.userProgress.items.find((user) => user.user.id === awsUser.id)
    );
  }, [path.userProgress.items, awsUser]);

  const [isTracked, setIsTracked] = useState(currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsTracked(true);
    }
  }, [currentUser]);

  const handleLeavePath = async () => {
    if (currentUser) {
      await removeStudentFromPath(currentUser.id);
      const user = await getAWSUser(awsUser.email);
      dispatch({ type: 'auth/setAWSUser', payload: user });
      router.push('/paths');
    } else {
      await addStudentToPath({
        lastAccessedDate: new Date().toISOString(),
        learningPathUserProgressId: path.id,
        progress: pathProgress,
        startDate: new Date().toISOString(),
        status: 'IN_PROGRESS',
        userLearningPathProgressId: awsUser.id,
      });
      setIsTracked(true);
      const user = await getAWSUser(awsUser.email);
      dispatch({ type: 'auth/setAWSUser', payload: user });
    }
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full py-12 bg-gray-800'>
        <div className='flex items-center gap-6 max-w-6xl mx-auto'>
          <div className='aspect-[1/1] w-1/4 rounded-lg flex justify-center items-center'>
            <ProgressDonut
              progress={pathProgress}
              size={60}
              color={path.color || '#eee'}
              textColor={path.textColor || '#ff9321'}
              strokeColor={path.strokeColor || '#ff9321'}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-white h2-base'>{path.title}</h2>
            <p className='text-gray-300 text-lg max-w-4xl'>
              {path.description}
            </p>
            <div className='flex items-center gap-4 mt-3'>
              <button
                onClick={handleLeavePath}
                className='bg-red-500 hover:bg-red-600 font-semibold transition-colors duration-200 rounded-lg px-4 py-2 text-white text-lg w-fit'
              >
                {isTracked ? 'Leave Path' : 'Track Path'}
              </button>
              <div className='flex gap-3'>
                <div className='text-gray-400 flex items-center gap-1'>
                  <div className='text-gray-400'>
                    <MdOutlineTimer size={20} />
                  </div>
                  {path.courses.items.reduce(
                    (acc, course) => acc + (Number(course.course.hours) || 0),
                    0
                  )}{' '}
                  Hours
                </div>
                <div className='text-gray-400'>|</div>
                <div className='text-gray-400 flex items-center gap-1'>
                  <div className='text-gray-400'>
                    <MdOutlineBook size={20} />
                  </div>
                  {path.courses.items && path.courses.items.length > 0
                    ? path.courses.items.length
                    : 0}{' '}
                  Courses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-20'>
        <div className='max-w-5xl mx-auto w-full flex flex-col gap-10'>
          <h3 className='h3-base'>Courses: 0 / {path.courses.items.length}</h3>
          <div className='flex flex-col w-full border-l border-gray-600'>
            {path.courses.items
              .sort((a, b) => a.order - b.order)
              .map((course) => (
                <PathCourseCard
                  key={course.id}
                  course={course}
                  enrollment={enrollments.find(
                    (e) => Number(e.course_id) === Number(course.thinkificId)
                  )}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathWrapper;
