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

  // Unified user setup: runs after Auth0 user is available and not loading
  useEffect(() => {
    const setupUser = async () => {
      if (!user) return;
      // 1. Set Auth0 user in Redux
      dispatch(setUser(user));

      // 2. Check/create AWS user
      let dbUser = await getAWSUser(user.email);
      if (!dbUser) {
        const newUser = await createAWSUser({
          email: user.email,
          name: user.name,
          lastLogin: new Date().toISOString(),
        });
        const newUserXp = await createNewUserXp(newUser.id, newUser.lastLogin);
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

      // 3. Check/create Thinkific user
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
        dispatch(setThinkificUser(null));
        router.push('/profile');
      }
    };
    if (!userIsLoading && user) {
      setupUser();
    }
  }, [user, userIsLoading, dispatch, router]);

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
