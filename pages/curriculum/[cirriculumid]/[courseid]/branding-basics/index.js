import React from 'react';
import {
  VideoCameraIcon,
  DocumentIcon,
  CursorArrowRippleIcon,
  BoltIcon,
  BoltSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlayIcon,
  CheckIcon,
} from '@heroicons/react/24/solid';
import {
  AcademicCapIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import brandingAnimation from '../../../../../src/brandingg.json';
import dynamic from 'next/dynamic';

// Dynamic import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Page = () => {
  const router = useRouter();

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 1, 1, 1, 1, 1, 1],
        backgroundColor: ['#333', '#333', '#333', '#333', '#333', '#333'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const modules = [
    {
      title: 'Introduction to Branding Basics',
      icons: <VideoCameraIcon className='fill-white w-6 h-6' />,
      link: 'introduction-to-branding-basics',
      sub: 'Video - 2 Min',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Trademark and Copyright',
      icons: <DocumentIcon className='fill-white w-6 h-6' />,
      link: 'trademark-and-copyright',
      sub: 'PDF',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Color Theory and Symbolism',
      icons: <VideoCameraIcon className='fill-white w-6 h-6' />,
      link: 'color-theory-and-symbolism',
      sub: 'Video - 19 Min',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Typography',
      icons: <CursorArrowRippleIcon className='fill-white w-6 h-6' />,
      link: 'typography',
      sub: 'Interactive',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Brand Development Lab',
      icons: <CursorArrowRippleIcon className='fill-white w-6 h-6' />,
      link: 'brand-development-lab',
      sub: 'Interactive',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Style Guide Lab',
      icons: <CursorArrowRippleIcon className='fill-white w-6 h-6' />,
      link: 'style-guide-lab',
      sub: 'Interactive',
      unlocked: true,
      complete: false,
    },
    {
      title: 'Conclusion and Bonus Content',
      icons: <BoltIcon className='fill-white w-6 h-6' />,
      link: 'conclusion-and-bonus-content',
      sub: 'Bonus Content',
      unlocked: true,
      complete: false,
    },
  ];

  const objectives = [
    {
      obj: 'Acquire a deep understanding of critical branding concepts, theories, legal considerations, and resources.',
      icon: <LightBulbIcon className='w-6 h-6 stroke-clemson' />,
    },
    {
      obj: 'Systematically organize your brand’s color palette and typography selections.',
      icon: <LightBulbIcon className='w-6 h-6 stroke-clemson' />,
    },
    {
      obj: 'Construct a comprehensive style guide to maintain consistency and cohesiveness in your brand’s visual identity.',
      icon: <LightBulbIcon className='w-6 h-6 stroke-clemson' />,
    },
    {
      obj: 'Create a compelling visual representation of your package design, seamlessly incorporating your market research findings (next step after market research / Frankenstein).',
      icon: <LightBulbIcon className='w-6 h-6 stroke-clemson' />,
    },
  ];

  return (
    <div className='bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] bg-no-repeat from-white dark:from-base-brand dark:via-dark-dark dark:to-neutral-900 via-base-light  to-white flex flex-col lg:pt-24 pb-24'>
      <div className='w-full h-full  max-w-6xl mx-auto bg-white dark:bg-black/40 backdrop-blur-xl rounded-lg'>
        <div className='grid lg:grid-cols-12 p-6 xl:p-16 rounded-t-lg shadow-xl overflow-hidden'>
          <div className='dark:text-white flex flex-col justify-center gap-6 w-full h-full col-span-6'>
            <h2 className='text-5xl'>Branding Basics</h2>
            <p className='dark:text-neutral-400 text-lg text-gray-700 max-w-prose'>
              Having thoroughly analyzed your competition, you’re now prepared
              to embark on the journey of crafting your unique brand identity.
              In this chapter, we will lay the foundation for your brand,
              equipping you with essential assets needed to nurture and develop
              your brand. By the end of this chapter, you will be well-equipped
              to translate the valuable insights gleaned from your market
              research into a visually captivating package design.
            </p>
          </div>
          <div className='w-full col-span-6 hidden md:block'>
            <Lottie animationData={brandingAnimation} loop={true} />
          </div>
          <div className='w-full h-full max-w-prose col-span-12 flex flex-col gap-6 mt-12'>
            <h3 className='text-2xl mt-3 dark:text-white'>
              Learning Objectives
            </h3>
            <div className='flex flex-col gap-2'>
              {objectives.map((obj) => (
                <div className='flex gap-2 items-center' key={obj.obj}>
                  <div>{obj.icon}</div>
                  <div className='dark:text-neutral-400 text-gray-700 text-lg'>
                    {obj.obj}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full h-full max-w-6xl mx-auto'>
          <div className='flex flex-1 p-4 bg-base-dark dark:bg-black/70 backdrop-blur-lg rounded-b-lg'>
            <div className='flex flex-1'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full items-center justify-center'>
                {modules.map((mod, i) => (
                  <div
                    className={`${
                      mod.unlocked && !mod.complete
                        ? 'bg-base-brand hover:bg-indigo-500'
                        : mod.unlocked && mod.complete
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-neutral-200'
                    } aspect-[1/1] w-full shadow-md rounded-lg relative cursor-pointer transition-colors ease-linear`}
                    key={mod.link}
                    onClick={() =>
                      router.push(
                        `/curriculum/cps/cps-12/branding-basics/${mod.link}`
                      )
                    }
                  >
                    <div className='flex flex-col justify-between h-full py-1.5 px-3'>
                      <div className='w-full flex justify-between items-start'>
                        <div>
                          {mod.unlocked && !mod.complete ? (
                            <LockOpenIcon className='w-5 h-5 fill-white/70' />
                          ) : mod.unlocked && mod.complete ? (
                            <div className='flex items-center gap-1.5'>
                              <div className='w-8 h-8 bg-green-700 rounded-full flex items-center justify-center'>
                                <CheckIcon className='fill-white w-5 h-5' />
                              </div>
                              <div className='text-white text-lg'>+1</div>
                            </div>
                          ) : (
                            <LockClosedIcon className='w-5 h-5 fill-neutral-400' />
                          )}
                        </div>
                        <div
                          className={`${
                            mod.unlocked
                              ? 'font-bold text-2xl text-white'
                              : 'text-xl font-bold text-neutral-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div
                        className={`${
                          mod.unlocked
                            ? 'font-bold text-white'
                            : 'font-bold text-neutral-400'
                        } leading-tight pb-1`}
                      >
                        {mod.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
