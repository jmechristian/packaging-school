import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../navigation/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllArticles,
  setAllCourses,
  setAllLessons,
  setPreviewClosed,
} from '../all_courses/courseFilterSlice';
import { setLocation, setUser } from '../auth/authslice';
import { setDark, setLight, toggleSignInModal } from './layoutSlice';
import CartToggle from './CartToggle';
import ScrollTop from './ScrollTop';
import { useUser } from '@auth0/nextjs-auth0/client';
import { API, graphqlOperation } from 'aws-amplify';
import CoursePreview from '../../components/course-card/CoursePreview';
import { usersByEmail, listLMSCourses } from '../../src/graphql/queries';
import { createUser, updateLMSCourse } from '../../src/graphql/mutations';
import { onUpdateUser } from '../../src/graphql/subscriptions';
import HeaderNew from '../navigation/Header/HeaderNew';
import SearchContainer from '../../components/search/SearchContainer';
import Loading from '../../components/shared/Loading';
import SignInModal from '../../components/shared/SignInModal';
import CookieConsent from '../../components/shared/CookieConsent';
import IndiaBanner from '../../components/shared/IndiaBanner';
import { allCourseBackup } from '../../data/allCourseBackup';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { darkMode, signInModal } = useSelector((state) => state.layout);
  const { searchOpen } = useSelector((state) => state.nav);
  const { preview } = useSelector((state) => state.course_filter);
  const { location, cart } = useSelector((state) => state.auth);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const getAndSetUser = async () => {
        const currentUser = await API.graphql({
          query: usersByEmail,
          variables: { email: user.email },
        });

        if (currentUser.data.usersByEmail.items[0]) {
          dispatch(setUser(currentUser.data.usersByEmail.items[0]));
        } else {
          const createNewUser = await API.graphql({
            query: createUser,
            variables: {
              input: {
                name: user.name,
                email: user.email,
                picture: user.picture,
                source: 'website',
              },
            },
          });
          dispatch(setUser(createNewUser.data.createUser));
        }
      };
      getAndSetUser();
    }

    const sub = API.graphql(graphqlOperation(onUpdateUser)).subscribe({
      next: ({ value }) => {
        if (user && value.data.onUpdateUser.email === user.email)
          dispatch(setUser(value.data.onUpdateUser));
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const getLessons = /* GraphQL */ `
      query MyQuery {
        listLessons(limit: 250, filter: { status: { eq: "PUBLISHED" } }) {
          items {
            author
            backdate
            content
            createdAt
            id
            objectives
            screengrab
            seoImage
            slug
            tags {
              items {
                tags {
                  id
                  tag
                }
              }
            }
            title
            type
            subhead
          }
        }
      }
    `;

    const getArticles = /* GraphQL */ `
      query MyQuery {
        listBlogs {
          items {
            id
            slug
            title
            content
            date
          }
        }
      }
    `;

    const getCourses = async () => {
      // const courses = await API.graphql({
      //   query: listLMSCourses,
      //   variables: { filter: { collection: { contains: 'null' } } },
      // });

      dispatch(setAllCourses(allCourseBackup));
    };

    const setLessons = async () => {
      const lessons = await API.graphql(graphqlOperation(getLessons));
      dispatch(setAllLessons(lessons.data.listLessons.items));
    };

    const setArticles = async () => {
      const articles = await API.graphql(graphqlOperation(getArticles));
      dispatch(setAllArticles(articles.data.listBlogs.items));
    };

    getCourses();
    setLessons();
    setArticles();
  }, [dispatch]);

  useEffect(() => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dispatch(setDark());
        document.body.classList.add('dark');
      } else {
        dispatch(setLight());
        document.body.classList.remove('dark');
      }

      if (!window.matchMedia) {
        dispatch(setLight());
      }
    }
  }, []);

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
          {searchOpen && <SearchContainer />}
          {signInModal && (
            <SignInModal
              open={signInModal}
              setOpen={() => dispatch(toggleSignInModal())}
            />
          )}
          {preview && (
            <CoursePreview close={() => dispatch(setPreviewClosed())} />
          )}
          {location && location.country === 'India' && <IndiaBanner />}
          <Loading />
          <HeaderNew />
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
