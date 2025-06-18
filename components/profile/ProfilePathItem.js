import React, { useMemo } from 'react';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
  GiAstronautHelmet,
} from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProfilePathItem = ({ path }) => {
  console.log('path', path);
  const router = useRouter();
  const { awsUser, enrollments } = useSelector((state) => state.auth);

  const pathProgress = useMemo(() => {
    if (
      !path.learningPath.courses.items?.length &&
      !path.learningPath.lessons.items?.length
    ) {
      return 0;
    }

    const itemProgresses = [
      ...(path.learningPath.courses.items || []),
      ...(path.learningPath.lessons.items || []),
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
          (user) => user.user?.id === awsUser?.id
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
  }, [
    path.learningPath.courses.items,
    path.learningPath.lessons.items,
    enrollments,
    awsUser,
  ]);

  const renderIcon = (icon) => {
    // If icon is already a React component, return it
    if (React.isValidElement(icon)) {
      return icon;
    }

    // If icon is a string, handle it as before
    const iconName = icon?.startsWith('Gi') ? icon : `Gi${icon}`;
    switch (iconName) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={36} />;
      case 'GiForest':
        return <GiForest size={36} />;
      case 'GiPalette':
        return <GiPalette size={36} />;
      case 'GiCarWheel':
        return <GiCarWheel size={36} />;
      case 'GiHoneycomb':
        return <GiHoneycomb size={36} />;
      case 'GiBoxUnpacking':
        return <GiBoxUnpacking size={36} />;
      case 'GiAstronautHelmet':
        return <GiAstronautHelmet size={36} />;
      default:
        return null;
    }
  };
  return (
    <div
      key={path.learningPath.id}
      className='col-span-1 bg-gray-100 py-4 rounded-lg w-full flex flex-col gap-2.5'
    >
      <div className='flex justify-between w-full px-3'>
        <div className='flex gap-3'>
          <div>
            <div className='w-12 h-16 bg-clemson text-white flex items-center justify-center rounded-lg'>
              {renderIcon(path.learningPath.icon)}
            </div>
          </div>
          <div className='flex flex-col gap-0.5 w-full'>
            <div className='text-lg font-oswald'>{path.learningPath.title}</div>
            <div className='w-full'>
              <div className='text-sm font-medium text-slate-500 line-clamp-2'>
                {path.learningPath.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between gap-2 border-y border-slate-300 py-2.5 bg-slate-400 px-4'>
        <div className='w-[84%] h-1 bg-white rounded-lg'>
          <div
            className='h-1 bg-yellow-600 rounded-lg'
            style={{ width: `${pathProgress}%` }}
          ></div>
        </div>
        <div className='text-sm font-medium text-white'>{pathProgress}%</div>
      </div>
      <div
        className='w-full flex justify-between items-center cursor-pointer px-4'
        onClick={() => {
          router.push(`/paths/${path.learningPath.slug}`);
        }}
      >
        <div className={`font-medium text-sm text-slate-500`}>
          {((pathProgress / 100) * path.learningPath.hours)
            .toFixed(2)
            .replace(/\.?0+$/, '')}
          h / {path.learningPath.hours}h
        </div>
        <div className='text-sm font-medium text-slate-900'>
          Continue Path &rarr;
        </div>
      </div>
    </div>
  );
};

export default ProfilePathItem;
