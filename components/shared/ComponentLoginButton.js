import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addStudentToPath, getAWSUser } from '../../helpers/api';
import { setAWSUser } from '../../features/auth/authslice';
import Link from 'next/link';
const ComponentLoginButton = ({ path, progress, studentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = router.asPath;
  const { awsUser } = useSelector((state) => state.auth);
  const isUserInPath = useMemo(() => {
    return (
      awsUser &&
      awsUser.learningPathProgress.items.some(
        (item) => item.learningPath.id === path.id
      )
    );
  }, [awsUser, path.id]);

  const handleUserLogin = async () => {
    if (isUserInPath) {
      router.push(`/paths/${path.slug}`);
    } else if (awsUser && !isUserInPath) {
      setIsLoading(true);
      await addStudentToPath({
        lastAccessedDate: new Date().toISOString(),
        learningPathUserProgressId: path.id,
        progress: progress,
        startDate: new Date().toISOString(),
        status: 'IN_PROGRESS',
        userLearningPathProgressId: studentId,
      });
      const user = await getAWSUser(awsUser.email);
      dispatch(setAWSUser(user));
      router.push(`/paths/${path.slug}`);
      setIsLoading(false);
    } else {
      router.push(`/login?returnTo=${currentPath}`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleUserLogin}
        className={`w-48 ${
          isUserInPath
            ? 'bg-black text-white hover:bg-gray-500'
            : 'bg-base-brand text-white hover:bg-gray-300'
        } px-4 py-2 font-semibold rounded-md transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading
          ? 'Starting...'
          : isUserInPath
          ? progress === 100
            ? 'View Your Badge'
            : 'Continue Path'
          : awsUser && !isUserInPath
          ? 'Start Path'
          : 'Start For Free'}
      </button>
      {/* {!awsUser && (
        <p className='text-xs text-gray-500 mt-2.5 text-center'>
          No account?{' '}
          <Link href={`/api/auth/login?returnTo=${currentPath}`}>
            Create one here
          </Link>
        </p>
      )} */}
    </div>
  );
};

export default ComponentLoginButton;
