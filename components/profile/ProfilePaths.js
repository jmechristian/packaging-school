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

const ProfilePaths = ({ paths }) => {
  console.log(paths);
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
  const renderIcon = (icon) => {
    // If icon is already a React component, return it
    if (React.isValidElement(icon)) {
      return icon;
    }

    // If icon is a string, handle it as before
    const iconName = icon?.startsWith('Gi') ? icon : `Gi${icon}`;
    switch (iconName) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={36} />;
      case 'GiForest':
        return <GiForest size={36} />;
      case 'GiPalette':
        return <GiPalette size={36} />;
      case 'GiCarWheel':
        return <GiCarWheel size={36} />;
      case 'GiHoneycomb':
        return <GiHoneycomb size={36} />;
      case 'GiBoxUnpacking':
        return <GiBoxUnpacking size={36} />;
      default:
        return null;
    }
  };
  return (
    <div className='flex flex-col w-full gap-10 h-full justify-between'>
      {paths.length > 0 ? (
        <div className='flex flex-col gap-5'>
          <div className='font-semibold text-lg w-full border-b border-gray-200 pb-2.5'>
            Your Active Learning Paths
          </div>
          <div className='grid grid-cols-3 gap-4 w-full'>
            {paths.map((path) => (
              <div
                key={path.learningPath.id}
                className='col-span-1 bg-gray-100 py-4 rounded-lg w-full flex flex-col gap-2.5'
              >
                <div className='flex justify-between w-full px-3'>
                  <div className='flex gap-3'>
                    <div>
                      <div className='w-12 h-16 bg-clemson text-white flex items-center justify-center rounded-lg'>
                        {renderIcon(path.learningPath.icon)}
                      </div>
                    </div>
                    <div className='flex flex-col gap-0.5 w-full'>
                      <div className='text-lg font-oswald'>
                        {path.learningPath.title}
                      </div>
                      <div className='w-full'>
                        <div className='text-sm font-medium text-slate-500 line-clamp-2'>
                          {path.learningPath.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between gap-2 border-y border-slate-300 py-2.5 bg-slate-400 px-4'>
                  <div className='w-[84%] h-1 bg-white rounded-lg'>
                    <div
                      className='h-1 bg-yellow-600 rounded-lg'
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                  <div className='text-sm font-medium text-white'>
                    {path.progress}%
                  </div>
                </div>
                <div
                  className='w-full flex justify-between items-center cursor-pointer px-4'
                  onClick={() => {
                    router.push(`/paths/${path.learningPath.slug}`);
                  }}
                >
                  <div className={`font-medium text-sm text-slate-500`}>
                    {((path.progress / 100) * path.learningPath.hours)
                      .toFixed(2)
                      .replace(/\.?0+$/, '')}
                    h / {path.learningPath.hours}h
                  </div>
                  <div className='text-sm font-medium text-slate-900'>
                    Continue Path &rarr;
                  </div>
                </div>
              </div>
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
        <div className='grid grid-cols-3 gap-5'>
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
