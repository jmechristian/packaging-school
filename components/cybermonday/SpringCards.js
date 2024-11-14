import React from 'react';
import { twMerge } from 'tailwind-merge';
import { MotionConfig, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export const SpringCards = () => {
  return (
    <section>
      <div className='mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2'>
        <Card
          title='Recognized Credential'
          subtitle='Join a network of professionals who have elevated their careers with CPS.'
          className='sm:-translate-y-5'
        />
        <Card
          title='Industry-Relevant Knowledge'
          subtitle='Gain skills that employers demand and stand out in the competitive packaging industry.'
          className='bg-indigo-300 '
        />
        <Card
          title='Learn at Your Own Pace'
          subtitle='100% online and self-paced to fit your schedule.'
          className='bg-red-300 sm:-translate-y-5'
        />
        <Card
          title='Choose Your Own Elective'
          subtitle='Tailor your learning path with the CPS certification, choose an elective course at no extra cost.'
          className='bg-yellow-300 '
        />
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, className }) => {
  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.5,
      }}
    >
      <motion.div
        whileHover='hovered'
        className={twMerge(
          'group w-full border-2 border-black bg-green-300',
          className
        )}
      >
        <motion.div
          initial={{
            x: 0,
            y: 0,
          }}
          variants={{
            hovered: {
              x: -8,
              y: -8,
            },
          }}
          className={twMerge(
            '-m-0.5 border-2 border-black bg-green-300',
            className
          )}
        >
          <motion.div
            initial={{
              x: 0,
              y: 0,
            }}
            variants={{
              hovered: {
                x: -8,
                y: -8,
              },
            }}
            className={twMerge(
              'relative -m-0.5 flex h-72 flex-col justify-between overflow-hidden border-2 border-black bg-green-300 p-8',
              className
            )}
          >
            <p className='flex items-center text-2xl font-medium uppercase leading-[1.1]'>
              <FiArrowRight className='-ml-8 mr-2 opacity-0 transition-all duration-300 ease-in-out group-hover:ml-0 group-hover:opacity-100' />
              {title}
            </p>
            <div>
              <p className='transition-[margin] duration-300 ease-in-out group-hover:mb-10 leading-[1.3]'>
                {subtitle}
              </p>
              <button
                className='absolute bottom-2 left-2 right-2 translate-y-full border-2 border-black bg-white px-4 py-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100'
                onClick={() => {
                  window.location.href =
                    'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24';
                }}
              >
                LET&apos;S GO
              </button>
            </div>

            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              }}
              style={{
                top: '0',
                right: '0',
                x: '50%',
                y: '-50%',
                scale: 0.75,
              }}
              width='200'
              height='200'
              className='pointer-events-none absolute z-10 rounded-full'
            >
              <path
                id='circlePath'
                d='M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0'
                fill='none'
              />
              <text>
                <textPath
                  href='#circlePath'
                  fill='black'
                  className='fill-black text-xl font-black uppercase opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
                >
                  LEARN MORE • LEARN MORE • LEARN MORE • LEARN MORE •
                </textPath>
              </text>
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
