import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThinkificUser, setAWSUser } from '../../features/auth/authslice';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import ProfileDashboard from '../../components/profile/ProfileDashboard';
import { getAWSUser, updateAWSUser } from '../../helpers/api';
import { OnboardingModal } from '../../components/profile/OnboardingModal';
import { TourModal } from '../../components/profile/TourModal';

export default withPageAuthRequired(function Page() {
  const dispatch = useDispatch();
  const { user, awsUser, thinkificUser } = useSelector((state) => state.auth);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (awsUser && thinkificUser) {
      setIsLoading(false);
    }

    // Show onboarding modal if onboarding is not complete OR if thinkific user doesn't exist
    const shouldShowOnboarding =
      (awsUser && awsUser.onboardingComplete === false) || !thinkificUser;
    setShowOnboardingModal(shouldShowOnboarding);
  }, [awsUser, thinkificUser]);

  const updateLoginStreak = async () => {
    if (!awsUser) return;

    const now = new Date();
    const lastLogin = new Date(awsUser.lastLogin);

    // Reset time to midnight for accurate day comparison
    now.setHours(0, 0, 0, 0);
    lastLogin.setHours(0, 0, 0, 0);

    const timeDiff = now.getTime() - lastLogin.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    let newStreak = awsUser.dailyStreak || 1;

    // If last login was yesterday, increment streak
    if (daysDiff === 1) {
      newStreak += 1;
    }
    // If last login was more than 1 day ago, reset streak
    else if (daysDiff > 1) {
      newStreak = 1;
    }
    // If last login was today, keep current streak
    else if (daysDiff === 0) {
      return; // No need to update
    }

    try {
      await updateAWSUser({
        id: awsUser.id,
        lastLogin: new Date().toISOString(),
        dailyStreak: newStreak,
      });
    } catch (error) {
      console.error('Error updating login streak:', error);
    }
  };

  useEffect(() => {
    updateLoginStreak();
  }, [awsUser]); // Run once when component mounts

  const refreshUser = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
    <>
      <ProfileDashboard refreshUser={refreshUser} />
      {showOnboardingModal && (
        <OnboardingModal
          show={showOnboardingModal}
          onClose={() => setShowOnboardingModal(false)}
        />
      )}
      {showTourModal && <TourModal onClose={() => setShowTourModal(false)} />}
    </>
  );
});
