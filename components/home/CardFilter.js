import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAWSUser } from '../../features/auth/authslice';
import {
  getCoursesForHomePageFilter,
  getCertificates,
  addCourseToWishlist,
  removeCourseFromWishlist,
  registgerCourseClick,
  registerCertificateClick,
  getDeviceType,
} from '../../helpers/api';
import {
  CertCard,
  CertPreview,
  CourseCard,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const CardFilter = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deviceType = getDeviceType();
  const { awsUser, location } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Certificates');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCertificatesLoaded, setIsCertificatesLoaded] = useState(false);
  const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);

  const tabs = [
    'Certificates',
    'Packaging Basics',
    'Packaging Science',
    'Sustainability',
    'Automotive',
    'Design',
    'Materials',
    'Business',
  ];

  const getApiTabName = (displayName) => {
    if (displayName === 'Automotive') {
      displayName = 'Auto';
    }
    return displayName.toUpperCase().replace(/\s+/g, '');
  };

  // Load data based on active tab
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setCourses([]);
    setIsCertificatesLoaded(false);
    setIsCoursesLoaded(false);

    if (activeTab === 'Certificates') {
      getCertificates()
        .then((certs) => {
          if (certs && Array.isArray(certs)) {
            setCourses(certs);
            setIsCertificatesLoaded(true);
          } else {
            setError('Failed to load certificates');
            setIsCertificatesLoaded(false);
          }
        })
        .catch((err) => {
          console.error('Error loading certificates:', err);
          setError('Failed to load certificates');
          setIsCertificatesLoaded(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      getCoursesForHomePageFilter(getApiTabName(activeTab))
        .then((courses) => {
          if (courses && Array.isArray(courses)) {
            setCourses(courses.slice(0, 4));
            setIsCoursesLoaded(true);
          } else {
            setError('Failed to load courses');
            setIsCoursesLoaded(false);
          }
        })
        .catch((err) => {
          console.error('Error loading courses:', err);
          setError('Failed to load courses');
          setIsCoursesLoaded(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeTab]); // Only depend on activeTab

  const handleAddToWishlist = async (courseId) => {
    if (awsUser) {
      if (
        awsUser.wishlist.items.some((item) => item.lMSCourse.id === courseId)
      ) {
        const res = await removeCourseFromWishlist(
          awsUser.wishlist.items.find((item) => item.lMSCourse.id === courseId)
            .id,
          awsUser.email
        );
        dispatch(setAWSUser(res));
      } else {
        const res = await addCourseToWishlist(
          courseId,
          awsUser.id,
          awsUser.email
        );
        dispatch(setAWSUser(res));
      }
    }
  };

  const cardClickHandler = async (id, slug, altlink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'GRID');

    altlink
      ? router.push(altlink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`
        );
  };

  const cardPurchaseHandler = async (id, link) => {
    await registgerCourseClick(id, router.asPath, location, link, 'GRID');

    router.push(link);
  };

  const handleCertCardClick = async (
    abbreviation,
    type,
    link,
    applicationLink
  ) => {
    await registerCertificateClick({
      country: location.country,
      ipAddress: location.ipAddress,
      device: deviceType,
      object: abbreviation,
      page: '/all_courses',
      type: type,
    });

    if (type === 'CERTIFICATE-VIEW') {
      router.push(link);
    } else if (type === 'CERTIFICATE-APPLY') {
      router.push(applicationLink);
    } else {
      router.push(link);
    }
  };

  const LoadingSkeleton = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, index) => (
        <div key={index} className='bg-slate-800 rounded-lg p-4 animate-pulse'>
          <div className='h-6 bg-slate-700 rounded w-3/4 mb-4'></div>
          <div className='space-y-3'>
            <div className='h-4 bg-slate-700 rounded w-full'></div>
            <div className='h-4 bg-slate-700 rounded w-5/6'></div>
            <div className='h-4 bg-slate-700 rounded w-4/6'></div>
          </div>
        </div>
      ))}
    </div>
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Safe wrapper for CertPreview to prevent errors
  const SafeCertPreview = ({ cert }) => {
    if (!cert || !cert.id) {
      return (
        <div className='bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center'>
          <p className='text-white'>Certificate data unavailable</p>
        </div>
      );
    }

    try {
      return (
        <CertPreview
          cert={cert}
          initialVideoState={false}
          purchaseText={
            cert.abbreviation === 'CMPM' || cert.abbreviation === 'CPS'
              ? 'Apply Now'
              : 'Enroll Now'
          }
        />
      );
    } catch (err) {
      console.error('Error rendering CertPreview:', err);
      return (
        <div className='bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center'>
          <p className='text-white'>Error displaying certificate</p>
        </div>
      );
    }
  };

  // Safe wrapper for CourseCard to prevent errors
  const SafeCourseCard = ({ course }) => {
    if (!course || !course.id) {
      return (
        <div className='bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center'>
          <p className='text-white'>Course data unavailable</p>
        </div>
      );
    }

    try {
      return (
        <CourseCard
          course={course}
          initialVideoState={false}
          cardClickHandler={() =>
            cardClickHandler(
              course.id,
              course.slug,
              course.altLink,
              course.type
            )
          }
          cardPurchaseHandler={() =>
            cardPurchaseHandler(course.id, course.link)
          }
          cardFavoriteHandler={() => handleAddToWishlist(course.id)}
          isFavorite={awsUser?.wishlist?.items.some(
            (item) => item.lMSCourse.id === course.id
          )}
        />
      );
    } catch (err) {
      console.error('Error rendering CourseCard:', err);
      return (
        <div className='bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center'>
          <p className='text-white'>Error displaying course</p>
        </div>
      );
    }
  };

  return (
    <div className='w-full bg-slate-900 flex items-center justify-center'>
      <div className='w-full flex flex-col gap-10 items-center justify-center max-w-7xl mx-auto py-20 px-5 lg:!px-0'>
        <div className='w-full flex flex-col gap-4'>
          <div className='w-full text-center text-xl uppercase font-bold text-gray-400 tracking-[0.5em]'>
            Start Learning
          </div>
          <div className='w-full text-center text-white'>
            <h2 className='h2-base'>Popular Curriculum</h2>
          </div>
          <div className='w-full text-center text-xl text-white/70 max-w-4xl mx-auto'>
            Instantly access expert‑led, self‑paced courses—or choose one of our
            comprehensive certificate programs below and jump straight into
            hands‑on learning designed for busy professionals.
          </div>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full flex flex-wrap justify-center gap-2 mt-8'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 font-semibold'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className='w-full border-t border-white pt-6'>
          <AnimatePresence mode='wait'>
            {isLoading ? (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div
                key='error'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-white py-8'
              >
                <p className='text-xl'>{error}</p>
                <button
                  onClick={() => setActiveTab(activeTab)}
                  className='mt-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600'
                >
                  Try Again
                </button>
              </motion.div>
            ) : courses.length > 0 ? (
              <motion.div
                key='content'
                variants={container}
                initial='hidden'
                animate='show'
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:!gap-0 w-full h-full'
              >
                {activeTab === 'Certificates' && isCertificatesLoaded
                  ? courses.slice(0, 4).map((course) => (
                      <motion.div key={course.id} variants={item}>
                        <SafeCertPreview cert={course} />
                      </motion.div>
                    ))
                  : isCoursesLoaded &&
                    courses.map((course) => (
                      <motion.div key={course.id} variants={item}>
                        <SafeCourseCard course={course} />
                      </motion.div>
                    ))}
              </motion.div>
            ) : (
              <motion.div
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-white py-8'
              >
                <p className='text-xl'>No courses found in this category</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className='w-full flex justify-center mt-20'>
            <div
              className='w-fit px-6 py-2 bg-clemson text-white text-xl  hover:bg-clemson-dark cursor-pointer font-bold rounded'
              onClick={() => router.push('/all_courses')}
            >
              View Full Catalog
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFilter;
