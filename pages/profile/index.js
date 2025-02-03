import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProfileCourses from '../../components/profile/ProfileCourses';
import {
  TbFlame,
  TbBolt,
  TbTrophy,
  TbFileCertificate,
  TbBrain,
  TbBook,
} from 'react-icons/tb';

const LEVELS_CONFIG = [
  {
    level: 1,
    xpNeeded: 100,
    totalXPRequired: 100,
  },
  {
    level: 2,
    xpNeeded: 283,
    totalXPRequired: 383,
  },
  {
    level: 3,
    xpNeeded: 520,
    totalXPRequired: 903,
  },
  {
    level: 4,
    xpNeeded: 800,
    totalXPRequired: 1703,
  },
  {
    level: 5,
    xpNeeded: 1118,
    totalXPRequired: 2821,
  },
  {
    level: 6,
    xpNeeded: 1470,
    totalXPRequired: 4291,
  },
  {
    level: 7,
    xpNeeded: 1852,
    totalXPRequired: 6143,
  },
  {
    level: 8,
    xpNeeded: 2263,
    totalXPRequired: 8406,
  },
  {
    level: 9,
    xpNeeded: 2700,
    totalXPRequired: 11106,
  },
  {
    level: 10,
    xpNeeded: 3162,
    totalXPRequired: 14268,
  },
  {
    level: 11,
    xpNeeded: 3648,
    totalXPRequired: 17916,
  },
  {
    level: 12,
    xpNeeded: 4157,
    totalXPRequired: 22073,
  },
  {
    level: 13,
    xpNeeded: 4687,
    totalXPRequired: 26760,
  },
  {
    level: 14,
    xpNeeded: 5238,
    totalXPRequired: 31998,
  },
  {
    level: 15,
    xpNeeded: 5809,
    totalXPRequired: 37807,
  },
  {
    level: 16,
    xpNeeded: 6400,
    totalXPRequired: 44207,
  },
  {
    level: 17,
    xpNeeded: 7009,
    totalXPRequired: 51216,
  },
  {
    level: 18,
    xpNeeded: 7637,
    totalXPRequired: 58853,
  },
  {
    level: 19,
    xpNeeded: 8282,
    totalXPRequired: 67135,
  },
  {
    level: 20,
    xpNeeded: 8944,
    totalXPRequired: 76079,
  },
  {
    level: 21,
    xpNeeded: 10733,
    totalXPRequired: 86812,
  },
  {
    level: 22,
    xpNeeded: 12880,
    totalXPRequired: 99692,
  },
  {
    level: 23,
    xpNeeded: 15456,
    totalXPRequired: 115148,
  },
  {
    level: 24,
    xpNeeded: 18547,
    totalXPRequired: 133695,
  },
  {
    level: 25,
    xpNeeded: 22256,
    totalXPRequired: 155951,
  },
  {
    level: 26,
    xpNeeded: 26707,
    totalXPRequired: 182658,
  },
  {
    level: 27,
    xpNeeded: 32049,
    totalXPRequired: 214707,
  },
  {
    level: 28,
    xpNeeded: 38459,
    totalXPRequired: 253166,
  },
  {
    level: 29,
    xpNeeded: 46150,
    totalXPRequired: 299316,
  },
  {
    level: 30,
    xpNeeded: 55381,
    totalXPRequired: 354697,
  },
  // ... add more levels as needed
];

