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
import { CourseCard } from '@jmechristian/ps-component-library';
import {
  handleCategoryClick,
  getDeviceType,
  getCertificates,
  registgerCourseClick,
} from '../helpers/api';
import LMCCourseTableItem from '../components/shared/LMCCourseTableItem';
import CertificateTableItem from '../components/shared/CertificateTableItem';
import SortToggleItem from '../components/shared/SortToggleItem';
import BrutalCircleIconTooltip from '../components/shared/BrutalCircleIconTooltip';
import { createCourseSearch } from '../src/graphql/mutations';
import { listLMSCourses } from '../src/graphql/queries';
import '@jmechristian/ps-component-library/dist/style.css';

const Page = () => {
  const router = useRouter();

  const { location } = useSelector((state) => state.auth);

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
    };

    getCourses();
    getCertificates().then((certs) => {
      setIsCertificates(certs);
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
        cert.description.toLowerCase().includes(isSearchTerm.toLowerCase())
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
    await registgerCourseClick(
      course.id,
      router.asPath,
      location,
      course.slug,
      'GRID'
    );

    course.altLink
      ? router.push(course.altLink)
      : router.push(
          `/${
            course.type && course.type === 'COLLECTION'
              ? 'collections'
              : 'courses'
          }/${course.slug}`
        );
  };

  const cardPurchaseHandler = async (id, link) => {
    await registgerCourseClick(id, router.asPath, location, link, 'GRID');

    router.push(link);
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
      <div className='container-base px-3 xl:px-0'>
        <div className='w-full flex flex-col gap-0'>
          {/* HEADING */}
          <div className='w-full pb-5 border-b-4 border-b-black flex justify-between items-center'>
            <div className='h2-base'>Browse All Courses</div>
            <div className='grid grid-cols-2 w-fit'>
              <div
                className={`w-10 h-10 ${
                  isTable ? 'bg-black' : 'bg-neutral-300'
                } flex items-center justify-center cursor-pointer`}
                onClick={() => setIsTable(true)}
              >
                <MdDehaze color={isTable ? 'white' : 'gray'} size={24} />
              </div>
              <div
                className={`w-10 h-10 ${
                  isTable ? 'bg-neutral-300' : 'bg-black'
                } flex items-center justify-center cursor-pointer`}
                onClick={() => setIsTable(false)}
              >
                <MdApps color={isTable ? 'gray' : 'white'} size={24} />
              </div>
            </div>
          </div>
          {/* SEARCH - FILTER */}
          <div className='grid grid-cols-3 lg:mb-5 border-b-2 border-b-black py-6 gap-2.5'>
            {/* SEARCH */}
            <div className='w-full col-span-3 lg:!col-span-2 border-2 border-black p-1'>
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
            <div className='col-span-3 lg:col-span-1 flex justify-end gap-5 relative w-full'>
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
                            <div className='pl-1'>
                              <MdAutoStories color='white' size={20} />
                            </div>
                            <div className='font-semibold text-white '>
                              Collections
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex w-full items-center justify-between px-2 py-2  ${
                            isInFilterArray('ELECTIVE') ? 'bg-brand-indigo' : ''
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
              {/* CLEAR */}
              {isFilters.length > 0 ? (
                <div
                  className='h-full flex justify-center text-center leading-none items-center px-4 text-white bg-brand-red border-2 border-black cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black] text-sm'
                  onClick={() => filterClickHandler('ALL')}
                >
                  Clear Filters
                </div>
              ) : (
                <></>
              )}
              {/* FILTER BUTTON */}
              <div
                className={`border-black border-2 cursor-pointer h-full flex gap-1 px-5 py-2 w-48 justify-center items-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black] ${
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
                className='lg:hidden border-black border-2 cursor-pointer h-full flex gap-1 px-5 py-2 w-48 justify-center items-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black]'
                onClick={() => {
                  setIsFilter(false);
                  setOpenSort(!openSort);
                }}
              >
                <MdSort size={24} />
                <div className='font-semibold'>Sort</div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap lg:mb-5 border-b-2 border-b-black pb-6 gap-2.5 mt-5 md:mt-0'>
            {updateCategoryMenu.map((cat) => (
              <div
                key={cat.value}
                className='flex items-center gap-2 border-black border bg-neutral-200 hover:bg-base-light px-2 py-1.5 text-sm font-semibold cursor-pointer'
                onClick={() => handleCurrentCategoryClick(cat.value)}
              >
                <div>{cat.name}</div>
              </div>
            ))}
          </div>

          {/* COURSES */}
          {sortedAndSearchedCourses &&
          sortedAndSearchedCourses.length > 0 &&
          isTable ? (
            <div className='flex flex-col gap-2'>
              <div className='hidden lg:grid lg:grid-cols-12 content-center gap-5 divide-x-black w-full px-2 py-2'>
                <div className='col-span-4'>
                  <div className='grid grid-cols-4'>
                    <div
                      className={`${
                        isSort.value === 'course id' ? 'underline' : ''
                      } cursor-pointer col-span-1 text-sm font-semibold`}
                      onClick={() =>
                        setIsSort({
                          value: 'course id',
                          direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                        })
                      }
                    >
                      Course Id
                    </div>
                    <div className='text-sm font-semibold col-span-3'>
                      <div>
                        <span
                          className={`${
                            isSort.value === 'category' ? 'underline' : ''
                          } cursor-pointer`}
                          onClick={() =>
                            setIsSort({
                              value: 'category',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        >
                          Category
                        </span>{' '}
                        /{' '}
                        <span
                          className={`${
                            isSort.value === 'title' ? 'underline' : ''
                          } cursor-pointer`}
                          onClick={() =>
                            setIsSort({
                              value: 'title',
                              direction:
                                isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                            })
                          }
                        >
                          Title
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-1'>
                  <div className='text-sm font-semibold cursor-pointer'>
                    <div
                      className={`${
                        isSort.value === 'price' ? 'underline' : ''
                      } cursor-pointer`}
                      onClick={() =>
                        setIsSort({
                          value: 'price',
                          direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                        })
                      }
                    >
                      Price
                    </div>
                  </div>
                </div>
                <div className='col-span-5'>
                  <div className='text-sm font-semibold'>
                    <div>Description</div>
                  </div>
                </div>
                <div className='col-span-2'>
                  <div className='grid grid-cols-3 w-full gap-3 text-center'>
                    <div className='text-sm font-semibold cursor-pointer'>
                      <div
                        className={`${
                          isSort.value === 'hours' ? 'underline' : ''
                        } cursor-pointer`}
                        onClick={() =>
                          setIsSort({
                            value: 'hours',
                            direction:
                              isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                          })
                        }
                      >
                        Hours
                      </div>
                    </div>
                    <div className='text-sm font-semibold cursor-pointer'>
                      <div
                        className={`${
                          isSort.value === 'lessons' ? 'underline' : ''
                        } cursor-pointer`}
                        onClick={() =>
                          setIsSort({
                            value: 'lessons',
                            direction:
                              isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                          })
                        }
                      >
                        Lessons
                      </div>
                    </div>

                    <div className='text-sm font-semibold'>
                      <div className='lg:hidden xl:block'>Preview</div>
                    </div>
                    <div className='text-sm font-semibold'></div>
                  </div>
                </div>
              </div>
              <div className='grid lg:hidden grid-cols-6 content-center gap-5 divide-x-black w-full px-2 py-2'>
                <div
                  className={`${
                    isSort.value === 'course id' ? 'underline' : ''
                  } cursor-pointer col-span-1 text-xs font-semibold`}
                  onClick={() =>
                    setIsSort({
                      value: 'course id',
                      direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                    })
                  }
                >
                  Id
                </div>
                <div className='text-xs font-semibold col-span-2'>
                  <span
                    className={`${
                      isSort.value === 'category' ? 'underline' : ''
                    } cursor-pointer `}
                    onClick={() =>
                      setIsSort({
                        value: 'category',
                        direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                      })
                    }
                  >
                    Category
                  </span>{' '}
                  /{' '}
                  <span
                    className={`${
                      isSort.value === 'title' ? 'underline' : ''
                    } cursor-pointer`}
                    onClick={() =>
                      setIsSort({
                        value: 'title',
                        direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                      })
                    }
                  >
                    Title
                  </span>
                </div>
                <div className='col-span-3 w-full grid grid-cols-3 content-center text-right'>
                  <div
                    className={`${
                      isSort.value === 'hours' ? 'underline' : ''
                    } cursor-pointer col-span-1 text-xs font-semibold`}
                    onClick={() =>
                      setIsSort({
                        value: 'hours',
                        direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                      })
                    }
                  >
                    Hours
                  </div>
                  <div
                    className={`${
                      isSort.value === 'lessons' ? 'underline' : ''
                    } cursor-pointer col-span-1 text-xs font-semibold`}
                    onClick={() =>
                      setIsSort({
                        value: 'lessons',
                        direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                      })
                    }
                  >
                    Lessons
                  </div>
                  <div
                    className={`${
                      isSort.value === 'price' ? 'underline' : ''
                    } cursor-pointer col-span-1 text-xs font-semibold`}
                    onClick={() =>
                      setIsSort({
                        value: 'price',
                        direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                      })
                    }
                  >
                    Price
                  </div>
                </div>
              </div>
              {sortedCertificates &&
              sortedCertificates.length > 0 &&
              isTable ? (
                <div className='flex flex-col gap-2'>
                  {sortedCertificates.map((cert) => (
                    <CertificateTableItem certificate={cert} key={cert.id} />
                  ))}
                </div>
              ) : (
                <></>
              )}
              {sortedAndSearchedCourses.map((course, i) => (
                <LMCCourseTableItem course={course} key={course.id} />
              ))}
            </div>
          ) : sortedAndSearchedCourses && !isTable ? (
            <div className='grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-y-10 mt-5'>
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
    </>
  );
};

export default Page;
