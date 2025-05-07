import React from 'react';
import { LEVELS_CONFIG } from '../helpers/api';
import {
  Gi3DGlasses,
  GiDiploma,
  GiSecretBook,
  GiMailShirt,
  GiCutDiamond,
  GiLaurelsTrophy,
  GiMightyForce,
} from 'react-icons/gi';

const LevelProgressBar = ({ userXp }) => {
  // Default values if userXp is not provided
  const defaultUserXp = {
    level: 0,
    totalXp: 0,
    xpToNextLevel: LEVELS_CONFIG[0].xpNeeded,
  };

  // Use provided userXp or default values
  const currentUserXp = userXp || defaultUserXp;

  // Calculate total XP needed for level 30
  const maxXp = LEVELS_CONFIG[29].totalXPRequired;

  // Calculate current progress percentage based on level
  const progressPercentage = (currentUserXp.level / 29) * 100;

  // Get milestone levels (every 5 levels, excluding level 0, up to level 30)
  const milestoneLevels = LEVELS_CONFIG.filter(
    (level) => level.level > 0 && level.level <= 30 && level.level % 5 === 0
  );

  // Milestone rewards
  const milestoneRewards = {
    5: 'Certification App Waived',
    10: '15% off course purchase',
    15: '20% off campus swag',
    20: 'Advanced Learning Paths',
    25: 'Exclusive campus swag',
    30: '20% off certification purchase',
  };

  const levelIcons = {
    5: <GiDiploma size={40} className='text-white' />,
    10: <GiSecretBook size={40} className='text-white' />,
    15: <GiMailShirt size={40} className='text-white' />,
    20: <GiMightyForce size={40} className='text-white' />,
    25: <GiCutDiamond size={40} className='text-white' />,
    30: <GiLaurelsTrophy size={40} className='text-white' />,
  };
  return (
    <div className='w-full max-w-7xl mx-auto p-4'>
      <div className='relative'>
        {/* Top row - Milestone icons */}
        <div className='relative mb-4 h-16'>
          {milestoneLevels.map((level) => {
            const position =
              level.level === 30 ? 99.5 : (level.level / 29) * 100;
            const isCompleted = currentUserXp.level >= level.level;
            return (
              <div
                key={level.level}
                className='absolute transform -translate-x-1/2'
                style={{ left: `${position}%` }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
                    isCompleted ? 'bg-brand-green' : 'bg-clemson'
                  }`}
                >
                  {levelIcons[level.level]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle row - Progress bar */}
        <div className='relative h-8 bg-gray-200'>
          {/* Main progress bar */}
          <div
            className='absolute h-full bg-base-brand transition-all duration-500'
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Milestone Level markers */}
          {milestoneLevels.map((level) => {
            const position =
              level.level === 30 ? 99.5 : (level.level / 29) * 100;
            const isCompleted = currentUserXp.level >= level.level;
            return (
              <div
                key={level.level}
                className={`absolute top-0 w-2 h-full cursor-pointer transition-all duration-200 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`}
                style={{ left: `${position}%` }}
              />
            );
          })}

          {/* Current level indicator */}
          <div
            className='absolute top-0 w-2 h-8 bg-brand-green transform -translate-x-1/2'
            style={{ left: `${progressPercentage}%` }}
          />
        </div>

        {/* Bottom row - Level labels and rewards */}
        <div className='relative mt-4 h-16'>
          {milestoneLevels.map((level) => {
            const position =
              level.level === 30 ? 99.5 : (level.level / 29) * 100;
            const isCompleted = currentUserXp.level >= level.level;
            return (
              <div
                key={level.level}
                className='absolute transform -translate-x-1/2'
                style={{ left: `${position}%` }}
              >
                <div className='text-center'>
                  <div
                    className={`text-sm font-bold ${
                      isCompleted ? 'text-green-600' : 'text-gray-800'
                    }`}
                  >
                    Level {level.level}
                  </div>
                  <div
                    className={`text-xs max-w-[100px] ${
                      isCompleted ? 'text-green-600' : 'text-gray-600'
                    } mt-1`}
                  >
                    {milestoneRewards[level.level]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelProgressBar;
