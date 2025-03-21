import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThinkificUser, setAWSUser } from '../../features/auth/authslice';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileWrapper from '../../components/profile/ProfileWrapper';
import ProfileDashboard from '../../components/profile/ProfileDashboard';
import { getAWSUser } from '../../helpers/api';
export default withPageAuthRequired(function Page() {
  const dispatch = useDispatch();
  const { user, awsUser, thinkificUser } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (awsUser && thinkificUser) {
      setIsLoading(false);
    }
  }, [awsUser, thinkificUser]);

  const refreshUser = async () => {
    const thinkificUser = await fetch(
      `/api/thinkific/get-user?email=${user.email}`
    );

    const data = await thinkificUser.json();
    if (data?.data?.data?.userByEmail) {
      dispatch(setThinkificUser(data.data.data.userByEmail));
    }

    const dbUser = await getAWSUser(user.email);
    if (dbUser) {
      dispatch(setAWSUser(dbUser));
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full min-h-screen bg-gray-100'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-clemson border-t-transparent rounded-full animate-spin'></div>
          <div className='text-gray-600 font-medium'>
            Loading your profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProfileWrapper>
      <ProfileDashboard
        awsUser={awsUser}
        thinkificUser={thinkificUser}
        user={user}
        refreshUser={refreshUser}
      />
    </ProfileWrapper>
  );
});
