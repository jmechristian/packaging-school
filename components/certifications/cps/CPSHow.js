import React, { useState, useEffect } from 'react';
import FadeIn from '../../../helpers/FadeIn';
import { SectionHeading } from '../../shared/SectionHeading';
import { getCPSCourses } from '../../../helpers/api';
import { useSelector } from 'react-redux';
import CourseCard from '../../course-card/CourseCard';

const CPSHow = () => {
  const [cpsCourses, setCpsCourses] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCourses = async () => {
      const courses = await getCPSCourses();
      setCpsCourses(courses);
    };
    getCourses();
  }, []);

  return (
    <section id='how'>
      <div className='container-7xl py-32 flex flex-col gap-24'>
        <div className='grid lg:grid-cols-2'>
          <div className='flex flex-col gap-16'>
            <FadeIn>
              <SectionHeading number='2'>How does it work?</SectionHeading>
            </FadeIn>
            <FadeIn>
              <div className='flex flex-col gap-9'>
                <div className='flex flex-col'>
                  <div className='font-bold text-4xl lg:text-5xl'>
                    <h2 className='dark:text-white'>
                      Keep Up With Innovation.
                    </h2>
                  </div>
                  <div className='text-gray-500 font-bold text-4xl lg:text-5xl'>
                    Learn The Market.
                  </div>
                </div>
                <div className='text-xl text-gray-700 dark:text-gray-500 max-w-prose'>
                  Enroll at your convenience and enjoy{' '}
                  <span className='dark:text-white font-bold'>
                    uninterrupted 24/7 access for a full 6-months
                  </span>
                  , allowing you to learn at your own pace and convenience. If
                  you have any contact with the packaging process, our program
                  will raise your packaging IQ.
                </div>
                <div className='text-xl text-gray-700 dark:text-gray-500 max-w-prose'>
                  Students who enroll in the Certificate of Packaging Science
                  now have their{' '}
                  <span className='dark:text-white font-bold'>
                    choice of any elective
                  </span>{' '}
                  to add to their curriculum at no extra charge. If you’re
                  interested in design checkout our SolidWorks – Basics course,
                  if you have an interest in the business side of things, maybe
                  Project Management Essentials is right for you! You will be
                  able to indicate which elective you’d like to add in your
                  application. If you’re not sure yet, you can choose to add
                  your elective at a later date.
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <div className='w-full h-full justify-center items-center  pt-16 px-24 hidden lg:flex'>
              <div
                className='bg-cover bg-center w-full h-full rounded-lg'
                style={{
                  backgroundImage: `url("https://packschool.s3.amazonaws.com/chris-marsh-psgrad02.webp")`,
                }}
              ></div>
            </div>
          </FadeIn>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='font-semibold text-lg tracking-wide dark:text-white'>
            Courses Included
          </div>
          <FadeIn>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-9'>
              {cpsCourses &&
                cpsCourses
                  .sort((p1, p2) =>
                    p2.courseId < p1.courseId
                      ? 1
                      : p2.courseId > p1.courseId
                      ? -1
                      : 0
                  )
                  .map((course) => (
                    <div key={course.id}>
                      <CourseCard
                        courseId={course.courseId}
                        title={course.title}
                        desc={course.subheadline}
                        video={course.preview}
                        hours={course.hours}
                        lessons={course.lessons}
                        price={course.price}
                        slug={course.slug}
                        category={course.category}
                        savedCourses={user?.savedCourses}
                      />
                    </div>
                  ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CPSHow;
