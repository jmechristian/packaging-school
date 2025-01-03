import React from 'react';
import PresaleCountdown from '../../components/shared/PresaleCountdown';
import FuzzyOverlay from '../../components/shared/FuzzyOverlay';
import VideoPlayer from '../../components/VideoPlayer';
import IconButton from '../../components/shared/IconButton';
import { GrTrophy } from 'react-icons/gr';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCopy,
  FiDatabase,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/legacy/image";
import BrutalButton from '../../components/shared/BrutalButton';
import MagnetButton from '../../components/shared/MagnetButton';
import Head from 'next/head';

const Page = () => {
  const router = useRouter();

  const sequence = [
    ['ul', { opacity: 1 }],
    ['li', { x: [-100, 0] }, { at: 1 }],
  ];

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta
          name='image'
          property='og:image'
          content={
            'https://packschool.s3.amazonaws.com/foodpackaging-presale-slide4.webp'
          }
          key='image'
        />
        <meta
          property='og:title'
          content={
            'Pre-Order: Food Packaging Certificate: Packaging and Preservation'
          }
          key='title'
        />
        <meta
          property='og:description'
          content="Responding to the vital need for quality and safety in the
                evolving food sector, we're thrilled to announce the
                pre-order for our inaugural course in the Food Packaging
                Certificate, focusing on cutting-edge packaging and preservation
                techniques to elevate industry standards and meet client
                demands."
          key='desc'
        />
        <meta
          name='description'
          content="Responding to the vital need for quality and safety in the
                evolving food sector, we're thrilled to announce the
                pre-order for our inaugural course in the Food Packaging
                Certificate, focusing on cutting-edge packaging and preservation
                techniques to elevate industry standards and meet client
                demands."
          key='desc'
        />
      </Head>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-20 xl:pt-10 xl:pb-20'>
        <div className='bg-amber-400 xl:rounded-2xl w-full lg:px-12 px-5 py-16'>
          <div className='flex flex-col-reverse justify-center lg:flex-row lg:items-center w-full gap-9 lg:gap-16 mx-auto'>
            <motion.div
              className='flex flex-col gap-4 max-w-lg mx-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            >
              <div>
                <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold'>
                  Food Packaging Certificate: Packaging and Preservation
                </h1>
              </div>
              <div>
                <p className='text-lg leading-snug lg:text-base'>
                  Responding to the vital need for quality and safety in the
                  evolving food sector, we&apos;re thrilled to announce the
                  pre-order for our inaugural course in the Food Packaging
                  Certificate, focusing on cutting-edge packaging and
                  preservation techniques to elevate industry standards and meet
                  client demands.
                </p>
              </div>
              <div className='flex items-center gap-5 mt-4'>
                {/* <div
                className='bg-white hover:bg-neutral-300 transition-all ease-in cursor-pointer px-4 py-2 text-lg rounded-lg text-black shadow border-black border font-bold'
                onClick={() =>
                  window.open(
                    'https://learn.packagingschool.com/enroll/2893149?price_id=3736463&coupon=fpcpresell',
                    '_blank'
                  )
                }
              >
                Pre-Order Now!
              </div> */}
                <a
                  href={
                    'https://learn.packagingschool.com/enroll/2893149?price_id=3736463&coupon=fpcpresell'
                  }
                  className={`flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 lg:text-lg shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black] bg-white`}
                  target='blank'
                  referrer='norerrer'
                >
                  <span>Pre-Order</span>
                  <FiArrowRight />
                </a>
                <div className='flex items-center gap-3'>
                  <div className='text-3xl lg:text-4xl font-bold italic tracking-tight'>
                    $199
                  </div>
                  <div className='text-2xl lg:text-3xl font-medium line-through text-white'>
                    $399
                  </div>
                </div>
              </div>
              <div className='w-full bg-black px-3 pt-2 pb-3 max-w-md mt-3 flex flex-col gap-2 rounded-lg'>
                <div className='font-bold text-clemson text-lg w-full text-center'>
                  50% off till April 2!
                </div>
                <PresaleCountdown date={'04/03/2024'} />
              </div>
            </motion.div>
            <AnimatePresence>
              <motion.div
                className='aspect-[1/1] relative w-full max-w-[450px] mx-auto bg-neutral-900 rounded-xl shadow-2xl border-black border-4 overflow-hidden'
                initial={{ scale: 0, borderRadius: '100%' }}
                animate={{ scale: 1, borderRadius: '15%', rotate: 360 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                <motion.div
                  className='w-full aspect-[1/1] absolute inset-0 z-10 bg-neutral-800'
                  animate={{
                    opacity: [
                      1, 0, 1, 0, 1, 0, 1, 0, 0.75, 0, 0.75, 0, 0.75, 0, 0.75,
                      0, 0.75, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0.25, 0, 0.25,
                      0, 0.25, 0, 0.25, 0,
                    ],
                  }}
                  transition={{ delay: 0.5, type: 'keyframes', duration: 1.5 }}
                >
                  <FuzzyOverlay />
                </motion.div>
                <motion.div
                  className='flex flex-col w-full'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3, ease: 'anticipate' }}
                >
                  <motion.div
                    animate={{ y: ['0%', '-33.33333%', '-66.66666%'] }}
                    transition={{ delay: 2, type: 'spring', duration: 6 }}
                  >
                    <div className='w-full'>
                      <img
                        className='w-full'
                        src='https://packschool.s3.amazonaws.com/foodpackaging-presale-slide1.webp'
                        alt='food packaging slide 1'
                      />
                    </div>
                    <div className='w-full'>
                      <img
                        className='w-full'
                        src='https://packschool.s3.amazonaws.com/foodpackaging-presale-slide3.webp'
                        alt='food packaging slide 2'
                      />
                    </div>
                    <div className='w-full'>
                      <img
                        className='w-full'
                        src='https://packschool.s3.amazonaws.com/foodpackaging-screenshot-9.webp'
                        alt='food packaging slide 4'
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center xl:gap-32 w-full pt-10 xl:py-20 justify-center lg:justify-between px-5 lg:px-10'>
          <div className='w-full h-full relative aspect-[4/3] xl:max-w-[500px] max-w-sm mb-16 md:mb-6'>
            <div className='absolute aspect-[60/31] w-full max-w-[300px] bg-white shadow-2xl border border-black z-0 left-9 -top-10'>
              <Image
                src={
                  'https://packschool.s3.amazonaws.com/foodpackaging-screenshot1.png'
                }
                alt='Food Packaging Certificate: Packaging and Preservation screenshot'
                width={600}
                height={310}
              />
            </div>
            <div className='absolute aspect-[60/31] w-full bg-white shadow-lg  border border-black z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
              <Image
                src={
                  'https://packschool.s3.amazonaws.com/foodpackaging-screenshot2.png'
                }
                alt='Food Packaging Certificate: Packaging and Preservation screenshot'
                width={600}
                height={310}
              />
            </div>
            <div className='absolute aspect-[60/31] w-full max-w-[300px] xl:max-w-[350px] bg-white shadow-xl border border-black z-20 xl:-bottom-16 md:-left-10 md:bottom-3 -bottom-3 lg:left-12 lg:-bottom-6 left-4'>
              <Image
                src={
                  'https://packschool.s3.amazonaws.com/foodpackaging-screenshot3.png'
                }
                alt='Food Packaging Certificate: Packaging and Preservation screenshot'
                width={600}
                height={310}
              />
            </div>
          </div>
          <div className='flex flex-col gap-5 max-w-md xl:max-w-lg'>
            <div className='text-3xl xl:text-4xl font-semibold tracking-tight'>
              What You Will Cover
            </div>
            <div>
              <p>
                This course discusses the packaging requirements for various
                food groups. Different food products vary in composition,
                affecting spoilage type and shelf life differently. The ways
                packaging can be used to control deteriorative reactions
                throughout the supply chain will be discussed for a variety of
                products. We will also highlight many strategies used in the
                industry along with material selection. We have divided this
                course into modules based on the general food type, such as
                dairy or meat or low- and intermediate-moisture foods.
              </p>
            </div>
            <BrutalButton
              text={'Pre-Order Now! Offer Ends April 2'}
              link={
                'https://learn.packagingschool.com/enroll/2893149?price_id=3736463&coupon=fpcpresell'
              }
              background={'bg-clemson'}
              textColor={'text-white'}
              arrow={<FiArrowRight />}
            />
          </div>
        </div>
        <div className='w-full border-t-black border-b-2 border-b-black border-t-2 lg:border-2 lg:border-black xl:rounded-xl xl:shadow-[4px_4px_0px_black] bg-[#33b3de] overflow-hidden mt-6'>
          <div className='w-full grid lg:grid-cols-12'>
            <div className='lg:col-span-4 py-10 lg:border-r-black lg:border-r-2'>
              <div className='flex flex-col w-full max-w-[300px] border-2 border-black mx-auto'>
                <div className='bg-amber-300 text-black font-medium text-xl flex items-center gap-3 p-3'>
                  <div>
                    <div className='w-12 h-12 border-2 border-black bg-white flex items-center justify-center'>
                      <div className='w-7 h-7 rounded-full bg-brand-yellow ring ring-black flex items-center justify-center'>
                        <GrTrophy />
                      </div>
                    </div>
                  </div>
                  <div className=' leading-none'>
                    Food Packaging Certificate
                  </div>
                </div>
                <div
                  className='border-t-2 border-t-black border-b-2 border-b-black aspect-[5/3] w-full bg-white bg-cover bg-center'
                  style={{
                    backgroundImage: `url("https://packschool.s3.amazonaws.com/fpc-seoImage.webp")`,
                  }}
                ></div>
                <div className='bg-white px-3 pt-4 pb-5 text-sm leading-tight'>
                  This certificate aims to help not only packaging engineers,
                  but also food scientists and technologists, package developers
                  and designers, marketers, sales teams, and manufacturers by
                  teaching the theory of food packaging and the methods to apply
                  current consumer needs through innovation in packaging design,
                  material choice, and sustainability initiatives.
                </div>
                <div
                  className='bg-black text-white uppercase font-medium py-3 text-center cursor-pointer'
                  onClick={() => router.push('/food-packaging')}
                >
                  View Certificate
                </div>
              </div>
            </div>
            <div className='lg:col-span-8 bg-white w-full p-10'>
              <div className='w-full flex flex-col justify-between gap-6 h-full'>
                <h1 className='text-3xl md:text-4xl xl:text-5xl font-semibold max-w-md'>
                  Be a Thought Leader in the Food Packaging Space
                </h1>
                <div className='flex flex-col md:flex-row items-end justify-between'>
                  <div className='flex flex-col gap-3'>
                    <h3 className='text-xl font-bold'>
                      Elevate Your Presence, Enlighten The Industry.
                    </h3>
                    <p className='text-lg max-w-lg pr-8'>
                      By choosing to sponsor, you play a pivotal role in
                      enriching the knowledge base of countless food packaging
                      experts, showcasing the unparalleled value your brand
                      brings to the forefront. Position your business at the
                      heart of innovation, where your executives emerge as the
                      leading voices of authority. Take this opportunity to not
                      just be seen, but to significantly impact and shape the
                      future of the food packaging sector.
                    </p>
                  </div>

                  <div onClick={() => router.push('/food-packaging')}>
                    <MagnetButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
