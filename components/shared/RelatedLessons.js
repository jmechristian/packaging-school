/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const RelatedLessons = ({ relatedLessons, lessonId }) => {
  return (
    (<div className='py-16 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl lg:mx-0'>
          <h2 className='text-3xl font-bold font-greycliff tracking-tight text-gray-900 dark:text-white'>
            Related Lessons
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600 dark:text-white/60'>
            Expand your knowledge of this subject by exploring related lessons
            and resources.
          </p>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-12 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {relatedLessons &&
            relatedLessons
              .filter((les) => les.id != lessonId)
              .slice(0, 3)
              .map((course, i) => (
                <article key={course.id} className='flex flex-col items-start'>
                  <div className='relative w-full'>
                    <img
                      src={course.seoImage}
                      alt={course.title}
                      className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                    />
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
                  </div>
                  <div className='max-w-xl'>
                    <div className='group relative'>
                      <h3 className='mt-6 text-xl font-greycliff font-semibold leading-6 text-gray-900 dark:text-base-brand group-hover:text-base-dark'>
                        <Link href={`/lessons/${course.slug}`}>

                          <span className='absolute inset-0' />
                          {course.title}

                        </Link>
                      </h3>
                      <p className='mt-5 leading-6 text-gray-600 dark:text-white/60 line-clamp-3'>
                        {course.subhead}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </div>)
  );
};

export default RelatedLessons;
