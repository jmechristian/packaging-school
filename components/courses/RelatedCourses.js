import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import RelatedCourse from './RelatedCourse';
import Scroller from '../Scroller';
import CourseCard from '../course-card/CourseCard';

const RelatedCourses = ({ related }) => {
  return (
    <div className='flex flex-col mt-6'>
      <Scroller rows='1'>
        {related &&
          related.map((course, i) => (
            <div
              className='inline-block'
              key={course.related.data.course_title[0].text}
            >
              <CourseCard
                title={course.related.data.course_title[0].text}
                desc={course.related.data.course_subtitle[0].text}
                video={course.related.data.embed_id}
                hours={course.related.data.course_hours}
                lessons={course.related.data.course_lessons}
                price={course.related.data.course_price}
                slug={course.related.uid}
              />
            </div>
          ))}
      </Scroller>
    </div>
  );
};

export default RelatedCourses;
