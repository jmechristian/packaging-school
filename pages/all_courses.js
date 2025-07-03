import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  MdApps,
  MdDehaze,
  MdSort,
  MdOutlineSearch,
  MdAutorenew,
  MdEmojiEvents,
  MdAutoStories,
  MdScience,
  MdFilterList,
} from 'react-icons/md';
import Meta from '../components/shared/Meta';
import { categoryMenu, updateCategoryMenu } from '../data/CategoryMenu';
import { setCategoryIcon } from '../helpers/utils';
import {
  CourseCard,
  CertCard,
  ModernCourseCard,
} from '@jmechristian/ps-component-library';
import {
  handleCategoryClick,
  getDeviceType,
  getCertificates,
  registgerCourseClick,
  registerCertificateClick,
  addCourseToWishlist,
  removeCourseFromWishlist,
} from '../helpers/api';
import LMCCourseTableItem from '../components/shared/LMCCourseTableItem';
import CertificateTableItem from '../components/shared/CertificateTableItem';
import SortToggleItem from '../components/shared/SortToggleItem';
import BrutalCircleIconTooltip from '../components/shared/BrutalCircleIconTooltip';
import { createCourseSearch } from '../src/graphql/mutations';
import { listLMSCourses } from '../src/graphql/queries';
import { setAWSUser } from '../features/auth/authslice';
import '@jmechristian/ps-component-library/dist/style.css';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deviceType = getDeviceType();
  const { location, awsUser } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [isFilters, setIsFilters] = useState([]);
  const [openSort, setOpenSort] = useState(false);
  const [isTable, setIsTable] = useState(false);
  const [isCourses, setIsCourses] = useState([]);
  const [isCertificates, setIsCertificates] = useState([]);

  useEffect(() => {
    const filter = router.query.category;

    const getCourses = async () => {
      const filter = router.query.category;
      const courses = await API.graphql({
        query: listLMSCourses,
        variables: { filter: { type: { ne: 'CUSTOMER' } }, limit: 300 },
      });

      setIsCourses(courses.data.listLMSCourses.items);
      filter &&
        setIsFilters(
          filter === 'ALL' ? [] : (prevState) => [...prevState, filter]
        );
      setIsLoading(false);
    };

    getCourses();
    getCertificates().then((certs) => {
      setIsCertificates(certs);
      setIsLoading(false);
    });
  }, [router]);

  const isInFilterArray = (value) => {
    return isFilters.includes(value);
  };

  const filterClickHandler = (value) => {
    if (value === 'ALL') {
      setIsFilters([]);
    }

    if (value != 'ALL' && isFilters.includes(value)) {
      setIsFilters([...isFilters].filter((val) => val != value));
    }

    if (value != 'ALL' && !isFilters.includes(value)) {
      setIsFilters((prevState) => [...prevState, value]);
    }
  };

  const [isSort, setIsSort] = useState({
    value: 'course id',
    direction: 'ASC',
  });

  const filtered = useMemo(() => {
    if (isFilters.length === 0) {
      return isCourses;
    }

    if (isFilters.length > 0) {
      return isCourses.filter(
        (course) =>
          course.categoryArray.some((category) =>
            isFilters.includes(category)
          ) || isFilters.includes(course.type)
      );
    }
  }, [isCourses, isFilters]);

  const sortedCourses = useMemo(() => {
    if (isSort.value === 'title' && isSort.direction === 'ASC') {
      return (
        filtered && [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      );
    }

    if (isSort.value === 'title' && isSort.direction === 'DSC') {
      return (
        filtered && [...filtered].sort((a, b) => b.title.localeCompare(a.title))
      );
    }

    if (isSort.value === 'category' && isSort.direction === 'ASC') {
      return (
        filtered &&
        [...filtered].sort((a, b) =>
          a.categoryArray[0].localeCompare(b.categoryArray[0])
        )
      );
    }

    if (isSort.value === 'category' && isSort.direction === 'DSC') {
      return (
        filtered &&
        [...filtered].sort((a, b) =>
          b.categoryArray[0].localeCompare(a.categoryArray[0])
        )
      );
    }

    if (isSort.value === 'course id' && isSort.direction === 'ASC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => a.courseId.localeCompare(b.courseId))
      );
    }

    if (isSort.value === 'course id' && isSort.direction === 'DSC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => b.courseId.localeCompare(a.courseId))
      );
    }

    if (isSort.value === 'lessons' && isSort.direction === 'DSC') {
      return filtered && [...filtered].sort((a, b) => b.lessons - a.lessons);
    }

    if (isSort.value === 'lessons' && isSort.direction === 'ASC') {
      return filtered && [...filtered].sort((a, b) => a.lessons - b.lessons);
    }

    if (isSort.value === 'hours' && isSort.direction === 'ASC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => parseFloat(a.hours) - parseFloat(b.hours))
      );
    }

    if (isSort.value === 'hours' && isSort.direction === 'DSC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => parseFloat(b.hours) - parseFloat(a.hours))
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'ASC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => parseInt(a.price) - parseInt(b.price))
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'DSC') {
      return (
        filtered &&
        [...filtered].sort((a, b) => parseInt(b.price) - parseInt(a.price))
      );
    }
  }, [filtered, isSort]);

  const sortedAndSearchedCourses = useMemo(() => {
    if (!isSearchTerm && sortedCourses) {
      return sortedCourses;
    }

    if (isSearchTerm && sortedCourses) {
      return sortedCourses.filter(
        (cour) =>
          cour.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          cour.subheadline.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          cour.courseId.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          (cour.what_learned &&
            cour.what_learned
              .toLowerCase()
              .includes(isSearchTerm.toLowerCase()))
      );
    }
  }, [isSearchTerm, sortedCourses]);

  const searchCertificates = useMemo(() => {
    return isCertificates.filter(
      (cert) =>
        cert.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        cert.courseId.toLowerCase().includes(isSearchTerm.toLowerCase())
    );
  }, [isCertificates, isSearchTerm]);

  const sortedCertificates = useMemo(() => {
    if (isSort.value === 'title' && isSort.direction === 'ASC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) => a.title.localeCompare(b.title))
      );
    }

    if (isSort.value === 'title' && isSort.direction === 'DSC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) => b.title.localeCompare(a.title))
      );
    }

    if (isSort.value === 'category' && isSort.direction === 'ASC') {
      return searchCertificates;
    }

    if (isSort.value === 'category' && isSort.direction === 'DSC') {
      return searchCertificates;
    }

    if (isSort.value === 'course id' && isSort.direction === 'ASC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) =>
          a.courseId.localeCompare(b.courseId)
        )
      );
    }

    if (isSort.value === 'course id' && isSort.direction === 'DSC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) =>
          b.courseId.localeCompare(a.courseId)
        )
      );
    }

    if (isSort.value === 'lessons' && isSort.direction === 'DSC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) => b.lessons - a.lessons)
      );
    }

    if (isSort.value === 'lessons' && isSort.direction === 'ASC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort((a, b) => a.lessons - b.lessons)
      );
    }

    if (isSort.value === 'hours' && isSort.direction === 'ASC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort(
          (a, b) => parseFloat(a.hours) - parseFloat(b.hours)
        )
      );
    }

    if (isSort.value === 'hours' && isSort.direction === 'DSC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort(
          (a, b) => parseFloat(b.hours) - parseFloat(a.hours)
        )
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'ASC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        )
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'DSC') {
      return (
        searchCertificates &&
        [...searchCertificates].sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        )
      );
    }
  }, [searchCertificates, isSort]);

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

    isSearchTerm.length > 3 &&
      sortedAndSearchedCourses.length === 0 &&
      sendSearchTracking();
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

    router.push(`${link}`);
    console.log('link', link);
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

  return (
    <>
      <Meta
        title={'Packaging School Courses'}
        description={
          'Browse the extensive catalog of Packaging School course covering subjects from Business, Design, Materials, Food and Beverage, Supply Chain and Logistics, Automotive, and Industry.'
        }
        image={'https://packschool.s3.amazonaws.com/all-courses-seoImage.webp'}
      />
      <div className='w-full max-w-7xl mx-auto px-3 xl:!px-0 py-12'>
        <div className='grid lg:!grid-cols-12 w-full gap-5 overflow-hidden'>
          <div className='lg:!col-span-3 relative'>
            <div className='flex flex-col gap-4 lg:!sticky lg:!top-20 h-fit w-full'>
              <div className='h4-base'>Browse Full Catalog</div>
              <div className='w-full h-px bg-slate-400'></div>
              <div className='w-full border border-slate-400 p-1 rounded-md'>
                <div className='flex gap-2 items-center'>
                  <input
                    type='text'
                    className='w-full flex border-none ring-0 focus:ring-0'
                    placeholder='Search Courses'
                    value={isSearchTerm}
                    onChange={(e) => setIsSearchTerm(e.target.value)}
                  />
                  <div>
                    <MdOutlineSearch size={28} />
                  </div>
                </div>
              </div>
              <div className='w-full h-px bg-slate-400'></div>
              <div className='flex justify-center lg:justify-start gap-5 relative w-full'>
                <div className='hidden lg:flex w-full lg:!flex-col gap-2 lg:!col-span-3'>
                  {categoryMenu.slice(0, 8).map((cat) => (
                    <div
                      key={cat.value}
                      className={` transition-all ease-in flex w-fit items-center justify-between cursor-pointer ${
                        isInFilterArray(cat.value) ? 'bg-white' : ''
                      }`}
                      onClick={() => filterClickHandler(cat.value)}
                    >
                      <div className={`flex items-center gap-2 w-full `}>
                        {setCategoryIcon(cat.value)}
                        <div
                          className={`${
                            isInFilterArray(cat.value)
                              ? 'text-black'
                              : ' text-black'
                          } font-medium`}
                        >
                          {cat.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* FILTER */}
                <AnimatePresence>
                  {isFilter && !openSort && (
                    <motion.div className='w-[310px] absolute top-full right-0 mt-2 bg-black px-3 py-6 z-40'>
                      <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-0.5'>
                          <div className='flex justify-between items-center w-full  border-b-2 border-b-white pb-3'>
                            <div className='text-white  font-semibold'>
                              Categories
                            </div>
                            <div
                              className='bg-white px-2 py-1.5 text-xs font-medium cursor-pointer'
                              onClick={() => {
                                setIsFilter(false);
                              }}
                            >
                              Close
                            </div>
                          </div>

                          {categoryMenu.slice(0, 8).map((cat) => (
                            <div
                              key={cat.value}
                              className={` transition-all ease-in flex w-full items-center justify-between px-2 cursor-pointer ${
                                isInFilterArray(cat.value) ? 'bg-white' : ''
                              }`}
                              onClick={() => filterClickHandler(cat.value)}
                            >
                              <div
                                className={`flex items-center gap-2 py-2  w-full `}
                              >
                                {setCategoryIcon(cat.value)}
                                <div
                                  className={`${
                                    isInFilterArray(cat.value)
                                      ? 'text-black'
                                      : ' text-white'
                                  } font-medium`}
                                >
                                  {cat.name}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='flex flex-col gap-0.5 w-full pt-5 border-t-2 border-y-white'>
                          <div
                            className={`flex w-full items-center justify-between px-2 py-2  ${
                              isInFilterArray('COLLECTION')
                                ? 'bg-brand-indigo'
                                : ''
                            }`}
                            onClick={() => filterClickHandler('COLLECTION')}
                          >
                            <div className=' flex items-center gap-3 cursor-pointer'>
                              <div>
                                <MdAutoStories color='white' size={20} />
                              </div>
                              <div className='font-semibold text-white '>
                                Collections
                              </div>
                            </div>
                          </div>
                          <div
                            className={`flex w-full items-center justify-between px-2 py-2  ${
                              isInFilterArray('ELECTIVE')
                                ? 'bg-brand-indigo'
                                : ''
                            }`}
                            onClick={() => filterClickHandler('ELECTIVE')}
                          >
                            <div
                              className='flex items-center gap-3 cursor-pointer'
                              onClick={() => filterClickHandler('ELECTIVE')}
                            >
                              <div className='pl-1'>
                                <MdEmojiEvents color='white' size={22} />
                              </div>
                              <div className='font-semibold text-white '>
                                CPS Electives
                              </div>
                            </div>
                          </div>
                          <div
                            className='flex items-center gap-3 cursor-pointer py-2'
                            onClick={() => {
                              window.open(
                                'https://packagingschool.com/isbt',
                                '_blank'
                              );
                              setIsFilter(false);
                            }}
                          >
                            <div className='pl-1'>
                              <MdScience color='white' size={22} />
                            </div>
                            <div className='font-semibold text-white leading-tight'>
                              Beverage Institute by ISBT®
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {/* SORT */}
                </AnimatePresence>
                {/* SORT */}
                <AnimatePresence>
                  {openSort && !isFilter && (
                    <div className='w-[300px] right-0 absolute top-full  bg-black px-5 py-6 z-40'>
                      <div className='flex flex-col gap-4 text-white font-medium'>
                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'course id'}
                          fn={() =>
                            setIsSort({
                              value: 'course id',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />
                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'title'}
                          fn={() =>
                            setIsSort({
                              value: 'title',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />

                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'category'}
                          fn={() =>
                            setIsSort({
                              value: 'category',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />
                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'price'}
                          fn={() =>
                            setIsSort({
                              value: 'price',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />
                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'hours'}
                          fn={() =>
                            setIsSort({
                              value: 'hours',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />
                        <SortToggleItem
                          value={isSort.value}
                          direction={isSort.direction}
                          sort={'lessons'}
                          fn={() =>
                            setIsSort({
                              value: 'lessons',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* FILTER BUTTON */}
                <div
                  className={`lg:!hidden border-black border-2 cursor-pointer h-full flex gap-1 px-5 py-2 w-fit justify-center items-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black] ${
                    !isFilter && isFilters.length > 0
                      ? 'bg-base-brand text-white'
                      : 'bg-white'
                  }`}
                  onClick={() => {
                    setOpenSort(false);
                    setIsFilter(!isFilter);
                  }}
                >
                  <MdFilterList size={24} />
                  <div className='font-semibold'>Filter</div>
                </div>

                {/* SORT BUTTON */}
                <div
                  className='lg:!hidden border-black border-2 cursor-pointer h-full flex gap-1 px-5 py-2 w-fit justify-center items-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black]'
                  onClick={() => {
                    setIsFilter(false);
                    setOpenSort(!openSort);
                  }}
                >
                  <MdSort size={24} />
                  <div className='font-semibold'>Sort</div>
                </div>
              </div>
              <div className='w-full h-px bg-slate-400'></div>
              <div className='flex flex-col  gap-2.5 w-full '>
                <div
                  className={`flex w-full items-center justify-between  ${
                    isInFilterArray('COLLECTION') ? 'bg-brand-indigo' : ''
                  }`}
                  onClick={() => filterClickHandler('COLLECTION')}
                >
                  <div className=' flex items-center gap-3 cursor-pointer'>
                    <div>
                      <MdAutoStories color='black' size={20} />
                    </div>
                    <div className='font-semibold text-slate-900 '>
                      Collections
                    </div>
                  </div>
                </div>
                <div
                  className={`flex w-full items-center justify-between py-0  ${
                    isInFilterArray('ELECTIVE') ? 'bg-brand-indigo' : ''
                  }`}
                  onClick={() => filterClickHandler('ELECTIVE')}
                >
                  <div
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => filterClickHandler('ELECTIVE')}
                  >
                    <div>
                      <MdEmojiEvents color='black' size={22} />
                    </div>
                    <div className='font-semibold text-slate-900 '>
                      CPS Electives
                    </div>
                  </div>
                </div>
                <div
                  className='flex items-center gap-3 cursor-pointer'
                  onClick={() => {
                    window.open('https://packagingschool.com/isbt', '_blank');
                    setIsFilter(false);
                  }}
                >
                  <div>
                    <MdScience color='black' size={22} />
                  </div>
                  <div className='font-semibold text-slate-900 leading-tight'>
                    Beverage Institute by ISBT®
                  </div>
                </div>
              </div>
              <div className='w-full h-px bg-slate-400'></div>
              <div className='flex flex-wrap lg:mb-5 border-b border-b-slate-900 pb-6 gap-2 md:mt-1'>
                {updateCategoryMenu.map((cat) => (
                  <div
                    key={cat.value}
                    className='flex items-center gap-2 border-slate-300 rounded border bg-neutral-200 hover:bg-base-light px-3 py-1 text-xs font-semibold cursor-pointer'
                    onClick={() => handleCurrentCategoryClick(cat.value)}
                  >
                    <div>{cat.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='grid lg:!col-span-9 w-full'>
            {sortedAndSearchedCourses && sortedAndSearchedCourses.length > 0 ? (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-0'>
                {sortedCertificates &&
                  sortedCertificates.length > 0 &&
                  [...sortedCertificates].map((cert) => (
                    <CertCard
                      cert={cert}
                      key={cert.id}
                      purchaseText={
                        cert.abbreviation === 'CPS' ||
                        cert.abbreviation === 'CMPM'
                          ? 'Apply Now'
                          : 'Enroll Now'
                      }
                      cardClickHandler={(
                        abbreviation,
                        type,
                        link,
                        applicationLink
                      ) =>
                        handleCertCardClick(
                          abbreviation,
                          type,
                          link,
                          applicationLink
                        )
                      }
                    />
                  ))}
                {sortedAndSearchedCourses &&
                  sortedAndSearchedCourses.length > 0 &&
                  [...sortedAndSearchedCourses].map((course) => (
                    <CourseCard
                      course={course}
                      key={course.id}
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
                  ))}
              </div>
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <div className='max-w-5xl py-10 w-full mx-auto justify-center items-center flex flex-col gap-3'>
                  {isSearchTerm.length > 3 ? (
                    <>
                      <div className='text-lg font-semibold'>
                        No results returned
                      </div>
                      <BrutalCircleIconTooltip
                        tooltip={'Reset'}
                        bgColor={'bg-base-brand'}
                        fn={() => {
                          setIsSearchTerm('');
                        }}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
