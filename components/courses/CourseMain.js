import React from 'react';
import CourseIntro from './CourseIntro';
import CourseInfo from './CourseInfo';
import CourseObjectives from './CourseObjectives';

const CourseMain = ({ data }) => {
  return (
    <section className='w-full bg-dark'>
      <div className='container__inner course__hero-padding'>
        <div className='grid grid-cols-1 lg:grid-cols-3 '>
          <div className='flex flex-col gap-16 lg:col-span-2 lg:pr-16'>
            <CourseIntro
              id={data.course_id}
              categories={data.categories}
              title={data.course_title}
              instructor={data.instructor}
              subtitle={data.course_subtitle}
              infoSheet={data.course_info_sheet}
            />
            <div className='lg:hidden'>
              <CourseInfo
                embedid={data.embed_id}
                price={data.course_price}
                hours={data.course_hours}
                lessons={data.course_lessons}
                videos={data.course_videos}
                certification={data.certificate}
              />
            </div>
            <CourseObjectives
              what={data.what_learned}
              items={data.what_learned_items}
            />
          </div>
          <div className='hidden lg:inline-grid lg:col-span-1'>
            <CourseInfo
              embedid={data.embed_id}
              price={data.course_price}
              hours={data.course_hours}
              lessons={data.course_lessons}
              videos={data.course_videos}
              certification={data.certificate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseMain;
