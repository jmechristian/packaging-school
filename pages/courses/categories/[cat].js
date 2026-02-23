import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getCoursesByCategory,
  getCertificateByCategory,
  registgerCourseClick,
  registerCertificateClick,
  getDeviceType,
  createNewOrder,
} from '../../../helpers/api';
import { useSelector } from 'react-redux';
import { updateCategoryMenu } from '../../../data/CategoryMenu';
import {
  MdOutlineSearch,
  MdExpandLess,
  MdExpandMore,
  MdWorkspacePremium,
  MdVideocam,
} from 'react-icons/md';
import Meta from '../../../components/shared/Meta';
import { generateMetadata } from '../../../libs/seo/generateMetadata';
import SortableTableHeader from '../../../components/shared/SortableTableHeader';
import CourseTableRow from '../../../components/shared/CourseTableRow';
import CertificateTableRow from '../../../components/shared/CertificateTableRow';
import CourseMobileCard from '../../../components/shared/CourseMobileCard';
import CertificateMobileCard from '../../../components/shared/CertificateMobileCard';
import { setColorByCategoryString, setCategoryIcon, setCategoryText } from '../../../helpers/utils';
import { useThinkificLink } from '../../../hooks/useThinkificLink';

const Page = () => {
  const router = useRouter();
  const { cat } = router.query;
  const { location, awsUser } = useSelector((state) => state.auth);
  const deviceType = getDeviceType();
  const { navigateToThinkific } = useThinkificLink();
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isCourses, setIsCourses] = useState([]);
  const [isCertificatesRaw, setIsCertificatesRaw] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsedCertificates, setCollapsedCertificates] = useState(false);
  const [collapsedCourses, setCollapsedCourses] = useState(false);
  const [navigatingId, setNavigatingId] = useState(null);
  const [isSort, setIsSort] = useState({ value: 'course id', direction: 'ASC' });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleComplete = () => setNavigatingId(null);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);
    return () => {
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (!navigatingId) return;
    const fallback = setTimeout(() => setNavigatingId(null), 3000);
    return () => clearTimeout(fallback);
  }, [navigatingId]);

  useEffect(() => {
    const fetch = async () => {
      if (!cat) return;
      setIsLoading(true);
      try {
        const [courses, certs] = await Promise.all([
          getCoursesByCategory(cat.toUpperCase()),
          getCertificateByCategory(cat.toUpperCase()).catch(() => []),
        ]);
        setIsCourses(courses || []);
        setIsCertificatesRaw(certs || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [cat]);

  const setSort = (value) => {
    setIsSort((prev) => ({
      value,
      direction: prev.value === value && prev.direction === 'ASC' ? 'DSC' : 'ASC',
    }));
  };

  const flatCertificates = useMemo(() => {
    return (isCertificatesRaw || [])
      .map((item) => item?.certificateObject)
      .filter(Boolean);
  }, [isCertificatesRaw]);

  const searchCertificates = useMemo(() => {
    if (!isSearchTerm.trim()) return flatCertificates;
    const term = isSearchTerm.toLowerCase();
    return flatCertificates.filter(
      (cert) =>
        cert.title?.toLowerCase().includes(term) ||
        cert.description?.toLowerCase().includes(term) ||
        cert.courseId?.toLowerCase().includes(term),
    );
  }, [flatCertificates, isSearchTerm]);

  const sortedCertificates = useMemo(() => {
    const { value, direction } = isSort;
    const mult = direction === 'ASC' ? 1 : -1;
    return [...searchCertificates].sort((a, b) => {
      if (value === 'title') return mult * (a.title || '').localeCompare(b.title || '');
      if (value === 'course id') return mult * (a.courseId || '').localeCompare(b.courseId || '');
      if (value === 'lessons') return mult * ((a.courses || 0) - (b.courses || 0));
      if (value === 'hours') return mult * (parseFloat(a.hours || 0) - parseFloat(b.hours || 0));
      if (value === 'price')
        return mult * ((parseInt(a.price, 10) || 0) - (parseInt(b.price, 10) || 0));
      return 0;
    });
  }, [searchCertificates, isSort]);

  const sortedAndSearchedCourses = useMemo(() => {
    if (!isSearchTerm.trim()) return isCourses;
    const term = isSearchTerm.toLowerCase();
    return (isCourses || []).filter(
      (c) =>
        c.title?.toLowerCase().includes(term) ||
        c.subheadline?.toLowerCase().includes(term) ||
        c.courseId?.toLowerCase().includes(term) ||
        c.what_learned?.toLowerCase().includes(term),
    );
  }, [isCourses, isSearchTerm]);

  const sortedCourses = useMemo(() => {
    const { value, direction } = isSort;
    const mult = direction === 'ASC' ? 1 : -1;
    return [...(sortedAndSearchedCourses || [])].sort((a, b) => {
      if (value === 'title') return mult * (a.title || '').localeCompare(b.title || '');
      if (value === 'course id') return mult * (a.courseId || '').localeCompare(b.courseId || '');
      if (value === 'lessons') return mult * ((a.lessons || 0) - (b.lessons || 0));
      if (value === 'hours') return mult * (parseFloat(a.hours || 0) - parseFloat(b.hours || 0));
      if (value === 'price') return mult * ((parseInt(a.price, 10) || 0) - (parseInt(b.price, 10) || 0));
      return 0;
    });
  }, [sortedAndSearchedCourses, isSort]);

  const categoryNameHandler = (c) => {
    const item = updateCategoryMenu.find((i) => i.value === c);
    return item ? item.name : c;
  };

  const categoryName = cat ? categoryNameHandler(cat.toUpperCase()) : 'Courses';
  const catLabel = setCategoryText(cat?.toUpperCase()) || categoryName;
  const metadata = generateMetadata({
    pageType: 'CATEGORY',
    data: {
      name: categoryName,
      description: `Browse ${categoryName} courses from Packaging School.`,
    },
    pathname: cat ? `/courses/categories/${cat}` : '/courses/categories',
  });

  const orderHandler = async (courseData) => {
    const orderId = await createNewOrder({
      courseDescription: courseData.subheadline,
      courseDiscount: 0,
      courseImage: courseData.seoImage,
      courseName: courseData.title,
      courseLink: `${courseData.link}`,
      total: courseData.price,
      userID: awsUser?.id ?? null,
      email: awsUser?.email ?? null,
      name: awsUser?.name ?? null,
    });
    if (awsUser?.name?.includes(' ')) {
      navigateToThinkific(`${courseData.link}`, `${courseData.link}`);
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  const handleCurrentCategoryClick = (c) => {
    router.push(`/courses/categories/${c}`);
  };

  const cardClickHandler = async (id, slug, altlink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'TABLE');
    if (altlink) {
      window.open(altlink, '_blank');
    } else {
      router.push(`/${type === 'COLLECTION' ? 'collections' : 'courses'}/${slug}`);
    }
  };

  const handleCertCardClick = async (cert, abbreviation, type, link, applicationLink) => {
    await registerCertificateClick({
      country: location.country,
      ipAddress: location.ip,
      device: deviceType,
      object: abbreviation,
      page: router.asPath,
      type,
    });
    if (type === 'CERTIFICATE-VIEW') {
      router.push(link);
    } else if (type === 'CERTIFICATE-APPLY') {
      if (abbreviation === 'CPS' || abbreviation === 'CMPM') {
        router.push(applicationLink);
      } else {
        orderHandler({
          subheadline: cert.description,
          seoImage: cert.seoImage,
          title: cert.title,
          link: cert.applicationLink,
          price: cert.price,
          total: cert.price,
        });
      }
    } else {
      router.push(link);
    }
  };

  const hasResults = sortedCertificates?.length > 0 || sortedCourses?.length > 0;

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url={cat ? `/courses/categories/${cat}` : undefined}
        image='https://packschool.s3.amazonaws.com/all-courses-seoImage.webp'
      />
      <div className='w-full max-w-7xl mx-auto px-3 xl:!px-0 py-6 sm:py-12'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900'>
              {categoryName} Courses
            </h1>
            <Link
              href='/all_courses'
              className='flex items-center gap-2 text-sm font-semibold text-base-brand hover:underline w-fit'
            >
              View All Courses
            </Link>
          </div>

          {/* Search + Categories */}
          <div className='flex flex-col gap-3 sm:gap-4 w-full'>
            <div className='flex flex-row flex-wrap items-center justify-start gap-3 w-full'>
              <div className='flex-1 min-w-[180px] border border-slate-400 rounded-md px-2 py-0.5 flex gap-1.5 items-center'>
                <input
                  type='text'
                  className='w-full border-none ring-0 focus:ring-0 bg-transparent text-sm'
                  placeholder='Search Courses'
                  value={isSearchTerm}
                  onChange={(e) => setIsSearchTerm(e.target.value)}
                />
                <MdOutlineSearch size={20} className='flex-shrink-0 text-slate-500' />
              </div>
            </div>
            <div className='border-b border-slate-300 w-full pb-2'>
              <div className='flex flex-wrap gap-2'>
                {updateCategoryMenu.map((c) => (
                  <button
                    key={c.value}
                    type='button'
                    onClick={() => handleCurrentCategoryClick(c.value)}
                    className={`flex items-center gap-2 border rounded px-3 py-2 text-xs font-semibold flex-shrink-0 ${
                      cat?.toUpperCase() === c.value
                        ? 'border-base-brand bg-base-brand/20 text-base-dark'
                        : 'border-slate-300 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className='grid grid-cols-1 gap-4'>
              {[...Array(6)].map((_, i) => (
                <div key={i} className='h-16 bg-slate-200 rounded animate-pulse' />
              ))}
            </div>
          ) : !hasResults ? (
            <div className='w-full py-16 flex flex-col gap-4 items-center'>
              <div className='text-lg font-semibold'>No courses found</div>
              <button
                type='button'
                onClick={() => setIsSearchTerm('')}
                className='flex items-center gap-2 px-4 py-2 rounded bg-base-brand text-white font-medium hover:bg-base-dark transition-colors'
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className='w-full'>
              {/* Certificates */}
              {sortedCertificates?.length > 0 && (
                <div className='mb-6'>
                  <button
                    type='button'
                    onClick={() => setCollapsedCertificates((prev) => !prev)}
                    className='w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-lg bg-clemson bg-opacity-80 hover:bg-opacity-100 transition-opacity'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                        <MdWorkspacePremium size={18} color='white' />
                      </div>
                      <span className='font-bold text-white text-base sm:text-lg'>Certificates</span>
                      <span className='text-white/90 text-sm'>({sortedCertificates.length})</span>
                    </div>
                    {collapsedCertificates ? (
                      <MdExpandMore size={24} color='white' />
                    ) : (
                      <MdExpandLess size={24} color='white' />
                    )}
                  </button>
                  {!collapsedCertificates && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden w-full'
                      >
                        {isMobile ? (
                          <div className='border border-slate-200 border-t-0'>
                            {sortedCertificates.map((cert) => (
                              <CertificateMobileCard
                                key={cert.id}
                                certificate={cert}
                                isNavigating={navigatingId === cert.id}
                                onRowClick={() => {
                                  setNavigatingId(cert.id);
                                  handleCertCardClick(
                                    cert,
                                    cert.abbreviation,
                                    'CERTIFICATE-VIEW',
                                    cert.link,
                                    cert.applicationLink,
                                  );
                                }}
                                onApplyClick={() => {
                                  setNavigatingId(cert.id);
                                  handleCertCardClick(
                                    cert,
                                    cert.abbreviation,
                                    'CERTIFICATE-APPLY',
                                    cert.link,
                                    cert.applicationLink,
                                  );
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className='overflow-x-auto'>
                            <table className='w-full table-fixed border-collapse border border-slate-200 border-t-0'>
                              <colgroup>
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '24%' }} />
                                <col style={{ width: '44%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '4%' }} />
                                <col style={{ width: '8%' }} />
                              </colgroup>
                              <thead>
                                <tr className='bg-slate-100'>
                                  <SortableTableHeader
                                    label='ID'
                                    className='sticky left-0 z-10 bg-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
                                    sortKey='course id'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('course id')}
                                  />
                                  <SortableTableHeader
                                    label='Title'
                                    sortKey='title'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('title')}
                                  />
                                  <th className='collapse sm:visible px-2 sm:px-3 py-2 text-left font-semibold text-xs sm:text-sm'>
                                    Subheadline
                                  </th>
                                  <SortableTableHeader
                                    label='Hours'
                                    sortKey='hours'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('hours')}
                                    align='center'
                                    className='collapse sm:visible'
                                  />
                                  <SortableTableHeader
                                    label='Lessons'
                                    sortKey='lessons'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('lessons')}
                                    align='center'
                                    className='collapse sm:visible'
                                  />
                                  <th
                                    className='px-1 py-2 text-center font-semibold text-xs sm:text-sm'
                                    aria-label='Preview'
                                  >
                                    <MdVideocam size={18} className='text-slate-600 inline-block' />
                                  </th>
                                  <SortableTableHeader
                                    label='Price'
                                    sortKey='price'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('price')}
                                    align='center'
                                  />
                                </tr>
                              </thead>
                              <tbody className='bg-white'>
                                {sortedCertificates.map((cert) => (
                                  <CertificateTableRow
                                    key={cert.id}
                                    certificate={cert}
                                    isNavigating={navigatingId === cert.id}
                                    onRowClick={() => {
                                      setNavigatingId(cert.id);
                                      handleCertCardClick(
                                        cert,
                                        cert.abbreviation,
                                        'CERTIFICATE-VIEW',
                                        cert.link,
                                        cert.applicationLink,
                                      );
                                    }}
                                    onApplyClick={() => {
                                      setNavigatingId(cert.id);
                                      handleCertCardClick(
                                        cert,
                                        cert.abbreviation,
                                        'CERTIFICATE-APPLY',
                                        cert.link,
                                        cert.applicationLink,
                                      );
                                    }}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              )}

              {/* Courses */}
              {sortedCourses?.length > 0 && (
                <div>
                  <button
                    type='button'
                    onClick={() => setCollapsedCourses((prev) => !prev)}
                    className={`w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-lg ${setColorByCategoryString(
                      cat?.toUpperCase(),
                    )} bg-opacity-80 hover:bg-opacity-100 transition-opacity`}
                  >
                    <div className='flex items-center gap-2'>
                      {setCategoryIcon(cat?.toUpperCase())}
                      <span className='font-bold text-white text-base sm:text-lg'>{catLabel}</span>
                      <span className='text-white/90 text-sm'>({sortedCourses.length})</span>
                    </div>
                    {collapsedCourses ? (
                      <MdExpandMore size={24} color='white' />
                    ) : (
                      <MdExpandLess size={24} color='white' />
                    )}
                  </button>
                  {!collapsedCourses && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden w-full'
                      >
                        {isMobile ? (
                          <div className='border border-slate-200 border-t-0'>
                            {sortedCourses.map((course) => (
                              <CourseMobileCard
                                key={course.id}
                                course={course}
                                isNavigating={navigatingId === course.id}
                                onRowClick={() => {
                                  setNavigatingId(course.id);
                                  cardClickHandler(
                                    course.id,
                                    course.slug,
                                    course.altLink,
                                    course.type,
                                  );
                                }}
                                onPurchase={() => orderHandler(course)}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className='overflow-x-auto'>
                            <table className='w-full table-fixed border-collapse border border-slate-200 border-t-0'>
                              <colgroup>
                                <col style={{ width: '8%' }} />
                                <col style={{ width: '24%' }} />
                                <col style={{ width: '44%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '6%' }} />
                                <col style={{ width: '4%' }} />
                                <col style={{ width: '8%' }} />
                              </colgroup>
                              <thead>
                                <tr className='bg-slate-100'>
                                  <SortableTableHeader
                                    label='ID'
                                    className='sticky left-0 z-10 bg-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
                                    sortKey='course id'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('course id')}
                                  />
                                  <SortableTableHeader
                                    label='Title'
                                    sortKey='title'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('title')}
                                  />
                                  <th className='collapse sm:visible px-2 sm:px-3 py-2 text-left font-semibold text-xs sm:text-sm'>
                                    Subheadline
                                  </th>
                                  <SortableTableHeader
                                    label='Hours'
                                    sortKey='hours'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('hours')}
                                    align='center'
                                    className='collapse sm:visible'
                                  />
                                  <SortableTableHeader
                                    label='Lessons'
                                    sortKey='lessons'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('lessons')}
                                    align='center'
                                    className='collapse sm:visible'
                                  />
                                  <th
                                    className='px-1 py-2 text-center font-semibold text-xs sm:text-sm'
                                    aria-label='Preview'
                                  >
                                    <MdVideocam size={18} className='text-slate-600 inline-block' />
                                  </th>
                                  <SortableTableHeader
                                    label='Price'
                                    sortKey='price'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('price')}
                                    align='center'
                                  />
                                </tr>
                              </thead>
                              <tbody className='bg-white'>
                                {sortedCourses.map((course) => (
                                  <CourseTableRow
                                    key={course.id}
                                    course={course}
                                    isNavigating={navigatingId === course.id}
                                    onRowClick={() => {
                                      setNavigatingId(course.id);
                                      cardClickHandler(
                                        course.id,
                                        course.slug,
                                        course.altLink,
                                        course.type,
                                      );
                                    }}
                                    onPurchase={() => orderHandler(course)}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
