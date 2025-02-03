import React, { useEffect, useState } from 'react';
import Footer from '../navigation/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, setUser } from '../auth/authslice';

import CartToggle from './CartToggle';
import ScrollTop from './ScrollTop';
import { useUser } from '@auth0/nextjs-auth0/client';

import HeaderNew from '../navigation/Header/HeaderNew';

import Loading from '../../components/shared/Loading';

import CookieConsent from '../../components/shared/CookieConsent';
import IndiaBanner from '../../components/shared/IndiaBanner';

import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { darkMode, signInModal } = useSelector((state) => state.layout);
  const { searchOpen } = useSelector((state) => state.nav);
  const { location, cart } = useSelector((state) => state.auth);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // const getAndSetUser = async () => {
      //   const currentUser = await API.graphql({
      //     query: usersByEmail,
      //     variables: { email: user.email },
      //   });

      //   if (currentUser.data.usersByEmail.items[0]) {
      //     dispatch(setUser(currentUser.data.usersByEmail.items[0]));
      //   } else {
      //     const createNewUser = await API.graphql({
      //       query: createUser,
      //       variables: {
      //         input: {
      //           name: user.name,
      //           email: user.email,
      //           picture: user.picture,
      //           source: 'website',
      //         },
      //       },
      //     });
      //     dispatch(setUser(createNewUser.data.createUser));
      //   }
      // };
      // getAndSetUser();
      dispatch(setUser(user));
    }

    // const sub = API.graphql(graphqlOperation(onUpdateUser)).subscribe({
    //   next: ({ value }) => {
    //     if (user && value.data.onUpdateUser.email === user.email)
    //       dispatch(setUser(value.data.onUpdateUser));
    //   },
    // });

    // return () => {
    //   sub.unsubscribe();
    // };
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
