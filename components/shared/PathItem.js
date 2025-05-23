import { useEffect, useState, useMemo } from 'react';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
} from 'react-icons/gi';
import { useRouter } from 'next/router';
import ProgressDonut from './ProgressDonut';
import {
  MdOutlineTimer,
  MdOutlineBook,
  MdOutlineElectricBolt,
} from 'react-icons/md';
import {
  getAllPathCourses,
  updateStudentPathProgress,
} from '../../helpers/api';
import { useSelector } from 'react-redux';
import ComponentLoginButton from './ComponentLoginButton';
const PathItem = ({ path }) => {
  const { enrollments, awsUser } = useSelector((state) => state.auth);

  const pathProgress = useMemo(() => {
    if (!path.courses.items?.length && !path.lessons.items?.length) {
      return 0;
    }

    const itemProgresses = [
      ...(path.courses.items || []),
      ...(path.lessons.items || []),
    ].map((item) => {
      if ('thinkificId' in item) {
        // This is a course
        const enrollment = enrollments.find(
          (e) => Number(e.course_id) === Number(item.thinkificId)
        );

        if (!enrollment?.percentage_completed) {
          return 0;
        }

        // Convert decimal to percentage (0.1139... becomes 11.39...)
        const percentage = parseFloat(enrollment.percentage_completed) * 100;
        return isNaN(percentage) ? 0 : percentage;
      } else {
        // This is a lesson
        const isCompleted = item.lesson?.usersCompleted?.items?.some(
          (user) => user.userId === awsUser?.id
        );
        return isCompleted ? 100 : 0;
      }
    });

    const totalProgress = itemProgresses.reduce(
      (sum, progress) => sum + progress,
      0
    );

    // Calculate average percentage across all items
    const finalProgress =
      Math.round((totalProgress / itemProgresses.length) * 10) / 10;

    return finalProgress;
  }, [path.courses.items, path.lessons.items, enrollments, awsUser]);

  const isUserInPath = useMemo(() => {
    return (
      awsUser &&
      awsUser.learningPathProgress.items.some(
        (item) => item.learningPath.id === path.id
      )
    );
  }, [awsUser, path.id]);

  useEffect(() => {
    const updatePathProgress = async () => {
      await updateStudentPathProgress(
        awsUser.learningPathProgress.items.find(
          (item) => item.learningPath.id === path.id
        ).id,
        {
          progress: pathProgress,
        }
      );
    };
    isUserInPath && updatePathProgress();
  }, [isUserInPath, pathProgress]);

  const renderIcon = (icon) => {
    switch (icon) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={44} />;
      case 'GiForest':
        return <GiForest size={44} />;
      case 'GiPalette':
        return <GiPalette size={44} />;
      case 'GiCarWheel':
        return <GiCarWheel size={44} />;
      case 'GiHoneycomb':
        return <GiHoneycomb size={44} />;
      case 'GiBoxUnpacking':
        return <GiBoxUnpacking size={44} />;
      default:
        return null;
    }
  };

  return (
    <div
      key={path.id}
      className='bg-slate-100 rounded-lg p-4 border flex flex-col gap-8'
    >
      <div className='flex flex-col gap-5 items-center justify-between h-full'>
        <div className='flex w-full justify-between'>
          <div>
            <div className='w-16 h-full bg-clemson text-white flex items-center justify-center rounded-l-lg'>
              {renderIcon(path.icon)}
            </div>
          </div>
          <div className='flex flex-col gap-2 max-w-[76%]'>
            <div className='text-2xl font-oswald'>{path.title}</div>
            <div className='text-sm text-gray-500 leading-tight'>
              {path.description}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col gap-5 py-6 ${
            isUserInPath ? 'bg-slate-300' : 'bg-white'
          } rounded-lg w-full items-center justify-center`}
        >
          <ProgressDonut
            progress={pathProgress}
            size={48}
            textSize={7}
            color={isUserInPath ? path.color || '#fff' : '#eee'}
            textColor={isUserInPath ? path.textColor || '#ff9321' : ' #eee'}
            strokeColor={isUserInPath ? path.strokeColor || '#ff9321' : '#fff'}
          />
          <div className='flex flex-col gap-8 items-center'>
            <ComponentLoginButton
              path={path}
              progress={pathProgress}
              studentId={awsUser?.id || ''}
            />
          </div>
          <div className='flex items-center justify-center w-full gap-1.5'>
            <div className='text-slate-600 text-sm flex items-center gap-0.5'>
              <div className='text-slate-600 text-sm'>
                <MdOutlineTimer size={20} />
              </div>
              {path.courses.items.reduce(
                (acc, course) => acc + (Number(course.course.hours) || 0),
                0
              )}{' '}
              Hours
            </div>
            <div className='text-slate-600 text-sm flex items-center gap-0.5'>
              <div className='text-slate-600 text-sm'>
                <MdOutlineBook size={20} />
              </div>
              {path.courses.items && path.courses.items.length > 0
                ? path.courses.items.length
                : 0}{' '}
              Courses
            </div>
            {path.lessons.items && path.lessons.items.length > 0 && (
              <>
                <div className='text-slate-600 text-sm flex items-center gap-0.5'>
                  <div className='text-slate-600 text-sm'>
                    <MdOutlineElectricBolt size={20} />
                  </div>
                  {path.lessons.items && path.lessons.items.length > 0
                    ? path.lessons.items.length
                    : 0}{' '}
                  Lessons
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathItem;
