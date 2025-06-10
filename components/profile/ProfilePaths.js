import React from 'react';
import { useRouter } from 'next/navigation';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
} from 'react-icons/gi';
import ProfilePathItem from './ProfilePathItem';

const ProfilePaths = ({ paths }) => {
  const popularPaths = [
    {
      id: 1,
      name: 'Packaging Scientist',
      description: 'Become fluent in the language of packaging',
      icon: <GiFizzingFlask size={36} />,
      link: '/paths/packaging-science',
      hours: 11,
      lessons: 10,
    },
    {
      id: 2,
      name: 'Sustainability Architect',
      description: 'Measure and report the sustainability of a package',
      icon: <GiForest size={36} />,
      link: '/paths/sustainability-specialist',
      hours: 10,
      lessons: 10,
    },
    {
      id: 3,
      name: 'Package Designer',
      description:
        'Select Materials, design packaging, and produce specifications',
      icon: <GiPalette size={36} />,
      link: '/paths/materials-mastery',
      hours: 27.5,
      lessons: 10,
    },
  ];

  const router = useRouter();

  return (
    <div className='flex flex-col w-full gap-10 h-full justify-between'>
      {paths.length > 0 ? (
        <div className='flex flex-col gap-5'>
          <div className='font-semibold text-lg w-full border-b border-gray-200 pb-2.5'>
            Your Active Learning Paths
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>
            {paths.map((path) => (
              <ProfilePathItem key={path.id} path={path} />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-10'>
          <div className='w-full border-2 border-dashed flex items-center justify-center p-10 min-h-[360px]'>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-2xl font-semibold'>No Paths Started</div>
              <div
                className='text-sm text-gray-500 cursor-pointer'
                onClick={() => router.push('/paths')}
              >
                View all paths to get started for free &rarr;
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col gap-5 w-full '>
        <div className='font-semibold text-lg border-b border-gray-200 pb-2.5 w-full'>
          Popular Learning Paths
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {popularPaths.map((item) => (
            <div
              key={item.label}
              className='col-span-1 bg-gray-100 py-4 px-3 rounded-lg w-full flex flex-col gap-1'
            >
              <div className='flex justify-between w-full border-b border-gray-200 pb-3'>
                <div className='flex gap-3'>
                  <div>
                    <div className='w-12 h-16 bg-clemson text-white flex items-center justify-center rounded-lg'>
                      {item.icon}
                    </div>
                  </div>
                  <div className='flex flex-col gap-0.5 w-full'>
                    <div className='text-lg font-oswald'>{item.name}</div>
                    <div className='w-full'>
                      <div className='text-sm font-medium text-slate-500 line-clamp-2'>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='w-full flex justify-between items-center cursor-pointer'
                onClick={() => {
                  router.push(item.link);
                }}
              >
                <div className={`font-medium text-sm text-slate-500`}>
                  {item.hours}h
                </div>
                <div className='text-sm font-medium text-slate-900'>
                  View Path &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePaths;
