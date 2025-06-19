'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
  GiAstronautHelmet,
} from 'react-icons/gi';
import {
  removeStudentFromPath,
  getAWSUser,
  addStudentToPath,
} from '../../helpers/api';
import ProgressDonut from '../shared/ProgressDonut';
import {
  MdOutlineTimer,
  MdOutlineBook,
  MdOutlineElectricBolt,
} from 'react-icons/md';
import PathCourseCard from '../shared/PathCourseCard';
import { useRouter } from 'next/navigation';
import PathLessonCard from './PathLessonCard';
import PathCompleteModal from './PathCompleteModal';
import {
  createCredential,
  updateUserPathProgress,
  getCredential,
} from '../../helpers/api';

const PathWrapperSkeleton = () => {
  return (
    <div className='w-full flex flex-col animate-pulse'>
      <div className='w-full py-12 bg-gray-800 relative overflow-hidden'>
        <div className='flex items-center gap-6 max-w-6xl mx-auto'>
          <div className='aspect-[1/1] w-1/4 rounded-lg bg-gray-700'></div>
          <div className='flex flex-col gap-2 flex-1'>
            <div className='h-8 w-3/4 bg-gray-700 rounded'></div>
            <div className='h-4 w-full bg-gray-700 rounded'></div>
            <div className='h-4 w-2/3 bg-gray-700 rounded'></div>
            <div className='flex items-center gap-4 mt-3'>
              <div className='h-10 w-32 bg-gray-700 rounded-lg'></div>
              <div className='flex gap-3'>
                <div className='h-6 w-24 bg-gray-700 rounded'></div>
                <div className='h-6 w-24 bg-gray-700 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-20'>
        <div className='max-w-5xl mx-auto w-full flex flex-col gap-10'>
          <div className='h-8 w-48 bg-gray-700 rounded'></div>
          <div className='flex flex-col w-full border-l border-gray-600'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-32 bg-gray-700 rounded-lg mb-4'></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PathWrapper = ({ path }) => {
  // console.log('path', path);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentPath, setCurrentPath] = useState(path);
  const [isCredential, setIsCredential] = useState(false);

  useEffect(() => {
    setCurrentPath(path);
    setIsLoading(false);
  }, [path]);

  const { awsUser, enrollments } = useSelector((state) => state.auth);
  const pathProgress = useMemo(() => {
    if (
      !currentPath?.courses?.items?.length &&
      !currentPath?.lessons?.items?.length
    ) {
      return 0;
    }

    const itemProgresses = [
      ...(currentPath.courses.items || []),
      ...(currentPath.lessons.items || []),
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
  }, [
    currentPath?.courses?.items,
    currentPath?.lessons?.items,
    enrollments,
    awsUser,
  ]);

  const currentUser = useMemo(() => {
    return (
      awsUser &&
      currentPath?.userProgress?.items?.find(
        (user) => user.user.id === awsUser.id
      )
    );
  }, [currentPath?.userProgress?.items, awsUser]);

  console.log('currentUser', currentUser);
  // console.log('currentPath', currentPath);

  const [isTracked, setIsTracked] = useState(currentUser);

  useEffect(() => {
    const createNewCredential = async () => {
      const credential = await createCredential(
        currentUser.user.name,
        currentUser.user.email,
        '717916'
      );
      await updateUserPathProgress(currentUser.id, {
        credential: credential.credential.id,
        credentialDate: new Date().toISOString(),
      });
      setIsCredential(credential.credential);
    };

    const getUserCredential = async () => {
      const credential = await getCredential(currentUser.credential);
      setIsCredential(credential.credential);
    };

    if (currentUser && currentUser.credential) {
      // get the credential
      getUserCredential();
    } else if (
      currentUser &&
      (currentUser.credential === null || currentUser.credential === '') &&
      pathProgress === 100
    ) {
      // create a credential
      createNewCredential();
    } else {
      return;
    }
  }, [currentUser, pathProgress]);

  useEffect(() => {
    if (currentUser) {
      setIsTracked(true);
    }

    if (pathProgress === 100) {
      setShowCompleted(true);
    }
  }, [currentUser, pathProgress]);

  const handleLeavePath = async () => {
    if (currentUser) {
      await removeStudentFromPath(currentUser.id);
      const user = await getAWSUser(awsUser.email);
      dispatch({ type: 'auth/setAWSUser', payload: user });
      router.push('/paths');
    } else {
      await addStudentToPath({
        lastAccessedDate: new Date().toISOString(),
        learningPathUserProgressId: currentPath.id,
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

  const renderIcon = (icon) => {
    switch (icon) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={50} className='text-white' />;
      case 'GiForest':
        return <GiForest size={50} className='text-white' />;
      case 'GiPalette':
        return <GiPalette size={50} className='text-white' />;
      case 'GiCarWheel':
        return <GiCarWheel size={50} className='text-white' />;
      case 'GiHoneycomb':
        return <GiHoneycomb size={50} className='text-white' />;
      case 'GiBoxUnpacking':
        return <GiBoxUnpacking size={50} className='text-white' />;
      case 'GiAstronautHelmet':
        return <GiAstronautHelmet size={50} className='text-white' />;
      default:
        return <GiBoxUnpacking size={50} className='text-white' />;
    }
  };

  const lessonsCompleted = useMemo(() => {
    if (!path?.lessons?.items || !awsUser?.id) return [];

    const completedLessons = path.lessons.items.filter((lesson) => {
      const usersCompleted = lesson?.lesson?.usersCompleted?.items || [];
      return usersCompleted.some((user) => user?.userId === awsUser.id);
    });

    return completedLessons;
  }, [path?.lessons?.items, awsUser?.id, path?.id]);

  const totalHours = useMemo(() => {
    return (
      path.courses.items.reduce(
        (acc, course) => acc + (Number(course.course.hours) || 0),
        0
      ) + (path.lessons.items?.length || 0)
    );
  }, [path?.courses?.items, path?.lessons?.items]);

  if (isLoading) {
    return <PathWrapperSkeleton />;
  }

  return (
    <div className='w-full flex flex-col relative'>
      {showCompleted && (
        <PathCompleteModal
          path={path}
          onClose={() => setShowCompleted(false)}
          credential={isCredential}
        />
      )}
      <div className='w-full py-12 bg-gray-800 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-5'>
          <div className='grid grid-cols-12 gap-4 w-full h-full'>
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className='flex items-center justify-center'>
                {renderIcon(path.icon)}
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-6 max-w-5xl mx-auto relative z-10'>
          <div className='aspect-[1/1] w-1/4 rounded-lg flex justify-center items-center'>
            <ProgressDonut
              progress={pathProgress}
              size={56}
              color={path.color || '#eee'}
              textColor={path.textColor || '#ff9321'}
              strokeColor={path.strokeColor || '#ff9321'}
              textSize={8}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-white text-4xl lg:text-5xl font-oswald font-medium'>
              {path.title}
            </div>
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
                  {totalHours} Hours
                </div>
                <div className='text-gray-400 flex items-center gap-1'>
                  <div className='text-gray-400'>
                    <MdOutlineBook size={20} />
                  </div>
                  {path.courses.items && path.courses.items.length > 0
                    ? path.courses.items.length
                    : 0}{' '}
                  Courses
                </div>
                {path.lessons.items && path.lessons.items.length > 0 && (
                  <div className='text-gray-400 flex items-center gap-1'>
                    <div className='text-gray-400'>
                      <MdOutlineElectricBolt size={20} />
                    </div>
                    {path.lessons.items && path.lessons.items.length > 0
                      ? path.lessons.items.length
                      : 0}{' '}
                    Lessons
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-12'>
        <div className='max-w-5xl mx-auto w-full flex flex-col gap-5'>
          <div className='flex items-center justify-end w-full'>
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2'>
                <div className='text-slate-400'>
                  <MdOutlineTimer size={20} />
                </div>
                <div>
                  {((pathProgress / 100) * totalHours)
                    .toFixed(1)
                    .replace(/\.?0+$/, '')}
                  h / {totalHours}h
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='text-slate-400'>
                  <MdOutlineBook size={20} />
                </div>
                <div>0 / {path.courses.items.length}</div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='text-slate-400'>
                  <MdOutlineElectricBolt size={20} />
                </div>
                <div>
                  {lessonsCompleted.length} / {path.lessons.items.length}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full border-l border-gray-600'>
            {[...(path.courses.items || []), ...(path.lessons.items || [])]
              .sort((a, b) => a.order - b.order)
              .map((item) => {
                if ('thinkificId' in item) {
                  // This is a course
                  return (
                    <PathCourseCard
                      enrollments={enrollments}
                      key={item.id}
                      course={item}
                      enrollment={enrollments.find(
                        (e) => Number(e.course_id) === Number(item.thinkificId)
                      )}
                    />
                  );
                } else {
                  // This is a lesson
                  return <PathLessonCard key={item.id} lesson={item} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathWrapper;
