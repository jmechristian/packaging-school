import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LEVELS_CONFIG } from '../../helpers/api';

const MiniProfile = () => {
  const { awsUser } = useSelector((state) => state.auth);
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

  const userLevel = useMemo(() => {
    if (!awsUser) return { level: 1, progress: 0, xpNeeded: 100 };
    return calculateLevelProgress(awsUser.totalXp);
  }, [awsUser]);

  const handleSignIn = () => {
    // Add returnTo parameter to return to the current page
    const returnTo = encodeURIComponent(router.asPath);
    window.location.href = `/api/auth/login?returnTo=${returnTo}`;
  };

  return (
    <div className='w-full h-full bg-white/10 rounded-lg flex flex-col items-center gap-5 p-5 text-center'>
      {awsUser ? (
        <>
          <div className='w-full text-white font-bold'>{awsUser.name}</div>
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
                    2 * Math.PI * 64 * (1 - userLevel.progress / 100)
                  }`}
                  className='transition-all duration-700'
                />
              </svg>
              {/* Level Number */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <span className='text-4xl font-bold text-white'>
                  {userLevel.level}
                </span>
                <span className='text-sm text-gray-100'>Level</span>
              </div>
            </div>
            {/* XP Info */}
            <div className='flex flex-col gap-0 text-center'>
              <div className='text-sm font-medium text-gray-100'>
                {userLevel.xpNeeded.toLocaleString()} XP to next level
              </div>
              <div className='text-sm text-gray-300'>
                Total XP: {awsUser.totalXp.toLocaleString()}
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
                    2 * Math.PI * 64 * (1 - userLevel.progress / 100)
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
                100 XP to next level
              </div>
              <div className='text-sm text-gray-300'>Total XP: 0</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniProfile;
