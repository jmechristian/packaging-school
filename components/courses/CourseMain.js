import React from 'react';
import CourseIntro from './CourseIntro';
import CourseInfo from './CourseInfo';
import CourseObjectives from './CourseObjectives';
import { motion } from 'framer-motion';

const CourseMain = ({ data }) => {
  return (
    data && (
      <section className='w-full h-full bg-white dark:bg-dark-dark bg-cover'>
        <motion.div
          className='container__inner lg:px-6 xl:px-0'
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
          <div className='grid grid-cols-1 lg:!grid-cols-5 '>
            <div className='flex flex-col gap-8 lg:!col-span-3'>
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
                callout={data.callout}
              />
              <div className='lg:!hidden'>
                <CourseInfo
                  embedid={data.preview}
                  title={data.title}
                  description={data.subheadline}
                  price={data.price}
                  certification={''}
                  link={data.link}
                  trialLink={`${data.link}?et=free_trial`}
                  partOf={data.partOf ? data.partOf : undefined}
                  seoImage={data.seoImage}
                  subscriptionLink={
                    data.subscriptionLink ? data.subscriptionLink : null
                  }
                  subscriptionPrice={
                    data.subscriptionPrice ? data.subscriptionPrice : null
                  }
                />
              </div>
              <CourseObjectives
                what={data.what_learned}
                items={data.objectives}
              />
            </div>
            <div className='hidden lg:!inline-grid lg:!col-span-2 lg:!pl-5'>
              <CourseInfo
                title={data.title}
                description={data.subheadline}
                embedid={data.preview}
                videos={data.videos}
                price={data.price}
                certification={''}
                link={data.link}
                trialLink={`${data.link}?et=free_trial`}
                subscriptionLink={
                  data.subscriptionLink ? data.subscriptionLink : null
                }
                subscriptionPrice={
                  data.subscriptionPrice ? data.subscriptionPrice : null
                }
                partOf={data.partOf ? data.partOf : undefined}
                seoImage={data.seoImage}
                type={data.type}
              />
            </div>
          </div>
        </motion.div>
      </section>
    )
  );
};

export default CourseMain;
