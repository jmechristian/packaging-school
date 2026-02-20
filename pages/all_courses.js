import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  MdOutlineSearch,
  MdAutorenew,
  MdMenuBook,
  MdSchool,
  MdScience,
  MdExpandLess,
  MdExpandMore,
  MdWorkspacePremium,
  MdVideocam,
} from 'react-icons/md';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import { categoryMenu, updateCategoryMenu } from '../data/CategoryMenu';
import {
  setCategoryIcon,
  setColorByCategoryString,
  setCategoryText,
  getCategoryFilterIcon,
} from '../helpers/utils';
import {
  handleCategoryClick,
  getDeviceType,
  getAllLMSCourses,
  getCertificates,
  registgerCourseClick,
  registerCertificateClick,
  createNewOrder,
} from '../helpers/api';
import SortableTableHeader from '../components/shared/SortableTableHeader';
import FilterIconTooltip from '../components/shared/FilterIconTooltip';
import CourseTableRow from '../components/shared/CourseTableRow';
import CertificateTableRow from '../components/shared/CertificateTableRow';
import CourseMobileCard from '../components/shared/CourseMobileCard';
import CertificateMobileCard from '../components/shared/CertificateMobileCard';
import BrutalCircleIconTooltip from '../components/shared/BrutalCircleIconTooltip';
import { createCourseSearch } from '../src/graphql/mutations';
import { setAWSUser } from '../features/auth/authslice';
import { useThinkificLink } from '../hooks/useThinkificLink';

const CATEGORY_ORDER = [
  'AUTO',
  'BUSINESS',
  'DESIGN',
  'FOODANDBEVERAGE',
  'INDUSTRY',
  'MATERIALS',
  'SUPPLYCHAIN',
  'SUSTAINABILITY',
  'PACKAGINGBASICS',
  'PACKAGINGSCIENCE',
  'PACKAGINGDESIGN',
  'COLLECTIONS',
  'ELECTIVE',
  'COLLECTION',
  'OTHER',
];

const getPrimaryCategory = (course, filters) => {
  if (course.type === 'COLLECTION' || course.type === 'COLLECTIONS')
    return 'COLLECTIONS';
  if (course.type === 'ELECTIVE') return 'ELECTIVE';
  if (filters?.length) {
    const match = course.categoryArray?.find((c) => filters.includes(c));
    return match || course.categoryArray?.[0] || 'OTHER';
  }
  return course.categoryArray?.[0] || 'OTHER';
};

const groupCoursesByCategory = (courses, filters) => {
  const groups = {};
  courses.forEach((course) => {
    const cat = getPrimaryCategory(course, filters);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(course);
  });
  return groups;
};

