import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileDashboard from '../../components/profile/ProfileDashboard';
import { updateAWSUser } from '../../helpers/api';
import { OnboardingModal } from '../../components/profile/OnboardingModal';
import { TourModal } from '../../components/profile/TourModal';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useAuth } from '../../hooks/useAuth';

export default withPageAuthRequired(function Page() {
  const dispatch = useDispatch();
  const { awsUser, thinkificUser } = useSelector((state) => state.auth);
  const { isReady, needsOnboarding } = useAuth();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const { navigateToThinkific } = useThinkificLink();

  // Show onboarding modal when ready and needed
  useEffect(() => {
    if (isReady && needsOnboarding) {
      setShowOnboardingModal(true);
    }
  }, [isReady, needsOnboarding]);

  // Show tour modal when user hasn't completed tour
  useEffect(() => {
    if (awsUser && !awsUser.tourCompleted && !showOnboardingModal) {
      setShowTourModal(true);
    }
  }, [awsUser, showOnboardingModal]);

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

  // Update login streak on mount
  useEffect(() => {
    if (isReady) {
      updateLoginStreak();
    }
  }, [isReady]);

  const closeTourModal = async () => {
    setShowTourModal(false);
    if (awsUser) {
      try {
        await updateAWSUser({
          id: awsUser.id,
          tourCompleted: true,
        });
        // Refresh user data through the auth service
        window.location.reload();
      } catch (error) {
        console.error('Error updating tour completion:', error);
      }
    }
  };

  // Show loading until user data is ready
  if (!isReady) {
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
      <ProfileDashboard navigateToThinkific={navigateToThinkific} />
      {showOnboardingModal && (
        <OnboardingModal onClose={() => setShowOnboardingModal(false)} />
      )}
      {showTourModal && !showOnboardingModal && (
        <TourModal onClose={() => closeTourModal()} />
      )}
    </>
  );
});
