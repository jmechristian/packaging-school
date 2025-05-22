import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addStudentToPath, getAWSUser } from '../../helpers/api';
import { setAWSUser } from '../../features/auth/authslice';
import Link from 'next/link';
const ComponentLoginButton = ({ path }) => {
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
      await addStudentToPath(path.id, awsUser.id);
      const res = await getAWSUser(awsUser.email);
      dispatch(setAWSUser(res));
      router.push(`/paths/${path.slug}`);
      setIsLoading(false);
    } else {
      router.push(`/api/auth/login?returnTo=${currentPath}`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        onClick={handleUserLogin}
        className={`w-48 ${
          isUserInPath
            ? 'bg-clemson text-white hover:bg-clemson-dark'
            : 'bg-base-brand text-white hover:bg-gray-300'
        } px-4 py-2 font-semibold text-lg rounded-md transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading
          ? 'Starting...'
          : isUserInPath
          ? 'Continue Path'
          : awsUser && !isUserInPath
          ? 'Start Path'
          : 'Login to Start'}
      </button>
      {!awsUser && (
        <p className='text-xs text-gray-500 mt-2.5 text-center'>
          No account?{' '}
          <Link href={`/api/auth/login?returnTo=${currentPath}`}>
            Create one here
          </Link>
        </p>
      )}
    </div>
  );
};

export default ComponentLoginButton;