export default withPageAuthRequired(function Page() {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(0);
  const [currentXP, setCurrentXP] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [totalLessons, setTotalLessons] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [totalAchievements, setTotalAchievements] = useState([]);
  const [thinkificUser, setThinkificUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [isAchievementProgress, setIsAchievementProgress] = useState([]);
  const [shownAchievements, setShownAchievements] = useState(new Set());

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getThinkificUser = async (email) => {
      const response = await fetch(
        `/api/thinkific/get-user?email=marketing@packagingschool.com`
      );
      const data = await response.json();

      // The userByEmail is nested inside data.data.data

      if (data?.data?.data?.userByEmail) {
        setThinkificUser(data.data.data.userByEmail);
        console.log('thinkificUser', data.data.data.userByEmail);
      }
    };

    if (user && user.email) {
      getThinkificUser(user.email);
    }
  }, [user]);

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

  const calculateCourseXP = useCallback((price) => {
    if (price > 0) {
      // Tiered multiplier system
      if (price <= 50) {
        return Math.round(price * 0.5);
      } else if (price <= 150) {
        return Math.round(price * 0.6);
      } else {
        return Math.round(price * 0.7);
      }
    } else {
      return Math.round(15);
    }
  }, []);

  const calculateLessonXP = (price) => {
    if (price > 0) {
      return Math.round(price * 0.5); // 0.5 XP per $1 for lessons
    } else {
      return Math.round(5); // Use base XP for free lessons
    }
  };

  const userCourses = useMemo(() => {
    if (!thinkificUser?.courses?.nodes) return [];
    const courseIds = thinkificUser.courses.nodes.map((course) =>
      course.id.toString()
    );
    return courseIds;
  }, [thinkificUser]);

  const currentUserXP = useMemo(() => {
    if (!thinkificUser?.courses?.nodes) return 0;

    return thinkificUser.courses.nodes.reduce((total, course) => {
      const price = course.product?.primaryPrice?.price || 0;
      return total + calculateCourseXP(price);
    }, 0);
  }, [thinkificUser, calculateCourseXP]);

  return (
    <div className='flex flex-col w-full h-full relative bg-gray-800'>
      <div className={`w-full pt-16 flex flex-col gap-16`}>
        <div className='grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto w-full'>
          {/* LEFT SIDE */}
          <div className='flex items-center gap-5 w-full h-full'>
            <div className='flex flex-col justify-end gap-4 w-full h-full'>
              <div className='flex items-center gap-6'>
                <div className='w-[90px] h-[90px] overflow-hidden rounded-full ring-4 ring-clemson ml-2'>
                  <img
                    src={user?.picture || ''}
                    alt='Profile'
                    className='w-full h-full object-cover'
                    loading='lazy'
                    onError={(e) => {
                      e.currentTarget.src = ''; // Fallback image
                    }}
                  />
                </div>
                <div className='flex flex-col gap-0 leading-snug'>
                  <div className='text-white text-2xl font-semibold leading-none'>
                    {user?.name}
                  </div>
                  <div className='text-white text-sm'>{user?.email}</div>
                  <div className='text-gray-500 text-sm'>
                    Web Director / Packaging School
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-lg p-3 max-w-lg'>
                <div className='text-yellow-500 text-sm bg-gray-700 dark:bg-dark-mid px-2 py-1 rounded font-bold w-24 flex flex-col items-center justify-center'>
                  <div>Level</div>{' '}
                  <div className='text-white text-2xl font-bold'>
                    {calculateLevelProgress(currentUserXP).level}
                  </div>
                </div>
                <div className='flex flex-col gap-0 mt-1 w-full'>
                  <div className='w-full h-2.5 bg-gray-200 rounded-full'>
                    <div
                      className='h-2.5 bg-green-500 rounded-full'
                      style={{
                        width: `${
                          calculateLevelProgress(currentUserXP).progress
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className='text-gray-200 text-xs text-right mt-1.5 mr-1'>
                    <span className='text-green-500'>
                      {calculateLevelProgress(currentUserXP).xpNeeded} Pack XP
                    </span>{' '}
                    till level {calculateLevelProgress(currentUserXP).level + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* RIGHT SIDE */}
            <div className='grid grid-cols-3 gap-2.5 w-full'>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase font-medium'>
                  Daily Streak
                </div>
                <div className='flex items-center gap-1'>
                  <div className='text-white/60'>
                    <TbFlame className='text-red-400 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>10</div>
                </div>
              </div>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase font-medium'>
                  Total XP
                </div>
                <div className='flex items-center gap-1'>
                  <div className='text-white/60'>
                    <TbBolt className='text-yellow-400 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>
                    {currentUserXP ? currentUserXP : 0}
                  </div>
                </div>
              </div>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase font-medium'>
                  Achievements
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-white/60'>
                    <TbTrophy className='text-amber-500 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>
                    {totalAchievements.length}
                  </div>
                </div>
              </div>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase font-medium'>
                  Certificates
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-white/60'>
                    <TbFileCertificate className='text-indigo-300 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>0</div>
                </div>
              </div>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase'>
                  Courses Enrolled
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-white/60'>
                    <TbBrain className='text-pink-500 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>
                    {userCourses ? userCourses.length : 0}
                  </div>
                </div>
              </div>
              <div className='rounded-xl bg-dark-dark p-4 flex flex-col gap-2 items-center justify-center shadow-lg'>
                <div className='text-white/60 text-xs uppercase'>
                  Lessons Complete
                </div>
                <div className='flex items-center gap-3'>
                  <div className='text-white/60'>
                    <TbBook className='text-green-500 w-6 h-6' />
                  </div>
                  <div className='text-white font-medium text-3xl'>
                    {totalLessons.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative'>
          <div className='flex flex-col w-full'>
            {/* Tab Navigation */}
            <div className='w-full max-w-6xl mx-auto dark:bg-dark-dark flex items-center py-3'>
              <nav className='flex gap-4 items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {[
                    'My Courses',
                    'My Certificates',
                    'Learning Paths',
                    'Achievements',
                    'Saved Content',
                    'Wishlist',
                  ].map((tab, index) => (
                    <button
                      key={tab}
                      className={`py-2 px-2 text-sm transition-colors relative
                  ${
                    activeTab === index
                      ? 'text-clemson font-bold'
                      : ' hover:text-clemson text-white/70 font-medium'
                  }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Tab Content */}
            <div className='min-h-[600px] w-full bg-white dark:bg-dark-mid'>
              <div className='max-w-6xl mx-auto py-16'>
                {/* My Courses */}
                {activeTab === 0 && (
                  <div className='flex flex-col gap-5'>
                    <ProfileCourses
                      userCourses={thinkificUser?.courses?.nodes}
                    />
                  </div>
                )}
                {/* Learning Paths */}
                {/* {activeTab === 2 && (
                <div className='flex flex-col gap-4'>
                  <div className='grid grid-cols-4 gap-8'>
                    <PathCard
                      title='Packaging Science'
                      description='Ideal for packaging pros in sales, marketing, engineering, and more. Gain industry insights with 1-year access to expand your expertise!'
                      courses={[
                        'ff174f01-5f76-486c-8d7a-849d6d3ff914',
                        '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
                        '2418801f-a352-4eae-a394-87a5c0c55f79',
                        '4e6c079e-b396-4762-8b7f-4fa4dea64969',
                        'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
                        '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
                        '431ce262-cf48-4a7c-8ff1-2909f548149b',
                        '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
                        'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
                        '73139212-0b15-4d96-9942-1757fa058fdf',
                        'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
                      ]}
                      userCourses={userCourses}
                    />
                    <PathCard
                      title='Material Mastery'
                      description='Perfect for professionals seeking 1-year access to deep insights on corrugated, plastics, and other packaging materials expertise!'
                      courses={[
                        '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
                        '2418801f-a352-4eae-a394-87a5c0c55f79',
                        'a8cced4f-d854-4bb5-9650-c55e686a6498',
                        '62fe0081-a7e4-4eff-bc36-9fa07786c91f',
                        '4e6c079e-b396-4762-8b7f-4fa4dea64969',
                        '08855f6b-b7c3-466d-a649-0cdeaf40bacb',
                        'f63dbfb7-6305-46bb-9845-cf7f17376491',
                        'ee2f8da3-caca-4300-8e13-6aab4ee7bfb1',
                        '73139212-0b15-4d96-9942-1757fa058fdf',
                      ]}
                      userCourses={userCourses}
                    />
                    <PathCard
                      title='Automotive Packaging Specialist'
                      description='Ideal for professionals in automotive packaging design. Gain 1-year access to insights on efficiency, innovation, and industry expertise!'
                      courses={[
                        '86d25aa4-620b-4632-ac11-60f7bab6f3a8',
                        'a0353804-b928-4513-bde6-3ba429804ace',
                        '5c1db625-5367-45b5-8c29-a78beaeb9371',
                        '35844454-d9a7-4e50-ab62-2298e53764c9',
                        '08855f6b-b7c3-466d-a649-0cdeaf40bacb',
                        'e277266c-e0b5-403e-ae0e-a06312da7a19',
                        '401f89b2-6967-40a1-9131-dff8293cbaa3',
                        '8c90539f-5dc5-48ba-a9ab-7e3fa186336f',
                        '7ee53b3f-3f91-4b45-9281-5623ddbded33',
                        'd61653c9-80b1-492a-9fde-88f6059ca37a',
                        '109b5c0b-b533-483e-b445-33955d59caef',
                      ]}
                      userCourses={userCourses}
                    />
                    <PathCard
                      title='Form & Function'
                      description='Explore the intersection of creativity and engineering with courses on structural design, materials, and innovation in packaging solutions.'
                      courses={[
                        'ff174f01-5f76-486c-8d7a-849d6d3ff914',
                        '431ce262-cf48-4a7c-8ff1-2909f548149b',
                        'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
                        '5928b3b2-dd49-4d5c-86ea-e343b7ffaa75',
                        '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
                        '7dcbae38-2cf5-4d71-9266-4f11cbb0d2ff',
                        '8cffe7f0-c08a-456f-8e5b-962f4a30ab5c',
                        '3f9643f5-a1cb-43af-a35e-e1245b2525d9',
                      ]}
                      userCourses={userCourses}
                    />
                  </div>
                </div>
              )} */}

                {/* Achievements */}
                {/* {activeTab === 3 && (
                <div className='flex flex-col gap-4'>
                  <div className='grid grid-cols-4 gap-5'>
                    {achievements.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        userCourses={totalCourses}
                      />
                    ))}
                  </div>
                </div>
              )} */}
                {/* Saved Content */}
                {/* {activeTab === 4 && (
                <div className='flex flex-col gap-2'>
                  {totalLessons.map((lesson) => (
                    <div key={lesson}>{lesson}</div>
                  ))}
                </div>
              )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
