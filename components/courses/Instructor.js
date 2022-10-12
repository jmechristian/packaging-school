import React from 'react';
import { PrismicLink } from '@prismicio/react';

const Instructor = ({ instructor }) => {
  return (
    instructor[0].instructor_name &&
    instructor.map((item, i) => (
      <div className='flex gap-2 items-center' key={i}>
        <div
          className='w-9 h-9 bg-white rounded-full'
          style={{
            backgroundImage: `url(${item.instructor_headshot.url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
          }}
        ></div>
        <div className='underline text-base-brand'>
          <PrismicLink field={item.instructor_social}>
            {item.instructor_name}
          </PrismicLink>
        </div>
      </div>
    ))
  );
};

export default Instructor;
