import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BrutalTag from '../../components/shared/BrutalTag';
import VideoPlayer from '../VideoPlayer';
import { createNewOrder } from '../../helpers/api';
import { useSelector } from 'react-redux';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useRouter } from 'next/router';
import WiredCourseCard from '../shared/WiredCourseCard';

const UnileverCourses = ({ featured, reference }) => {
  const router = useRouter();
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const orderHandler = async () => {
    const orderId = await createNewOrder({
      courseDescription:
        'The Packaging School, recognized for its commitment to advancing packaging education with a strong emphasis on sustainability, provides a comprehensive learning platform for Unilever employees. Through specialized modules, employees can deepen their expertise in key areas',
      courseDiscount: 0,
      courseImage:
        'https://packschool.s3.us-east-1.amazonaws.com/ul-course-hero.jpg',
      courseName: 'Framework for Understanding Renewable Feedstocks Course',
      courseLink: `https://learn.packagingschool.com/enroll/3246250?price_id=4139249`,
      total: 0,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        `https://learn.packagingschool.com/enroll/3246250?price_id=4139249`,
        `https://learn.packagingschool.com/enroll/3246250?price_id=4139249`
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

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
            <div className='aspect-[16/9] bg-black w-full h-full content-center'>
              <VideoPlayer
                videoEmbedLink={
                  'https://packschool.s3.us-east-1.amazonaws.com/ul_2025_update.mp4'
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
                onClick={orderHandler}
              >
                Select Course
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnileverCourses;
