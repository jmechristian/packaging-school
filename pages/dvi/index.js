import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MdSearch, MdOutlineTimer, MdOutlineBook } from 'react-icons/md';
import { getCourseByID, getAllLearningOfTheMonths } from '../../helpers/api';
const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});
import VideoPlayer from '../../components/VideoPlayer';
import { cpsCourses } from '../../helpers/api';

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
        <div className='w-full aspect-[16/9] bg-black'></div>
        <div className='w-full flex flex-col gap-2 px-3 py-2'>
          <div className='font-semibold leading-tight text-[#fd3841] w-full h-16 mt-1 line-clamp-3'>
            <span className='text-gray-700'>{lesson.title}</span>
          </div>
          <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
            <div className='font-semibold'>{formatDate(lesson.createdAt)}</div>
            <div className='font-semibold flex items-center gap-1'>
              <MdOutlineTimer />
            </div>
          </div>
          <div className='text-xs text-gray-700 h-20 mb-2'>
            {lesson.subheadline}
          </div>
          <div className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#fd3841] transition-all duration-300'>
            Begin Lesson
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
          <div className='font-semibold leading-tight text-[#fd3841] w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
            {courseData && courseData.courseId}{' '}
            <span className='text-gray-700'>
              {courseData && courseData.title}
            </span>
          </div>
          <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
            <div className='font-semibold'>
              ${courseData && courseData.price}
            </div>
            <div className='font-semibold flex items-center gap-1'>
              {courseData && courseData.hours}
              <MdOutlineTimer /> / {courseData && courseData.lessons}{' '}
              <MdOutlineBook />
            </div>
          </div>
          <div className='text-xs text-gray-700 h-20 mb-2'>
            {courseData && courseData.subheadline}
          </div>
          <div className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#fd3841] transition-all duration-300'>
            Begin Course
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [learningOfTheMonths, setLearningOfTheMonths] = useState([]);

  useEffect(() => {
    const fetchLearningOfTheMonths = async () => {
      const data = await getAllLearningOfTheMonths();
      setLearningOfTheMonths(data);
    };
    fetchLearningOfTheMonths();
  }, []);
  return (
    <div className='w-full flex flex-col pt-10 pb-40'>
      <div className='w-full max-w-7xl mx-auto grid grid-cols-12 items-center relative'>
        <div
          className='bg-[#fd3841] rounded-lg h-[240px] row-span-full col-start-1 col-span-9 self-center bg-repeat flex items-center'
          //   style={{
          //     backgroundImage:
          //       'url(https://packschool.s3.us-east-1.amazonaws.com/dvi-logo-96.png)',
          //   }}
        >
          <div className='w-1/2 flex flex-col gap-5 px-16'>
            <div className='text-4xl font-bold text- tracking-wide'>
              Willkommen!
            </div>
            <div className='w-[380px]'>
              <Image
                src={
                  'https://packschool.s3.us-east-1.amazonaws.com/dvi-logo-96.png'
                }
                alt='dvi-logo'
                width={698}
                height={134}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 self-end absolute top-1/3'>
          <div className='w-full aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={
                'https://docs.google.com/presentation/d/1njv_Q25JTyNzsDVjP7GqIq_U3Udfg7DSpgoBP-gqLWg/edit?usp=sharing'
              }
              position={1}
              showControls
              loop
            />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-16 border-b border-gray-300'>
        <div className='max-w-lg w-full text-xl text-gray-700'>
          Die Packaging School bietet erstklassige Ausbildung für
          Verpackungsprofis. Unsere Programme umfassen Materialwissenschaften,
          industrielle Prozesse, Design und Management. Wir aktualisieren
          kontinuierlich unsere über 4.000 Lernressourcen. In Zusammenarbeit mit
          DVI bieten wir unseren Mitarbeitern umfassende Schulungen an, um ihre
          Fähigkeiten und Kenntnisse zu erweitern.
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
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd3841] focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid grid-cols-4 gap-8'>
          {cpsCourses.map((course) => (
            <CourseCard key={course} course={course} />
          ))}
          <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
            <div className='flex flex-col'>
              <div
                className='w-full aspect-[16/9] bg-black bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url(https://packschool.s3.us-east-1.amazonaws.com/final-exam-dvi.png)',
                }}
              ></div>
              <div className='w-full flex flex-col gap-2 px-3 py-2'>
                <div className='font-semibold leading-tight text-[#fd3841] w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
                  {cpsExam.courseId}{' '}
                  <span className='text-gray-700'>{cpsExam.title}</span>
                </div>
                <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
                  <div className='font-semibold'>${cpsExam.price}</div>
                  <div className='font-semibold flex items-center gap-1'>
                    {cpsExam.hours}
                    <MdOutlineTimer /> / {cpsExam.lessons} <MdOutlineBook />
                  </div>
                </div>
                <div className='text-xs text-gray-700 h-20 mb-2'>
                  {cpsExam.subheadline}
                </div>
                <div className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#fd3841] transition-all duration-300'>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd3841] focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid grid-cols-4 gap-8'>
          {learningOfTheMonths.map((lesson) => (
            <LOTMCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
