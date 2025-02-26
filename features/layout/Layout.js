import React, { useEffect, useState } from 'react';
import Footer from '../navigation/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, setUser, setAWSUser } from '../auth/authslice';
import { getAWSUser, createAWSUser } from '../../helpers/api';
import CartToggle from './CartToggle';
import ScrollTop from './ScrollTop';
import { useUser } from '@auth0/nextjs-auth0/client';
import HeaderNew from '../navigation/Header/HeaderNew';
import Loading from '../../components/shared/Loading';
import CookieConsent from '../../components/shared/CookieConsent';
import IndiaBanner from '../../components/shared/IndiaBanner';

import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { darkMode, signInModal } = useSelector((state) => state.layout);
  // const { searchOpen } = useSelector((state) => state.nav);
  const { location, cart } = useSelector((state) => state.auth);
  const { user, isLoading: userIsLoading } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      const dbUser = await getAWSUser(user.email);
      if (!dbUser) {
        const newUser = await createAWSUser({
          email: user.email,
          name: user.name,
        });
        dispatch(setAWSUser(newUser));
      } else {
        dispatch(setAWSUser(dbUser));
      }
    };

    if (!userIsLoading && user) {
      // console.log('🔍 Current user state:', user);
      const hasCompletedSSO = sessionStorage.getItem('ssoComplete');

      if (user.ssoRedirectUrl && !hasCompletedSSO) {
        sessionStorage.setItem('ssoComplete', 'true');
        setTimeout(() => {
          window.location.href = user.ssoRedirectUrl;
        }, 100);
        return;
      }

      dispatch(setUser(user));
      checkUser();
      // TODO: Check for user in database, if not there, create user
    }
  }, [user, userIsLoading]);

  // Clear SSO state when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('ssoComplete');
    };
  }, []);

  // useEffect(() => {
  //   if (window.matchMedia) {
  //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //       dispatch(setDark());
  //       document.body.classList.add('dark');
  //     } else {
  //       dispatch(setLight());
  //       document.body.classList.remove('dark');
  //     }

  //     if (!window.matchMedia) {
  //       dispatch(setLight());
  //     }
  //   }
  // }, []);

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

  // Show loading state while we process
  if (
    isLoading ||
    (user?.ssoRedirectUrl && !sessionStorage.getItem('ssoComplete'))
  ) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='spinner' />
          <p className='mt-2'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CookieConsent />
      <div className={`${darkMode ? 'dark' : ''} relative`}>
        <div className='flex flex-col justify-between'>
          {/* {searchOpen && <SearchContainer />} */}
          {/* {signInModal && (
            <SignInModal
              open={signInModal}
              setOpen={() => dispatch(toggleSignInModal())}
            />
          )} */}
          {/* {preview && (
            <CoursePreview close={() => dispatch(setPreviewClosed())} />
          )} */}
          {/* {location && location.country === 'India' && <IndiaBanner />} */}
          <Loading />
          <HeaderNew user={user} />
          {cart.items.length > 0 && <CartToggle items={cart.items} />}
          <ScrollTop />
          <main className='relative h-full w-full'>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
