import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  MdSearch,
  MdOutlineTimer,
  MdOutlineBook,
  MdDownloadForOffline,
} from 'react-icons/md';
import { getCourseByID, getAllLearningOfTheMonths } from '../../helpers/api';
import {
  BoltIcon,
  MinusIcon,
  PlusIcon,
  AcademicCapIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});
import VideoPlayer from '../../components/VideoPlayer';
import { cumminsLevel1, cumminsLevel2, cumminsLevel3 } from '../../helpers/api';

const cpsExam = {
  courseId: 'APC-A10',
  title: 'APC Final Exam',
  price: 399,
  hours: 10,
  lessons: 10,
  subheadline:
    'Once you have completed all courses marked with the code APC, you are eligible to take the final exam. You can access the exam here to earn your official certificate of completion.',
};

const cpsExam2 = {
  courseId: 'CPS-C13',
  title: 'CPS Final Exam',
  price: 399,
  hours: 10,
  lessons: 10,
  subheadline:
    'Once you have completed all courses marked with the code CPS, you are eligible to take the final exam. You can access the exam here to earn your official certificate of completion.',
};

const LOTMCard = ({ lesson }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
      <div className='flex flex-col'>
        <div
          className='w-full aspect-[16/9] bg-black bg-cover bg-center'
          style={{
            backgroundImage: `url(${lesson.seoImage})`,
          }}
        ></div>
        <div className='w-full flex flex-col gap-2 px-3 py-2'>
          <div className='font-semibold leading-tight text-cummins-red w-full h-16 mt-1 line-clamp-3  max-w-[90%]'>
            <span className='text-gray-700 leading-tight'>{lesson.title}</span>
          </div>
          <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-gray-700'>
            <div className='font-semibold text-xs'>
              {formatDate(lesson.createdAt)}
            </div>
            <div className='font-semibold flex items-center gap-1'>
              <MdOutlineTimer />
            </div>
          </div>
          <div className='text-xs text-gray-700 h-20 mb-2 line-clamp-5'>
            {lesson.subhead}
          </div>
          <div
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
            onClick={() => {
              window.open(`/lessons/${lesson.slug}`, '_blank');
            }}
          >
            Read Lesson
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await getCourseByID(course);
      setCourseData(data);
    };
    fetchCourseData();
  }, [course]);

  return (
    <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
      <div className='flex flex-col'>
        <div className='w-full aspect-[16/9] bg-black'>
          <VideoPlayer
            videoEmbedLink={courseData && courseData.preview}
            light
          />
        </div>
        <div className='w-full flex flex-col gap-2 px-3 py-2'>
          <div className='font-semibold leading-tight text-cummins-red w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
            {courseData && courseData.courseId}{' '}
            <span className='text-gray-700'>
              {courseData && courseData.title}
            </span>
          </div>
          <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
            <div className='flex items-center gap-1'>
              <div className='font-semibold line-through text-gray-400'>
                ${courseData && courseData.price}
              </div>
              <div className='font-semibold'>$0</div>
            </div>

            <div className='font-semibold flex items-center gap-1'>
              {courseData && courseData.hours}
              <MdOutlineTimer /> / {courseData && courseData.lessons}{' '}
              <MdOutlineBook />
            </div>
          </div>
          <div className='text-xs text-gray-700 h-20 mb-2 line-clamp-5'>
            {courseData && courseData.shortDescription
              ? courseData.shortDescription
              : courseData && courseData.subheadline}
          </div>
          <div
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
            onClick={() => {
              window.open(
                courseData && courseData.link + '?coupon=cummins2025',
                '_blank'
              );
            }}
          >
            Begin Course
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const faqs = [
    {
      id: 1,
      question: 'Who is my Cummins contact?',
      answer:
        'If you have any questions regarding curriculum, reach out to todd.farwell@cummins.com.',
    },
    {
      id: 2,
      question: 'What if I run into technical difficulties?',
      answer:
        'We are happy to help at the Packaging School—email info@packagingschool.com.',
    },
    {
      id: 3,
      question: 'How do I sign up?',
      answer:
        'Refer to the slide deck / PDF at the top of the page or email info@packagingschool.com.',
    },
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');
  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [learningOfTheMonths, setLearningOfTheMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchLearningOfTheMonths = async () => {
      const data = await getAllLearningOfTheMonths();
      setLearningOfTheMonths(data);
    };
    fetchLearningOfTheMonths();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Add filtering before pagination
  const filteredItems = learningOfTheMonths.filter(
    (lesson) =>
      lesson.title
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase()) ||
      lesson.subhead
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase())
  );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className='w-full flex flex-col lg:pt-10 pb-40'>
      <Head>
        <title>Cummins | The Packaging School</title>
      </Head>
      <div className='w-full max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:items-center relative'>
        <div
          className='rounded-lg h-[180px] lg:h-[240px] row-span-full col-start-1 col-span-9 lg:self-center flex items-center relative'
          style={{
            backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_bw.png')`,
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className='absolute inset-0 bg-cummins-red opacity-90'></div>
          <div className='w-full lg:w-1/2 flex justify-center items-center gap-5 px-10 relative z-10'>
            <div className='w-[100px] lg:w-[180px]'>
              <Image
                src={
                  'https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_white.png'
                }
                alt='cummins-logo'
                width={360}
                height={332}
              />
            </div>
            <div className='text-white h2-base'>Welcome!</div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 lg:self-end lg:absolute lg:top-[30%]'>
          <div className='w-full aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={
                'https://docs.google.com/presentation/d/1LVCGrz_XtCdSzFFJPs9f8wD1CNlhMabkksLBFRTmH8U/edit?disco=AAABkR46kBw&slide=id.p#slide=id.p'
              }
              position={1}
              showControls
              loop
            />
            <div
              className='flex items-center gap-1 justify-center mt-2 cursor-pointer'
              onClick={() => {
                window.open(
                  'https://packschool.s3.us-east-1.amazonaws.com/Cummins-Library-Insturctions.pdf',
                  '_blank'
                );
              }}
            >
              <div className='text-gray-700'>Download as PDF</div>
              <MdDownloadForOffline className='text-gray-700' size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 pl-4 pr-4 lg:pr-0 lg:pl-5 pt-8 pb-16 border-b border-gray-300'>
        <div className='w-full flex flex-col gap-5 mt-10 lg:mt-0'>
          <div className='max-w-xl w-full text-gray-700'>
            Cummins is deeply committed to investing in the growth and
            development of its employees, recognizing that continuous learning
            is essential to innovation and long-term success. As part of this
            commitment, Cummins has partnered with the Packaging School to
            provide team members with access to industry-leading packaging
            education. These training programs are designed to meet a wide range
            of learning needs—from foundational knowledge to advanced
            expertise—and cover key areas such as packaging materials,
            industrial processes, design, management, and industry trends. With
            more than 4,000 continuously updated learning assets, this
            initiative supports the employees of Cummins in building critical
            packaging skills and advancing their careers.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-5'>
          <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
            Packaging Know-How Level 1
          </div>
          <div className='relative flex items-center'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cumminsLevel1.map((course) => (
            <CourseCard key={course} course={course} />
          ))}
          <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
            <div className='flex flex-col'>
              <div
                className='w-full aspect-[16/9] bg-cummins-red bg-cover bg-center relative flex flex-col items-center justify-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_bw.png')`,
                  backgroundSize: '200px',
                  backgroundRepeat: 'repeat',
                }}
              >
                <div className='absolute inset-0 bg-cummins-red opacity-90'></div>
                <div className='w-[100px]'>
                  <Image
                    src={
                      'https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_white.png'
                    }
                    alt='cummins-logo'
                    width={360}
                    height={332}
                  />
                </div>
              </div>
              <div className='w-full flex flex-col gap-2 px-3 py-2'>
                <div className='font-semibold leading-tight text-cummins-red w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
                  {cpsExam.courseId}{' '}
                  <span className='text-gray-700'>{cpsExam.title}</span>
                </div>
                <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
                  <div className='flex items-center gap-1'>
                    <div className='font-semibold line-through text-gray-400'>
                      ${cpsExam.price}
                    </div>
                    <div className='font-semibold'>$0</div>
                  </div>
                  <div className='font-semibold flex items-center gap-1'>
                    {cpsExam.hours}
                    <MdOutlineTimer /> / {cpsExam.lessons} <MdOutlineBook />
                  </div>
                </div>
                <div className='text-xs text-gray-700 h-20 mb-2'>
                  {cpsExam.subheadline}
                </div>
                <div
                  className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
                  onClick={() => {
                    window.open(
                      'https://learn.packagingschool.com/enroll/623239?price_id=659644&coupon=cummins2025',
                      '_blank'
                    );
                  }}
                >
                  Begin Course
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-5'>
          <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
            Packaging Know-How Level 2
          </div>
          <div className='relative flex items-center'>
            <input
              type='text'
              value={searchQuery2}
              onChange={(e) => setSearchQuery2(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cumminsLevel2.map((course) => (
            <CourseCard key={course} course={course} />
          ))}
          {/* <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
            <div className='flex flex-col'>
              <div
                className='w-full aspect-[16/9] bg-cummins-red bg-cover bg-center relative flex flex-col items-center justify-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_bw.png')`,
                  backgroundSize: '200px',
                  backgroundRepeat: 'repeat',
                }}
              >
                <div className='absolute inset-0 bg-cummins-red opacity-90'></div>
                <div className='w-[100px]'>
                  <Image
                    src={
                      'https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_white.png'
                    }
                    alt='cummins-logo'
                    width={360}
                    height={332}
                  />
                </div>
              </div>
              <div className='w-full flex flex-col gap-2 px-3 py-2'>
                <div className='font-semibold leading-tight text-cummins-red w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
                  {cpsExam2.courseId}{' '}
                  <span className='text-gray-700'>{cpsExam2.title}</span>
                </div>
                <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
                  <div className='flex items-center gap-1'>
                    <div className='font-semibold line-through text-gray-400'>
                      ${cpsExam2.price}
                    </div>
                    <div className='font-semibold'>$0</div>
                  </div>
                  <div className='font-semibold flex items-center gap-1'>
                    {cpsExam2.hours}
                    <MdOutlineTimer /> / {cpsExam2.lessons} <MdOutlineBook />
                  </div>
                </div>
                <div className='text-xs text-gray-700 h-20 mb-2'>
                  {cpsExam2.subheadline}
                </div>
                <div
                  className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
                  onClick={() => {
                    window.open(
                      'https://learn.packagingschool.com/enroll/235882?price_id=242074&coupon=cummins2025',
                      '_blank'
                    );
                  }}
                >
                  Begin Course
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-5'>
          <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
            Packaging Know-How Level 3
          </div>
          <div className='relative flex items-center'>
            <input
              type='text'
              value={searchQuery3}
              onChange={(e) => setSearchQuery3(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cumminsLevel3.map((course) => (
            <CourseCard key={course} course={course} />
          ))}
          <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
            <div className='flex flex-col'>
              <div
                className='w-full aspect-[16/9] bg-cummins-red bg-cover bg-center relative flex flex-col items-center justify-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_bw.png')`,
                  backgroundSize: '200px',
                  backgroundRepeat: 'repeat',
                }}
              >
                <div className='absolute inset-0 bg-cummins-red opacity-90'></div>
                <div className='w-[100px]'>
                  <Image
                    src={
                      'https://packschool.s3.us-east-1.amazonaws.com/corporate_ppt_white.png'
                    }
                    alt='cummins-logo'
                    width={360}
                    height={332}
                  />
                </div>
              </div>
              <div className='w-full flex flex-col gap-2 px-3 py-2'>
                <div className='font-semibold leading-tight text-cummins-red w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
                  {cpsExam2.courseId}{' '}
                  <span className='text-gray-700'>{cpsExam2.title}</span>
                </div>
                <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
                  <div className='flex items-center gap-1'>
                    <div className='font-semibold line-through text-gray-400'>
                      ${cpsExam2.price}
                    </div>
                    <div className='font-semibold'>$0</div>
                  </div>
                  <div className='font-semibold flex items-center gap-1'>
                    {cpsExam2.hours}
                    <MdOutlineTimer /> / {cpsExam2.lessons} <MdOutlineBook />
                  </div>
                </div>
                <div className='text-xs text-gray-700 h-20 mb-2'>
                  {cpsExam2.subheadline}
                </div>
                <div
                  className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
                  onClick={() => {
                    window.open(
                      'https://learn.packagingschool.com/enroll/235882?price_id=242074&coupon=cummins2025',
                      '_blank'
                    );
                  }}
                >
                  Begin Course
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
        <div className='w-full flex items-center justify-between'>
          <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
            Your Learning of the Month
          </div>
          <div className='relative flex items-center'>
            <input
              type='text'
              value={learningOfTheMonthQuery}
              onChange={(e) => setLearningOfTheMonthQuery(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {currentItems.map((lesson) => (
            <LOTMCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-4 mt-8'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-cummins-red'
              } transition-all duration-300`}
            >
              ←
            </button>
            <span className='text-gray-700'>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-cummins-red'
              } transition-all duration-300`}
            >
              →
            </button>
          </div>
        )}
      </div>
      <div className='mx-auto divide-y divide-gray-900/10 w-full max-w-7xl bg-[#f4f4f5] rounded-lg p-10 mt-10'>
        <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
          Frequently asked questions
        </h2>
        <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
          {faqs.map((faq) => (
            <Disclosure as='div' key={faq.question} className='pt-6'>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                      <span className='text-base font-semibold leading-7'>
                        {faq.question}
                      </span>
                      <span className='ml-6 flex h-7 items-center'>
                        {open ? (
                          <MinusIcon className='h-6 w-6' aria-hidden='true' />
                        ) : (
                          <PlusIcon className='h-6 w-6' aria-hidden='true' />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                    <p className='text-base leading-7 text-gray-600'>
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Page;
