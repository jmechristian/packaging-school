import React from 'react';
import SlidesPlayer from './SlidesPlayer';

const LessonSlides = ({ slides }) => {
  const reOrderedSlides = slides.sort();

  return (
    <div className='mx-auto max-w-7xl aspect-[1/1] md:aspect-[16/9] w-full mb-6'>
      <div className='w-full h-full bg-dark-mid'>
        <SlidesPlayer images={reOrderedSlides} />
      </div>
    </div>
  );
};

export default LessonSlides;
