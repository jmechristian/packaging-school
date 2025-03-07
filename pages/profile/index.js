import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileWrapper from '../../components/profile/ProfileWrapper';
import ProfileDashboard from '../../components/profile/ProfileDashboard';
import Head from 'next/head';

export default withPageAuthRequired(function Page() {
  const dispatch = useDispatch();
  const { user, awsUser, thinkificUser } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (awsUser && thinkificUser) {
      setIsLoading(false);
    }
  }, [awsUser, thinkificUser]);

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
      <ProfileDashboard />
    </ProfileWrapper>
  );
});
