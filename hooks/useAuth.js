import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import { authService } from '../helpers/authService';
import {
  setAuthLoading,
  setAuthError,
  setUserSetupComplete,
  setUser,
  setAWSUser,
  setThinkificUser,
  setEnrollments,
  setUserXp,
} from '../features/auth/authslice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading: userIsLoading } = useUser();
  const {
    isAuthenticated,
    isLoading,
    setupComplete,
    error,
    awsUser,
    thinkificUser,
    userXp,
  } = useSelector((state) => state.auth);

  // Setup user data when Auth0 user is available
  const setupUser = useCallback(async () => {
    if (!user || userIsLoading) return;

    try {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));

      console.log('useAuth: Setting up user data');
      
      // Use centralized auth service
      const userData = await authService.setupUser(user);
      
      // Update Redux state
      dispatch(setUser(user));
      dispatch(setAWSUser(userData.awsUser));
      dispatch(setThinkificUser(userData.thinkificUser));
      dispatch(setUserSetupComplete(true));
      
      // Fetch enrollments if Thinkific user exists
      if (userData.thinkificUser) {
        try {
          const enrollmentsResponse = await fetch(
            `/api/thinkific/get-enrollments?email=${user.email}`
          );
          const enrollmentsData = await enrollmentsResponse.json();
          dispatch(setEnrollments(enrollmentsData.items || []));
        } catch (enrollmentError) {
          console.warn('Failed to fetch enrollments:', enrollmentError);
          dispatch(setEnrollments([]));
        }
      }

      console.log('useAuth: User setup complete');
    } catch (error) {
      console.error('useAuth: Setup failed', error);
      dispatch(setAuthError(error.message || 'Failed to setup user'));
    }
  }, [user, userIsLoading, dispatch]);

  // Setup user when Auth0 user changes
  useEffect(() => {
    if (user && !userIsLoading && !setupComplete && !isLoading) {
      setupUser();
    }
  }, [user, userIsLoading, setupComplete, isLoading, setupUser]);

  // Reset auth service on logout
  useEffect(() => {
    if (!user && !userIsLoading && isAuthenticated) {
      authService.reset();
    }
  }, [user, userIsLoading, isAuthenticated]);

  // Check if user data is ready
  const isReady = !userIsLoading && !isLoading && setupComplete && awsUser;

  // Check if onboarding is needed
  const needsOnboarding = awsUser && (!awsUser.name || !awsUser.name.includes(' '));

  return {
    // Auth state
    isAuthenticated,
    isLoading: userIsLoading || isLoading,
    setupComplete,
    error,
    isReady,
    needsOnboarding,
    
    // User data
    user,
    awsUser,
    thinkificUser,
    userXp,
    
    // Actions
    setupUser,
  };
};
