import React, { useEffect, useState } from 'react';
import Footer from '../navigation/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocation,
  setUser,
  setAWSUser,
  setThinkificUser,
  updateUser,
} from '../auth/authslice';
import { getAWSUser, createAWSUser, updateAWSUser } from '../../helpers/api';
import Toast from '../../components/shared/Toast';
import CartToggle from './CartToggle';
import ScrollTop from './ScrollTop';
import { useUser } from '@auth0/nextjs-auth0/client';
import HeaderNew from '../navigation/Header/HeaderNew';
import Loading from '../../components/shared/Loading';
import CookieConsent from '../../components/shared/CookieConsent';
import IndiaBanner from '../../components/shared/IndiaBanner';

const Layout = ({ children }) => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { darkMode, signInModal } = useSelector((state) => state.layout);
  const { showToast } = useSelector((state) => state.nav);
  const { location, cart, awsUser } = useSelector((state) => state.auth);
  const { user, isLoading: userIsLoading } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      if (!user?.email) return;

      const dbUser = await getAWSUser(user.email);
      if (!dbUser) {
        const newUser = await createAWSUser({
          email: user.email,
          name: user.name,
          lastLogin: new Date().toISOString(),
          totalXp: 0,
          level: 1,
          xpToNextLevel: 100,
          psXp: 0,
          thinkificXp: 0,
        });
        dispatch(setAWSUser(newUser));
      } else {
        dispatch(setAWSUser(dbUser));
        await updateAWSUser({
          id: dbUser.id,
          lastLogin: new Date().toISOString(),
        });
      }
    };

    // if (!userIsLoading && user) {
    //   // console.log('🔍 Current user state:', user);
    //   const hasCompletedSSO = sessionStorage.getItem('ssoComplete');

    //   if (user.ssoRedirectUrl && !hasCompletedSSO) {
    //     sessionStorage.setItem('ssoComplete', 'true');
    //     setTimeout(() => {
    //       window.location.href = user.ssoRedirectUrl;
    //     }, 100);
    //     return;
    //   }

    user && dispatch(setUser(user));
    user && checkUser();
    // TODO: Check for user in database, if not there, create user
  }, [user]);

  // // Clear SSO state when component unmounts
  // useEffect(() => {
  //   return () => {
  //     sessionStorage.removeItem('ssoComplete');
  //   };
  // }, []);

  useEffect(() => {
    const checkThinkificUser = async () => {
      const thinkificUser = await fetch(
        `/api/thinkific/get-user?email=${user.email}`
      );

      const data = await thinkificUser.json();
      if (data?.data?.data?.userByEmail) {
        dispatch(setThinkificUser(data.data.data.userByEmail));
      } else {
        dispatch(setThinkificUser(null));
      }
    };

    user && checkThinkificUser();
  }, [user]);

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

  // useEffect(() => {
  //   let subscription;

  //   if (awsUser?.id) {
  //     // Subscribe to user updates
  //     subscription = API.graphql(
  //       graphqlOperation(onUpdateUser, { id: awsUser.id })
  //     ).subscribe({
  //       next: ({ value }) => {
  //         const updatedUser = value.data.onUpdateUser;
  //         // Update Redux store with new user data
  //         dispatch(updateUser(updatedUser));
  //       },
  //       error: (error) => console.error('Subscription error:', error),
  //     });
  //   }

  //   // Cleanup subscription on unmount
  //   return () => {
  //     if (subscription) subscription.unsubscribe();
  //   };
  // }, [awsUser?.id, dispatch]);

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
          <Toast show={showToast} />
        </div>
      </div>
    </>
  );
};

export default Layout;
