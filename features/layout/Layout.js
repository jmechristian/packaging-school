import React, { useEffect, useState, useRef } from 'react';
import Footer from '../navigation/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocation,
  setUser,
  setAWSUser,
  setThinkificUser,
  updateUser,
  setEnrollments,
  setUserXp,
} from '../auth/authslice';
import {
  getAWSUser,
  createAWSUser,
  updateAWSUser,
  createNewUserXp,
  updateLastLogin,
  getUserLevel,
} from '../../helpers/api';
import Toast from '../../components/shared/Toast';
import CartToggle from './CartToggle';
import ScrollTop from './ScrollTop';
import { useUser } from '@auth0/nextjs-auth0/client';
import HeaderNew from '../navigation/Header/HeaderNew';
import Loading from '../../components/shared/Loading';
import CookieConsent from '../../components/shared/CookieConsent';
import IndiaBanner from '../../components/shared/IndiaBanner';
import { useRouter } from 'next/router';
import ProgressDonut from '../../components/shared/ProgressDonut';
import AnimatedProgressDonut from '../../components/shared/AnimatedProgressDonut';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { darkMode, signInModal } = useSelector((state) => state.layout);
  const { showToast } = useSelector((state) => state.nav);
  const { location, cart, awsUser, thinkificUser } = useSelector(
    (state) => state.auth
  );
  const { user, isLoading: userIsLoading } = useUser();
  const router = useRouter();
  const userProcessedRef = useRef(false);
  const [showPostSSOLoader, setShowPostSSOLoader] = useState(false);
  // console.log('user', user);
  // console.log('awsUser', awsUser);
  // console.log('thinkificUser', thinkificUser);

  // Local state to ensure user setup only runs once per login/SSO
  const [userSetupComplete, setUserSetupComplete] = useState(false);
  // Ref to ensure user setup only runs once per session
  const userSetupStarted = useRef(false);
  // State for minimum loader display time
  const [minLoaderDone, setMinLoaderDone] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);
  // State for loader fade-out
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  // Define isAuthenticated before using it
  const isAuthenticated = !!user;

  // Detect if on /profile page and onboarding is expected
  const isOnProfilePage = router.pathname === '/profile';
  const isOnboarding =
    isAuthenticated && awsUser && isOnProfilePage && !thinkificUser;

  // Determine if the loader should be active
  const shouldShowLoader =
    (isAuthenticated && (!userSetupComplete || !awsUser || !thinkificUser)) ||
    showPostSSOLoader;

  // Refined minimum loader timer logic with fade-out
  useEffect(() => {
    if (shouldShowLoader && !loaderActive) {
      setLoaderActive(true);
      setMinLoaderDone(false);
      setLoaderFadeOut(false);
      const timer = setTimeout(() => setMinLoaderDone(true), 700); // 700ms minimum
      return () => clearTimeout(timer);
    }
    if (!shouldShowLoader && loaderActive) {
      // Trigger fade-out before unmounting loader
      setLoaderFadeOut(true);
      const fadeTimer = setTimeout(() => {
        setLoaderActive(false);
        setMinLoaderDone(false);
        setLoaderFadeOut(false);
      }, 500); // 500ms fade-out duration
      return () => clearTimeout(fadeTimer);
    }
  }, [shouldShowLoader, loaderActive]);

  // Simulate progress for loader
  useEffect(() => {
    let interval;
    if (shouldShowLoader || loaderActive) {
      setSimProgress(0);
      interval = setInterval(() => {
        setSimProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 8 + 2; // random increment for realism
        });
      }, 80);
    } else {
      setSimProgress(0);
    }
    return () => clearInterval(interval);
  }, [shouldShowLoader, loaderActive]);

  // SSO logic: only run for authenticated users, gated by userProcessedRef
  useEffect(() => {
    if (!userIsLoading && user && !userProcessedRef.current) {
      const hasCompletedSSO = sessionStorage.getItem('ssoComplete');
      if (user.ssoRedirectUrl && !hasCompletedSSO) {
        sessionStorage.setItem('ssoComplete', 'true');
        setTimeout(() => {
          window.location.href = user.ssoRedirectUrl;
        }, 100);
        return;
      }
      userProcessedRef.current = true;
      // No user setup here
    }
  }, [user, userIsLoading]);

  useEffect(() => {
    // Only run user setup if Auth0 user is available, not loading, setup not complete, and not already started
    if (
      !userIsLoading &&
      user &&
      !userSetupComplete &&
      !userSetupStarted.current
    ) {
      userSetupStarted.current = true;
      const setupUser = async () => {
        // 1. Set Auth0 user in Redux
        dispatch(setUser(user));
        // 2. Check/create AWS user
        let dbUser = null;
        try {
          dbUser = await getAWSUser(user.email);
          if (!dbUser) {
            const newUser = await createAWSUser({
              email: user.email,
              name: user.name,
              lastLogin: new Date().toISOString(),
            });
            const newUserXp = await createNewUserXp(
              newUser.id,
              newUser.lastLogin
            );
            await updateAWSUser({
              id: newUser.id,
              userUserXpId: newUserXp.id,
            });
            dbUser = newUser;
            dispatch(setAWSUser(newUser));
            dispatch(setUserXp(newUserXp));
          } else {
            dispatch(setAWSUser(dbUser));
            const level = getUserLevel(dbUser.userXp.totalXp, dbUser);
            const updatedUserXp = await updateLastLogin(
              dbUser.userUserXpId,
              parseInt(level.level, 10),
              parseInt(level.xpNeeded, 10),
              parseFloat(level.progress.toFixed(1))
            );
            dispatch(setUserXp(updatedUserXp));
          }
        } catch (err) {
          console.error('AWS user setup error:', err);
        }
        // 3. Check/create Thinkific user
        try {
          const thinkificUserRes = await fetch(
            `/api/thinkific/get-user?email=${user.email}`
          );
          const thinkificData = await thinkificUserRes.json();
          if (thinkificData?.data?.data?.userByEmail) {
            dispatch(setThinkificUser(thinkificData.data.data.userByEmail));
            const enrollments = await fetch(
              `/api/thinkific/get-enrollments?email=${user.email}`
            );
            const enrollmentsData = await enrollments.json();
            dispatch(setEnrollments(enrollmentsData.items));
          } else {
            console.warn('No Thinkific user found for', user.email);
          }
        } catch (err) {
          console.error('Thinkific user setup error:', err);
        }
        setUserSetupComplete(true);
      };
      setupUser();
    }
    // Reset userSetupComplete and userSetupStarted if user logs out
    if (!user && userSetupComplete) {
      setUserSetupComplete(false);
      userSetupStarted.current = false;
    }
  }, [user, userIsLoading, userSetupComplete, dispatch]);

  useEffect(() => {
    fetch('https://ipinfo.io/?token=0133a1a5f7f332')
      .then((response) => response.json())
      .then((data) => {
        const [lat, long] = data.loc.split(',');
        dispatch(
          setLocation({
            ip: data.ip,
            country: data.country,
            lat: lat,
            long: long,
          })
        );
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    // Check for fromSSO param
    if (router.query.fromSSO === '1') {
      setShowPostSSOLoader(true);
      // Remove the param from the URL (optional, for cleanliness)
      const { fromSSO, ...rest } = router.query;
      router.replace(
        {
          pathname: router.pathname,
          query: rest,
        },
        undefined,
        { shallow: true }
      );
      // Hide loader after 1.5 seconds
      setTimeout(() => setShowPostSSOLoader(false), 1500);
    }
  }, [router.query]);

  // Redirect to /profile for onboarding if user is present but missing first/last name
  useEffect(() => {
    if (
      isAuthenticated &&
      awsUser &&
      (!awsUser.name || awsUser.name.trim().split(' ').length < 2) &&
      router.pathname !== '/profile'
    ) {
      router.push('/profile');
      setMinLoaderDone(true);
      setLoaderActive(false);
      setLoaderFadeOut(false);
    }
  }, [isAuthenticated, awsUser, router]);

  // Derived state: all user data is ready
  const userDataReady =
    !userIsLoading && user && userSetupComplete && awsUser && thinkificUser;

  // Only show loader for authenticated users while their data is loading, or if post-SSO loader is active
  // If onboarding is expected (isOnboarding), always render the main UI and bypass the loader
  if (
    !isOnboarding &&
    ((isAuthenticated &&
      (!userSetupComplete || !awsUser || !thinkificUser) &&
      !minLoaderDone) ||
      showPostSSOLoader ||
      loaderActive)
  ) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-dark dark:bg-black ${
          loaderFadeOut ? 'fade-out' : 'fade-in'
        }`}
      >
        <img src='/logos/logo-sq-wh.svg' alt='Logo' className='w-40 mb-6' />
        <div className='grid place-items-center '>
          <div role='status' className='col-start-1 row-start-1'>
            <svg
              aria-hidden='true'
              class='w-32 h-32 text-slate-800 animate-spin  fill-clemson'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span class='sr-only'>Loading...</span>
          </div>
          <div className='text-center text-sm text-slate-500 col-start-1 row-start-1'>
            {simProgress.toFixed(0)}%
          </div>
        </div>
      </div>
    );
  }

  // Main UI with fade-in
  return (
    <>
      <CookieConsent />
      <div className={`${darkMode ? 'dark' : ''} relative fade-in`}>
        <div className='flex flex-col justify-between'>
          {/* {location && location.country === 'India' && <IndiaBanner />} */}
          {/* <Loading /> */}
          <div className='sticky top-0 z-50'>
            <HeaderNew />
          </div>
          {cart.items.length > 0 && <CartToggle items={cart.items} />}
          <ScrollTop />
          <main className='relative'>{children}</main>
          <Footer />
          <Toast show={showToast} />
        </div>
      </div>
    </>
  );
};

export default Layout;
