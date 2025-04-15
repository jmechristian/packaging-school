import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import ProgressDonut from './ProgressDonut';
import { MdOutlineTimer, MdOutlineBook } from 'react-icons/md';
import { getAllPathCourses } from '../../helpers/api';
import { useSelector } from 'react-redux';
import ComponentLoginButton from './ComponentLoginButton';
const PathItem = ({ path }) => {
  console.log('path', path);
  const { enrollments, awsUser } = useSelector((state) => state.auth);
  const router = useRouter();

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
      console.log('Course progress:', {
        courseId: course.thinkificId,
        rawValue: enrollment.percentage_completed,
        calculatedPercentage: percentage,
      });
      return isNaN(percentage) ? 0 : percentage;
    });

    const totalProgress = courseProgresses.reduce(
      (sum, progress) => sum + progress,
      0
    );
    console.log('totalProgress', totalProgress);

    // Calculate average percentage across all courses
    const finalProgress =
      Math.round((totalProgress / courseProgresses.length) * 10) / 10;
    console.log('finalProgress', finalProgress);
    return finalProgress;
  }, [path.courses.items, enrollments]);

  const isUserInPath = useMemo(() => {
    return (
      awsUser &&
      awsUser.learningPaths.items.some(
        (item) => item.learningPath.id === path.id
      )
    );
  }, [awsUser, path.id]);

  return (
    <div
      key={path.id}
      className='bg-gray-100 rounded-lg p-8 border flex flex-col gap-5 justify-between items-center'
    >
      <div className='flex flex-col gap-2 items-center justify-between h-full'>
        <h3 className='h4-base text-center'>{path.title}</h3>
        <p className='text-gray-500 text-sm text-center leading-tight tracking-normal'>
          {path.description}
        </p>
        <div className='flex flex-col gap-2 py-2'>
          <ProgressDonut
            progress={pathProgress}
            size={40}
            textSize={7}
            color={isUserInPath ? path.color || '#fff' : '#ebe6e7'}
            textColor={isUserInPath ? path.textColor || '#ff9321' : '#ebe6e7'}
            strokeColor={isUserInPath ? path.strokeColor || '#ff9321' : '#fff'}
          />
        </div>
      </div>
      <div className='flex flex-col gap-8 items-center'>
        <ComponentLoginButton path={path} />
        <div className='flex items-center justify-center w-full gap-3 mt-2'>
          <div className='text-gray-600 text-sm flex items-center gap-1'>
            <div className='text-gray-600 text-sm'>
              <MdOutlineTimer size={20} />
            </div>
            {path.courses.items.reduce(
              (acc, course) => acc + (Number(course.course.hours) || 0),
              0
            )}{' '}
            Hours
          </div>
          <div className='text-gray-600 text-sm'>|</div>
          <div className='text-gray-600 text-sm flex items-center gap-1'>
            <div className='text-gray-600 text-sm'>
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
  );
};

export default PathItem;
