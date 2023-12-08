import React from 'react';
import CourseIntro from './CourseIntro';
import CourseInfo from './CourseInfo';
import CourseObjectives from './CourseObjectives';
import { motion } from 'framer-motion';
import YouTubeEmbed from '../YouTubeEmbed';
import VideoPlayer from '../VideoPlayer';

const CourseMain = ({ data }) => {
  console.log(data.id);
  return (
    <section className='w-full h-full bg-white dark:bg-dark-dark bg-cover py-16'>
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
        key={data.courseId}
      >
        <div className='grid grid-cols-1 lg:grid-cols-5 '>
          <div className='flex flex-col gap-16 lg:col-span-3'>
            <CourseIntro
              id={data.courseId}
              category={data.category}
              categoryArray={data.categoryArray}
              title={data.title}
              instructor={data.instructor ? data.instructor : ''}
              subtitle={data.subheadline}
              infoSheet={data.infoSheet}
              hours={data.hours}
              lessons={data.lessons}
              videos={data.videos}
            />
            <div className='lg:hidden'>
              <CourseInfo
                embedid={data.preview}
                price={data.price}
                certification={''}
                link={data.link}
                trialLink={`${data.link}?et=free_trial`}
                partOf={data.partOf ? data.partOf : undefined}
                seoImage={data.seoImage}
              />
            </div>
            <CourseObjectives
              what={data.what_learned}
              items={data.objectives}
            />
          </div>
          <div className='hidden lg:inline-grid lg:col-span-2 pl-8'>
            <CourseInfo
              embedid={data.preview}
              videos={data.videos}
              price={data.price}
              certification={''}
              link={data.link}
              trialLink={`${data.link}?et=free_trial`}
              partOf={data.partOf ? data.partOf : undefined}
              seoImage={data.seoImage}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CourseMain;
