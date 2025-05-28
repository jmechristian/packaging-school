import React from 'react';
import RelatedCourses from './RelatedCourses';
import SkillsCTA from '../SkillsCTA';
import StudentSuccess from '../StudentSuccess';
import CourseTestimonials from './CourseTestimonials';

const CourseBottom = ({ category, id }) => {
  return (
    <section className='bg-white dark:bg-dark'>
      <div className='flex flex-col gap-16'>
        <div className='bg-slate-100 dark:bg-dark py-16'>
          <div className='container__inner'>
            <div className='pb-6'>
              <div>
                <div className='h4-base dark:text-white'>Related Courses</div>
              </div>
            </div>
          </div>
          <RelatedCourses category={category} id={id} />
        </div>
        <div className='flex flex-col items-center gap-10'>
          <div className='text-center h3-base px-5 w-full max-w-sm md:max-w-full dark:text-white'>
            Discover the Impact of Our Courses From Your Peers!
          </div>
          <div className='max-w-full overflow-hidden'>
            <CourseTestimonials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseBottom;
