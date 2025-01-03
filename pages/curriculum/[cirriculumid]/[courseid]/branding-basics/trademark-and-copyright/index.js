import React from 'react';
import VideoHeading from '../../../../../../components/lms/video/VideoHeading';
import CourseMenuWrapper from '../../../../../../components/lms/shared/courseMenu/CourseMenuWrapper';
import Image from "next/legacy/image";

const Page = () => {
  return (
    <div className='w-full h-full bg-white dark:bg-dark-mid dark:text-white relative pb-24'>
      <div className='mx-auto max-w-7xl w-full h-full relative aspect-[16/9] overflow-y-scroll py-4 bg-dark-dark flex justify-center items-center'>
        <div className='max-w-5xl mx-auto w-full h-full'>
          <Image
            src={'https://packschool.s3.amazonaws.com/trademark.webp'}
            alt='Trademark and Copyright'
            width={1600}
            height={3019}
          />
        </div>
      </div>
      <VideoHeading
        id={'CPS-12.02'}
        title={'Trademark and Copyright'}
        nextLesson={'Color Theory and Symbolism'}
        nextLessonLink={'color-theory-and-symbolism'}
        download={
          'https://packschool.s3.amazonaws.com/trademarkandcopyright-210610-090459.pdf'
        }
        downloadCopy={'Download PDF'}
      />
      <CourseMenuWrapper />
    </div>
  );
};

export default Page;
