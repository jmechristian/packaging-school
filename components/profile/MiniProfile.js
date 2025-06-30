import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LEVELS_CONFIG } from '../../helpers/api';

const MiniProfile = ({ awsUser, userXp }) => {
  // const { awsUser, userXp } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(userXp.progress);
  const router = useRouter();
  const calculateLevelProgress = (xp) => {
    let currentLevel = 1;
    let nextLevelXP = 100;
    let previousLevelXP = 0;

    for (const levelData of LEVELS_CONFIG) {
      if (xp >= levelData.xpNeeded) {
        currentLevel = levelData.level + 1;
        previousLevelXP = levelData.xpNeeded;
        nextLevelXP =
          LEVELS_CONFIG[levelData.level]?.xpNeeded ?? levelData.xpNeeded;
      } else {
        nextLevelXP = levelData.xpNeeded;
        break;
      }
    }

    const xpForNextLevel = nextLevelXP - previousLevelXP;
    const currentLevelXP = xp - previousLevelXP;
    const progress = (currentLevelXP / xpForNextLevel) * 100;

    return {
      level: currentLevel,
      progress,
      xpNeeded: nextLevelXP - xp,
    };
  };

  console.log('userXp', userXp);

  // const userLevel = useMemo(() => {
  //   if (!awsUser) return { level: 1, progress: 0, xpNeeded: 100 };
  //   return calculateLevelProgress(userXp.totalXp);
  // }, [awsUser]);

  const handleSignIn = () => {
    // Add returnTo parameter to return to the current page
    const returnTo = encodeURIComponent(router.asPath);
    window.location.href = `/api/auth/login?returnTo=${returnTo}`;
  };

  return (
    <div className='w-full h-full bg-white/10 rounded-lg flex flex-col items-center gap-5 p-5 text-center'>
      {awsUser ? (
        <>
          <div className='flex flex-col items-center'>
            <div className='w-full text-white font-bold'>{awsUser.name}</div>
            <div className='text-sm text-gray-300'>
              Total PXP: {userXp.totalXp.toLocaleString()}
            </div>
            <div className='relative w-40 h-40 mt-1'>
              {/* XP Progress Ring */}
              <svg className='w-full h-full transform -rotate-90'>
                <circle
                  cx='80'
                  cy='80'
                  r='64'
                  stroke='rgba(255, 255, 255, 0.2)'
                  strokeWidth='12'
                  fill='transparent'
                />
                <circle
                  cx='80'
                  cy='80'
                  r='64'
                  stroke='#F66733'
                  strokeWidth='12'
                  fill='transparent'
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 64 * (1 - userXp.progress / 100)
                  }`}
                  className='transition-all duration-700'
                />
              </svg>
              {/* Level Number */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <span className='text-4xl font-bold text-white'>
                  {userXp.level}
                </span>
                <span className='text-sm text-gray-100'>Level</span>
              </div>
            </div>
            {/* XP Info */}
            <div className='flex flex-col gap-0 items-center text-center mt-2'>
              <div className='text-xs font-medium text-gray-100'>
                {userXp.xpToNextLevel.toLocaleString()} PXP to next level
              </div>
              <div
                className='w-fit text-center bg-brand-indigo text-white text-sm font-bold px-3 py-0.5 rounded leading-none mt-1 flex items-center gap-1.5 cursor-pointer'
                onClick={() => {
                  router.push('/pxp');
                }}
              >
                <span className='text-xs'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='12'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-3 h-3'
                  >
                    <circle cx='12' cy='12' r='10' />
                    <path d='M12 16v-4' />
                    <path d='M12 8h.01' />
                  </svg>
                </span>
                <span className='text-xs'>BETA</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className='w-full text-white font-bold cursor-pointer'
            onClick={handleSignIn}
          >
            Sign in to earn PXP (+5)
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <div className='relative w-40 h-40'>
              {/* XP Progress Ring */}
              <svg className='w-full h-full transform -rotate-90'>
                <circle
                  cx='80'
                  cy='80'
                  r='64'
                  stroke='rgba(255, 255, 255, 0.2)'
                  strokeWidth='12'
                  fill='transparent'
                />
                <circle
                  cx='80'
                  cy='80'
                  r='64'
                  stroke='#F66733'
                  strokeWidth='12'
                  fill='transparent'
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 64 * (1 - userXp.progress / 100)
                  }`}
                  className='transition-all duration-700'
                />
              </svg>
              {/* Level Number */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <span className='text-4xl font-bold text-white'>0</span>
                <span className='text-sm text-gray-100'>Level</span>
              </div>
            </div>
            {/* XP Info */}
            <div className='flex flex-col gap-0 text-center'>
              <div className='text-sm font-medium text-gray-100'>
                100 PXP to next level
              </div>
              <div className='text-sm text-gray-300'>Total PXP: 0</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniProfile;
