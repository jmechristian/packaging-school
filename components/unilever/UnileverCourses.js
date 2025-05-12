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
    <div className='w-full h-full max-w-5xl mx-auto bg-white border-2 border-black rounded-xl overflow-hidden'>
      <div className='flex flex-col items-center w-full lg:justify-between gap-6 md:gap-10'>
        <div className='flex flex-col gap-4'>
          <div className='grid lg:grid-cols-2 gap-3'>
            <div className='aspect-[16/9] bg-black w-full h-full'>
              <VideoPlayer
                videoEmbedLink={
                  'https://player.vimeo.com/video/928045072?h=5a0899e942&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                }
                light={false}
                playing={false}
              />
            </div>
            <div className='flex flex-col gap-3 p-4'>
              <div className='flex flex-col gap-2'>
                <div className='text-sm bg-red-500 text-white font-bold p-0.5 px-2'>
                  Now Available!
                </div>
                <div className='w-full border-b border-black pb-2'>
                  <h2 className='font-semibold text-xl leading-tight'>
                    Framework for Understanding Renewable Feedstocks Course
                  </h2>
                </div>
              </div>
              <div className='grid grid-cols-7 gap-1'>
                <div className='flex flex-col gap-2 col-span-6'>
                  <div className='text-sm text-neutral-500 leading-snug pr-6'>
                    The Packaging School, recognized for its commitment to
                    advancing packaging education with a strong emphasis on
                    sustainability, provides a comprehensive learning platform
                    for Unilever employees. Through specialized modules,
                    employees can deepen their expertise in key areas,
                    including:
                  </div>
                  <div className='text-sm text-neutral-500 leading-snug'>
                    <ul className='list-disc list-inside'>
                      <li className='leading-snug'>
                        Renewable Feedstocks for Plastic Packaging
                      </li>
                      <li className='leading-snug'>
                        Biodegradability vs. Compostability
                      </li>
                      <li className='leading-snug'>
                        Unilever&apos;s Carbon Rainbow
                      </li>
                      <li className='leading-snug'>
                        Introduction to Mass Balance
                      </li>
                      <li className='leading-snug'>
                        Introduction to Net Zero and LCA (Life Cycle Assessment)
                      </li>
                      <li className='leading-snug'>
                        The Potential of Carbon Capture in Packaging
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='text-sm text-neutral-500 col-span-1'>
                  <div className='flex flex-col gap-2'>
                    <div
                      className='aspect-[1/1] w-full bg-contain bg-no-repeat flex items-center justify-center'
                      style={{
                        backgroundImage: `url("https://packschool.s3.us-east-1.amazonaws.com/ul-hours.png")`,
                      }}
                    >
                      <div className='font-semibold text-lg text-unilever-blue'>
                        5
                      </div>
                    </div>
                    <div
                      className='aspect-[1/1] w-full bg-contain bg-no-repeat flex items-center justify-center'
                      style={{
                        backgroundImage: `url("https://packschool.s3.us-east-1.amazonaws.com/ul-lessons.png")`,
                      }}
                    >
                      <div className='font-semibold text-lg text-unilever-blue mt-0.5'>
                        37
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='flex items-center justify-center w-full bg-unilever-blue text-white font-semibold text-lg py-2 rounded-lg cursor-pointer hover:bg-unilever-blue/80 transition-colors duration-300'
                onClick={() => {
                  window.open(
                    'https://learn.packagingschool.com/enroll/3246250?price_id=4139249',
                    '_blank'
                  );
                }}
              >
                Select Course
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
};

export default UnileverCourses;
