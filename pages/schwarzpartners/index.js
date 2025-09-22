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
import { cpsCourses, createNewOrder } from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const cpsExam = {
  courseId: 'CPS-C13',
  title: 'CPS Final Exam',
  price: 399,
  hours: 10,
  lessons: 10,
  subheadline: 'Test your knowledge with our comprehensive exam.',
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
          <div className='font-semibold leading-tight text-[#37528a] w-full h-16 mt-1 line-clamp-3  max-w-[90%]'>
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
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#37528a] transition-all duration-300'
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
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const router = useRouter();
  useEffect(() => {
    const fetchCourseData = async () => {
      const data = await getCourseByID(course);
      setCourseData(data);
    };
    fetchCourseData();
  }, [course]);

  const orderHandler = async () => {
    const orderId = await createNewOrder({
      courseDescription: courseData.subheadline,
      courseDiscount: 100,
      courseImage: courseData.seoImage,
      courseName: courseData.title,
      courseLink: `${courseData.link}?coupon=schwarzpartners2025`,
      total: courseData.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        `${courseData.link}?coupon=schwarzpartners2025`,
        `${courseData.link}?coupon=schwarzpartners2025`
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

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
          <div className='font-semibold leading-tight text-[0.9rem] text-[#37528a] w-full h-10 mt-1 line-clamp-3 max-w-[80%]'>
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
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#37528a] transition-all duration-300'
            onClick={orderHandler}
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
      question: 'Who is my Church & Dwight contact?',
      answer:
        'If you have any questions regarding curriculum, reach out to sparks@schwarzpartners.com.',
    },
    {
      id: 2,
      question: 'What if I run into technical difficulties?',
      answer:
        'We are happy to help at The Packaging School—email info@packagingschool.com.',
    },
    {
      id: 3,
      question: 'How do I sign up?',
      answer:
        'Refer to the slide deck / PDF at the top of the page or email info@packagingschool.com.',
    },
  ];
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className='w-full flex flex-col pt-10 pb-40'>
      <Head>
        <title>Schwarz Partners x Sparks | The Packaging School</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>

      <div className='w-full max-w-7xl mx-auto grid grid-cols-12 items-center relative'>
        <div
          className='bg-[#37528a] rounded-lg h-[240px] row-span-full col-start-1 col-span-9 self-center bg-cover bg-center flex items-center'
          style={{
            backgroundImage:
              'url(https://packschool.s3.us-east-1.amazonaws.com/schwarz-back.png)',
          }}
        >
          <div className='w-1/2 flex flex-col gap-0 pl-16'>
            <div className='text-[#fac02f] h2-base -mb-4'>Welcome</div>
            <div className='w-[266px]'>
              <Image
                src={
                  'https://packschool.s3.us-east-1.amazonaws.com/sparks-white-color.png'
                }
                alt='schwarz-partners-logo'
                width={500}
                height={214}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 self-end absolute top-[20%]'>
          <div className='w-full aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={
                'https://docs.google.com/presentation/d/1_yUhjkjRwe-xtE4HPsmPgcWY2Tf8SBtieO9APsGR1fc/edit?usp=drivesdk'
              }
              position={1}
              showControls
              loop
            />
            <div
              className='flex items-center gap-1 justify-center mt-2 cursor-pointer'
              onClick={() => {
                window.open(
                  'https://packschool.s3.us-east-1.amazonaws.com/Schwarz-Partners-Library-Instructions.pdf',
                  '_blank'
                );
              }}
            >
              <div className='text-gray-700 text-sm font-semibold'>
                Download as PDF
              </div>
              <MdDownloadForOffline className='text-gray-700' size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 pt-8 pb-16 border-b border-gray-300'>
        <div className='w-full flex flex-col gap-5 mt-12 lg:mt-6'>
          <div className='max-w-xl w-full text-gray-700'>
            Schwarz Partners is deeply committed to investing in the growth and
            development of our employees, recognizing that continuous learning
            is essential to innovation and long-term success.
          </div>
          <div className='max-w-xl w-full text-gray-700'>
            As an extension of our SPARKS program, we are proud to partner with
            The Packaging School to offer our packaging team access to
            industry-leading education tailored to their unique roles and needs.
          </div>
          <div className='max-w-4xl w-full text-gray-700'>
            This program is designed to support our packaging professionals at
            every stage of their career, whether they’re building foundational
            knowledge or exploring more specialized areas. The curriculum covers
            essential topics including packaging materials, industrial
            processes, design, supply chain, sustainability, and emerging
            industry trends.
          </div>
          <div className='max-w-4xl w-full text-gray-700'>
            With access to over 4,000 continuously updated learning assets, this
            initiative empowers our team to sharpen their skills, stay ahead of
            industry changes, become better stewards, and continue growing
            smarter—both personally and professionally—at Schwarz Partners.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
        <div className='w-full flex items-center justify-between'>
          <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
            Your Courses
          </div>
          <div className='relative flex items-center'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37528a] focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='w-full flex items-center justify-center max-w-7xl mx-auto bg-[#829fd0] px-3'>
          <div className='text-white py-1.5 rounded font-bold'>
            Company funds have enabled this course access —you may not enroll
            anonymously or with private email addresses
          </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cpsCourses.map((course) => (
            <CourseCard key={course} course={course} />
          ))}
          <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
            <div className='flex flex-col'>
              <div
                className='w-full aspect-[16/9] bg-black bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url(https://packschool.s3.us-east-1.amazonaws.com/sparks-final-exam.png)',
                }}
              ></div>
              <div className='w-full flex flex-col gap-2 px-3 py-2'>
                <div className='font-semibold leading-tight text-[#37528a] w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
                  {cpsExam.courseId}{' '}
                  <span className='text-gray-700 text-[0.9rem]'>
                    {cpsExam.title}
                  </span>
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
                  className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#37528a] transition-all duration-300'
                  onClick={() => {
                    window.open(
                      'https://learn.packagingschool.com/enroll/235882?price_id=242074&coupon=schwarzpartners2025',
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
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37528a] focus:border-transparent'
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
                  : 'text-gray-700 hover:text-[#37528a]'
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
                  : 'text-gray-700 hover:text-[#37528a]'
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