const Page = ({
  courses: initialCourses = [],
  certificates: initialCertificates = [],
  firstCardImage,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deviceType = getDeviceType();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isFilters, setIsFilters] = useState([]);
  const [isCourses, setIsCourses] = useState(initialCourses);
  const [isCertificates, setIsCertificates] = useState(initialCertificates);
  const [collapsedCategories, setCollapsedCategories] = useState(
    () => new Set(),
  );
  const [navigatingId, setNavigatingId] = useState(null);

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
    const filter = router.query.category;
    if (filter) {
      setIsFilters(filter === 'ALL' ? [] : [filter]);
    }
  }, [router.query.category]);

  const isInFilterArray = (value) => isFilters.includes(value);

  const filterClickHandler = (value) => {
    if (value === 'ALL') {
      setIsFilters([]);
    } else if (isFilters.includes(value)) {
      setIsFilters([...isFilters].filter((val) => val !== value));
    } else {
      setIsFilters((prev) => [...prev, value]);
    }
  };

  const [isSort, setIsSort] = useState({
    value: 'course id',
    direction: 'ASC',
  });

  const setSort = (value) => {
    setIsSort((prev) => ({
      value,
      direction:
        prev.value === value && prev.direction === 'ASC' ? 'DSC' : 'ASC',
    }));
  };

  const filtered = useMemo(() => {
    if (isFilters.length === 0) return isCourses;
    return isCourses.filter((course) => {
      const matchCategory = course.categoryArray?.some((c) =>
        isFilters.includes(c),
      );
      const matchType = isFilters.includes(course.type);
      const matchCollections =
        isFilters.includes('COLLECTIONS') && course.type === 'COLLECTION';
      return matchCategory || matchType || matchCollections;
    });
  }, [isCourses, isFilters]);

  const sortedCourses = useMemo(() => {
    if (!filtered) return [];
    const { value, direction } = isSort;
    const mult = direction === 'ASC' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (value === 'title') return mult * a.title.localeCompare(b.title);
      if (value === 'course id')
        return mult * a.courseId.localeCompare(b.courseId);
      if (value === 'category')
        return (
          mult *
          (a.categoryArray?.[0] || '').localeCompare(b.categoryArray?.[0] || '')
        );
      if (value === 'lessons')
        return mult * ((a.lessons || 0) - (b.lessons || 0));
      if (value === 'hours')
        return mult * (parseFloat(a.hours || 0) - parseFloat(b.hours || 0));
      if (value === 'price')
        return (
          mult * ((parseInt(a.price, 10) || 0) - (parseInt(b.price, 10) || 0))
        );
      return 0;
    });
  }, [filtered, isSort]);

  const sortedAndSearchedCourses = useMemo(() => {
    if (!isSearchTerm && sortedCourses) return sortedCourses;
    return sortedCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        c.subheadline?.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        c.courseId.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        c.what_learned?.toLowerCase().includes(isSearchTerm.toLowerCase()),
    );
  }, [isSearchTerm, sortedCourses]);

  const searchCertificates = useMemo(() => {
    return isCertificates.filter(
      (cert) =>
        cert.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        cert.description?.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        cert.courseId.toLowerCase().includes(isSearchTerm.toLowerCase()),
    );
  }, [isCertificates, isSearchTerm]);

  const sortedCertificates = useMemo(() => {
    const { value, direction } = isSort;
    const mult = direction === 'ASC' ? 1 : -1;
    return [...searchCertificates].sort((a, b) => {
      if (value === 'title') return mult * a.title.localeCompare(b.title);
      if (value === 'course id')
        return mult * a.courseId.localeCompare(b.courseId);
      if (value === 'lessons')
        return mult * ((a.courses || 0) - (b.courses || 0));
      if (value === 'hours')
        return mult * (parseFloat(a.hours || 0) - parseFloat(b.hours || 0));
      if (value === 'price')
        return mult * (parseInt(a.price, 10) - parseInt(b.price, 10));
      return 0;
    });
  }, [searchCertificates, isSort]);

  const groupedByCategory = useMemo(() => {
    const groups = groupCoursesByCategory(sortedAndSearchedCourses, isFilters);
    return CATEGORY_ORDER.filter((cat) => groups[cat]?.length).map(
      (category) => ({
        category,
        items: groups[category].sort((a, b) =>
          a.courseId.localeCompare(b.courseId),
        ),
      }),
    );
  }, [sortedAndSearchedCourses, isFilters]);

  useEffect(() => {
    const sendSearchTracking = async () => {
      await API.graphql({
        query: createCourseSearch,
        variables: {
          input: {
            country: location.country,
            ipAddress: location.ip,
            term: isSearchTerm,
          },
        },
      });
    };
    if (isSearchTerm.length > 3 && sortedAndSearchedCourses?.length === 0) {
      sendSearchTracking();
    }
  }, [isSearchTerm, location, sortedAndSearchedCourses]);

  const handleCurrentCategoryClick = async (category) => {
    await handleCategoryClick({
      category,
      country: location.country,
      device: getDeviceType(),
      ipAddress: location.ip,
      page: '/all-courses',
    });
    router.push(`/courses/categories/${category}`);
  };

  const toggleCategory = (cat) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const isCategoryExpanded = (cat) => !collapsedCategories.has(cat);

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
      ipAddress: location.ip,
      country: location.country,
      device: deviceType,
      page: '/all_courses',
    });
    if (awsUser?.name?.includes(' ')) {
      navigateToThinkific(`${courseData.link}`, `${courseData.link}`);
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  const cardClickHandler = async (id, slug, altlink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'TABLE');
    if (altlink) {
      window.open(altlink, '_blank');
    } else {
      router.push(
        `/${type === 'COLLECTION' ? 'collections' : 'courses'}/${slug}`,
      );
    }
  };

  const handleCertCardClick = async (
    cert,
    abbreviation,
    type,
    link,
    applicationLink,
  ) => {
    await registerCertificateClick({
      country: location.country,
      ipAddress: location.ip,
      device: deviceType,
      object: abbreviation,
      page: '/all_courses',
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

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/all_courses',
    title: 'Packaging School Courses',
    description:
      'Browse the extensive catalog of Packaging School courses covering Business, Design, Materials, Food and Beverage, Supply Chain and Logistics, Automotive, and Industry.',
  });

  const hasResults =
    sortedCertificates?.length > 0 || sortedAndSearchedCourses?.length > 0;

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/all_courses'
        image='https://packschool.s3.amazonaws.com/all-courses-seoImage.webp'
        preloadImage={firstCardImage}
      />
      <div className='w-full max-w-7xl mx-auto px-3 xl:!px-0 py-6 sm:py-12'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900'>
            Browse All Courses
          </h1>

          {/* Search + Filter Icons */}
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
                <MdOutlineSearch
                  size={20}
                  className='flex-shrink-0 text-slate-500 sm:w-6 sm:h-6'
                />
              </div>
              <div className='hidden sm:flex overflow-x-auto overflow-y-hidden gap-1 scrollbar-hide flex-shrink-0'>
                {categoryMenu.map((cat) => {
                  const { Icon, tooltip } = getCategoryFilterIcon(cat.value);
                  const isActive =
                    cat.value === 'ALL'
                      ? isFilters.length === 0
                      : isInFilterArray(cat.value);
                  return (
                    <FilterIconTooltip key={cat.value} tooltip={tooltip}>
                      <button
                        type='button'
                        onClick={() => filterClickHandler(cat.value)}
                        className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                          isActive
                            ? 'bg-base-brand text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    </FilterIconTooltip>
                  );
                })}
                <FilterIconTooltip tooltip='Beverage Institute by ISBT®'>
                  <a
                    href='https://packagingschool.com/isbt'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex-shrink-0'
                  >
                    <MdScience size={20} />
                  </a>
                </FilterIconTooltip>
              </div>
            </div>
            <div className='border-b border-slate-300 w-full pb-2'>
              <div className='flex flex-wrap gap-2'>
                {updateCategoryMenu.map((cat) => (
                  <button
                    key={cat.value}
                    type='button'
                    onClick={() => handleCurrentCategoryClick(cat.value)}
                    className='flex items-center gap-2 border border-slate-300 rounded bg-neutral-200 hover:bg-neutral-300 px-3 py-2 text-xs font-semibold flex-shrink-0'
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className='grid grid-cols-1 gap-4'>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='h-16 bg-slate-200 rounded animate-pulse'
                />
              ))}
            </div>
          ) : !hasResults ? (
            <div className='w-full py-16 flex flex-col items-center justify-center gap-4'>
              {isSearchTerm.length > 3 ? (
                <>
                  <div className='text-lg font-semibold'>
                    No results returned
                  </div>
                  <BrutalCircleIconTooltip
                    tooltip='Reset'
                    bgColor='bg-base-brand'
                    fn={() => setIsSearchTerm('')}
                  >
                    <MdAutorenew color='white' size={40} />
                  </BrutalCircleIconTooltip>
                </>
              ) : (
                <div className='font-medium animate-pulse'>
                  Gathering Intel...
                </div>
              )}
            </div>
          ) : (
            <div className='w-full'>
              {/* Certificates Section */}
              {sortedCertificates?.length > 0 && (
                <div className='mb-6'>
                  <button
                    type='button'
                    onClick={() => toggleCategory('CERTIFICATES')}
                    className='w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-lg bg-clemson bg-opacity-80 hover:bg-opacity-100 transition-opacity'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0'>
                        <MdWorkspacePremium size={18} color='white' />
                      </div>
                      <span className='font-bold text-white text-base sm:text-lg'>
                        Certificates
                      </span>
                      <span className='text-white/90 text-sm'>
                        ({sortedCertificates.length})
                      </span>
                    </div>
                    {isCategoryExpanded('CERTIFICATES') ? (
                      <MdExpandLess size={24} color='white' />
                    ) : (
                      <MdExpandMore size={24} color='white' />
                    )}
                  </button>
                  <AnimatePresence>
                    {isCategoryExpanded('CERTIFICATES') && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden w-full'
                      >
                        {/* Mobile: card layout */}
                        <div className='sm:hidden border border-slate-200 border-t-0'>
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
                        {/* Desktop: table */}
                        <div className='hidden sm:block overflow-x-auto'>
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
                                  <MdVideocam
                                    size={18}
                                    className='text-slate-600 inline-block'
                                  />
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Course Categories */}
              {groupedByCategory.map(({ category, items }) => {
                const catLabel =
                  category === 'COLLECTION' || category === 'COLLECTIONS'
                    ? 'Collections'
                    : category === 'ELECTIVE'
                      ? 'CPS Electives'
                      : setCategoryText(category) || category;
                const isExpanded = isCategoryExpanded(category);

                return (
                  <div key={category} className='mb-6'>
                    <button
                      type='button'
                      onClick={() => toggleCategory(category)}
                      className={`w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-t-lg ${setColorByCategoryString(
                        category,
                      )} bg-opacity-80 hover:bg-opacity-100 transition-opacity`}
                    >
                      <div className='flex items-center gap-2'>
                        {setCategoryIcon(category)}
                        <span className='font-bold text-white text-base sm:text-lg'>
                          {catLabel}
                        </span>
                        <span className='text-white/90 text-sm'>
                          ({items.length})
                        </span>
                      </div>
                      {isExpanded ? (
                        <MdExpandLess size={24} color='white' />
                      ) : (
                        <MdExpandMore size={24} color='white' />
                      )}
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className='overflow-hidden w-full'
                        >
                          {/* Mobile: card layout */}
                          <div className='sm:hidden border border-slate-200 border-t-0'>
                            {items.map((course) => (
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
                          {/* Desktop: table */}
                          <div className='hidden sm:block overflow-x-auto'>
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
                                    className='collapse sm:visible'
                                    sortKey='lessons'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('lessons')}
                                    align='center'
                                  />
                                  <th
                                    className='px-1 py-2 text-center font-semibold text-xs sm:text-sm'
                                    aria-label='Preview'
                                  >
                                    <MdVideocam
                                      size={18}
                                      className='text-slate-600 inline-block'
                                    />
                                  </th>
                                  <SortableTableHeader
                                    label='Price'
                                    sortKey='price'
                                    align='center'
                                    currentSort={isSort.value}
                                    direction={isSort.direction}
                                    onClick={() => setSort('price')}
                                  />
                                </tr>
                              </thead>
                              <tbody className='bg-white'>
                                {items.map((course) => (
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  try {
    const [courses, certificates] = await Promise.all([
      getAllLMSCourses(),
      getCertificates(),
    ]);
    const firstCardImage =
      certificates?.[0]?.seoImage || courses?.[0]?.seoImage || null;
    return {
      props: {
        courses: courses || [],
        certificates: certificates || [],
        firstCardImage,
      },
      revalidate: 60 * 60 * 4,
    };
  } catch (err) {
    console.error('getStaticProps /all_courses error:', err);
    return {
      props: { courses: [], certificates: [] },
      revalidate: 60,
    };
  }
}
