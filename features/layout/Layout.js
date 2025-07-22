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

  const isAuthenticated = !!user;

  // Minimum loader display time logic
  useEffect(() => {
    if (isAuthenticated && (!userSetupComplete || !awsUser || !thinkificUser)) {
      setMinLoaderDone(false);
      const timer = setTimeout(() => setMinLoaderDone(true), 400); // 400ms minimum
      return () => clearTimeout(timer);
    } else {
      setMinLoaderDone(true);
    }
  }, [isAuthenticated, userSetupComplete, awsUser, thinkificUser]);

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

  // Derived state: all user data is ready
  const userDataReady =
    !userIsLoading && user && userSetupComplete && awsUser && thinkificUser;

  // Only show loader for authenticated users while their data is loading, or if post-SSO loader is active
  if (
    (isAuthenticated &&
      (!userSetupComplete || !awsUser || !thinkificUser) &&
      !minLoaderDone) ||
    showPostSSOLoader
  ) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black fade-in'>
        <img src='/logo.png' alt='Logo' className='w-32 mb-6' />
        <div className='spinner mb-4' />
        <p className='text-lg font-semibold'>
          {showPostSSOLoader
            ? 'Finishing up your login…'
            : 'Loading your account…'}
        </p>
      </div>
    );
  }

  return (
    <>
      <CookieConsent />
      <div className={`${darkMode ? 'dark' : ''} relative`}>
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
