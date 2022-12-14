import React from 'react';
import CourseIntro from './CourseIntro';
import CourseInfo from './CourseInfo';
import CourseObjectives from './CourseObjectives';
import { motion } from 'framer-motion';
import YouTubeEmbed from '../YouTubeEmbed';

const CourseMain = ({ data }) => {
  return (
    <section className='w-full bg-slate-200 dark:bg-dark bg-cover lg:dark:bg-dark  lg:course__hero-padding'>
      <div className='pt-24 pb-12 md:container__inner lg:hidden'>
        <YouTubeEmbed embedid={data.embed_id} />
      </div>
      <motion.div
        className='container__inner'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 85,
          mass: 1,
          delay: 0.8,
        }}
        key={data.course_id}
      >
        <div className='grid grid-cols-1 lg:grid-cols-5 '>
          <div className='flex flex-col gap-16 lg:col-span-3'>
            <CourseIntro
              id={data.course_id}
              categories={data.categories}
              title={data.course_title}
              instructor={data.instructor}
              subtitle={data.course_subtitle}
              infoSheet={data.course_info_sheet}
              hours={data.course_hours}
              lessons={data.course_lessons}
              videos={data.course_videos}
            />
            <div className='lg:hidden'>
              <CourseInfo
                embedid={data.embed_id}
                price={data.course_price}
                certification={data.certificate}
              />
            </div>
            <CourseObjectives
              what={data.what_learned}
              items={data.what_learned_items}
            />
          </div>
          <div className='hidden lg:inline-grid lg:col-span-2 pl-8'>
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
      </motion.div>
    </section>
  );
};

export default CourseMain;
