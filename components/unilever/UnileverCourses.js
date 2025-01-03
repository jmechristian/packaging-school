import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BrutalTag from '../../components/shared/BrutalTag';
import VideoPlayer from '../VideoPlayer';

import WiredCourseCard from '../shared/WiredCourseCard';

const UnileverCourses = ({ featured, reference }) => {
  return (
    // <motion.div className='px-0 lg:px-6 w-fit mx-auto grid gap-12 md:gap-6 lg:gap-16 md:grid-cols-2 lg:grid-cols-3 md:pb-10 py-9 overflow-hidden'>
    //   <WiredCourseCard
    //     id={'a6769066-eda9-4f8f-aee9-579482d87ce0'}
    //     reference={reference}
    //     external={true}
    //     link_text={'Coming Soon!'}
    //   />
    // </motion.div>
    (<div className='w-full h-full max-w-5xl mx-auto bg-white px-9 py-12 border-2 border-black rounded-xl'>
      <div className='flex flex-col lg:flex-row items-center w-full lg:justify-between gap-6 md:gap-10'>
        <div className='flex flex-col gap-5 max-w-lg lg:pr-10'>
          <div className='flex flex-col gap-3'>
            <BrutalTag
              backgroundColor={'bg-green-600'}
              textColor={'text-white'}
              text={'Coming Soon!'}
            />
            <h2 className='font-bold text-2xl lg:text-3xl leading-tight'>
              Unilever Sustainable Packaging
            </h2>
          </div>
          <div>
            This course, designed for R&D, supply chain, and procurement teams,
            enhances understanding of sustainable practices like renewable
            feedstocks, compostability, and carbon capture. It emphasizes
            continuous learning to meet ambitious sustainability goals and adapt
            to future work environments.
          </div>
        </div>
        <div className='aspect-[16/9] bg-black w-full max-w-xl'>
          <VideoPlayer
            videoEmbedLink={
              'https://player.vimeo.com/video/928045072?h=5a0899e942&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            }
            light={false}
            playing={false}
          />
        </div>
      </div>
    </div>)
  );
};

export default UnileverCourses;
