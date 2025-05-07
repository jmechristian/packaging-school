import React, { useState } from 'react';
import { LEVELS_CONFIG } from '../helpers/api';

const LevelProgressBar = ({ userXp }) => {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  // Default values if userXp is not provided
  const defaultUserXp = {
    level: 0,
    totalXp: 0,
    xpToNextLevel: LEVELS_CONFIG[0].xpNeeded,
  };

  // Use provided userXp or default values
  const currentUserXp = userXp || defaultUserXp;

  // Calculate total XP needed for level 40
  const maxXp = LEVELS_CONFIG[39].totalXPRequired;

  // Calculate current progress percentage based on level
  const progressPercentage = (currentUserXp.level / 39) * 100;

  // Get milestone levels (every 5 levels, excluding level 0, up to level 40)
  const milestoneLevels = LEVELS_CONFIG.filter(
    (level) => level.level > 0 && level.level <= 40 && level.level % 5 === 0
  );

  // Milestone rewards (you can customize these)
  const milestoneRewards = {
    5: 'Unlock Basic Badges',
    10: 'Access to Premium Content',
    15: 'Exclusive Community Access',
    20: 'Advanced Learning Paths',
    25: 'Mentorship Program Access',
    30: 'Industry Expert Status',
    35: 'Master Class Access',
    40: 'Elite Member Status',
  };

  return (
    <div className='w-full max-w-7xl mx-auto p-4'>
      <div className='relative'>
        {/* Tooltips row */}
        <div className='flex justify-between mb-4'>
          {milestoneLevels.map((level) => (
            <div key={level.level} className='text-center'>
              <div className='bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-100 w-32 h-32 flex flex-col items-center'>
                <div className='text-sm font-bold text-gray-800 text-center'>
                  Level {level.level}
                </div>
                <div className='text-sm text-gray-600 text-center'>
                  {milestoneRewards[level.level]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar container */}
        <div className='relative h-8 bg-gray-200'>
          {/* Main progress bar */}
          <div
            className='absolute h-full bg-blue-500 transition-all duration-500'
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Milestone Level markers (every 5 levels) */}
          {milestoneLevels.map((level) => {
            // Calculate position based on level number (0-39)
            // For level 40, position it at 99.5% to keep it within bounds but closer to the edge
            const position =
              level.level === 40 ? 99.5 : (level.level / 39) * 100;

            return (
              <div
                key={level.level}
                className='absolute top-0 w-2 h-full cursor-pointer transition-all duration-200 bg-yellow-400'
                style={{ left: `${position}%` }}
                onMouseEnter={() => setHoveredLevel(level.level)}
                onMouseLeave={() => setHoveredLevel(null)}
              />
            );
          })}

          {/* Current level indicator - only show tooltip if level > 0 */}
          <div
            className='absolute top-0 w-2 h-8 bg-red-500 rounded-full transform -translate-x-1/2'
            style={{ left: `${progressPercentage}%` }}
          >
            {currentUserXp.level > 0 && (
              <div className='absolute -top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-4 py-3 rounded-lg shadow-xl z-20 border border-gray-100'>
                <div className='text-sm font-bold text-gray-800'>
                  Level {currentUserXp.level}
                </div>
                <div className='text-sm text-gray-600'>
                  {currentUserXp.totalXp.toLocaleString()} /{' '}
                  {maxXp.toLocaleString()} XP
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                  {currentUserXp.xpToNextLevel.toLocaleString()} XP to next
                  level
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Level range labels */}
        <div className='flex justify-between mt-2 text-xs text-gray-600'>
          <span>Level 0</span>
          <span>Level 40</span>
        </div>
      </div>
    </div>
  );
};

export default LevelProgressBar;
