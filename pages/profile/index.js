import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileEnrollments from '../../components/profile/ProfileEnrollments';
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
  TbLocation,
  TbWorld,
  TbEdit,
} from 'react-icons/tb';
import { updateAWSUser } from '../../helpers/api';
import { API, graphqlOperation } from 'aws-amplify';
import { onUpdateUser } from '../../src/graphql/subscriptions';
import { updateUser } from '../../features/auth/authslice';
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

const EditProfileForm = ({ onClose, user }) => {
  const [formData, setFormData] = useState({
    company: user?.company || '',
    title: user?.title || '',
    location: user?.location || '',
    bio: user?.bio || '',
    interests: user?.interests || '',
    goals: user?.goals || '',
    linkedin: user?.linkedin || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { awsUser } = useSelector((state) => state.auth);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await updateAWSUser({
        id: awsUser.id,
        ...formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-dark-dark rounded-lg p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Edit Profile</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block mb-2 text-sm font-medium text-slate-600'>
                Company
              </label>
              <input
                type='text'
                className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder='Your company name'
              />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-slate-600'>
                Title
              </label>
              <input
                type='text'
                className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder='Your job title'
              />
            </div>
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              Location
            </label>
            <input
              type='text'
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder='City, State, Country'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              LinkedIn Profile
            </label>
            <div className='flex items-center'>
              <span className='bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2.5 text-gray-500'>
                linkedin.com/in/
              </span>
              <input
                type='text'
                className='flex-1 p-2.5 rounded-r-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                placeholder='username'
              />
            </div>
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              Bio
            </label>
            <textarea
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder='Tell us about your professional background and experience...'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              Interests
            </label>
            <textarea
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
              value={formData.interests}
              onChange={(e) =>
                setFormData({ ...formData, interests: e.target.value })
              }
              placeholder='What areas of packaging are you most interested in?'
            />
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              Professional Goals
            </label>
            <textarea
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
              value={formData.goals}
              onChange={(e) =>
                setFormData({ ...formData, goals: e.target.value })
              }
              placeholder='What are your professional development goals?'
            />
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-6 py-2 bg-clemson text-white rounded-lg font-bold hover:bg-clemson/90 transition-colors disabled:opacity-50 flex items-center gap-2'
            >
              {isSubmitting ? (
                <>
                  <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withPageAuthRequired(function Page() {
  const dispatch = useDispatch();
  const { user, awsUser } = useSelector((state) => state.auth);
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
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    bio: '',
    interests: '',
    goals: '',
    linkedin: '',
  });

  const profileItems = [
    {
      title: 'Daily Streak',
      icon: TbBolt,
      value: 0,
    },
    {
      title: 'Total XP',
      icon: TbFlame,
      value: 0,
    },
    {
      title: 'Achievements',
      icon: TbTrophy,
      value: 0,
    },
    {
      title: 'Certificates',
      icon: TbFileCertificate,
      value: 0,
    },
    {
      title: 'Courses Enrolled',
      icon: TbBrain,
      value: 0,
    },
    {
      title: 'Lessons Completed',
      icon: TbBook,
      value: 0,
    },
  ];

  useEffect(() => {
    const getThinkificUser = async (email) => {
      const response = await fetch(
        `/api/thinkific/get-user?email=marketing@packagingschool.com`
      );
      const data = await response.json();

      // The userByEmail is nested inside data.data.data

      if (data?.data?.data?.userByEmail) {
        setThinkificUser(data.data.data.userByEmail);
      }
    };

    if (user && user.email) {
      getThinkificUser(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!awsUser?.onboardingComplete) {
      setShowOnboardingModal(true);
    }
  }, [awsUser]);

  useEffect(() => {
    let subscription;

    if (awsUser?.id) {
      // Subscribe to user updates
      subscription = API.graphql(
        graphqlOperation(onUpdateUser, { id: awsUser.id })
      ).subscribe({
        next: ({ value }) => {
          const updatedUser = value.data.onUpdateUser;
          // Update Redux store with new user data
          dispatch(updateUser(updatedUser));
        },
        error: (error) => console.error('Subscription error:', error),
      });
    }

    // Cleanup subscription on unmount
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [awsUser?.id, dispatch]);

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

  const userLevel = useMemo(() => {
    return calculateLevelProgress(currentUserXP);
  }, [currentUserXP]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAWSUser({
        id: awsUser.id,
        ...formData,
        onboardingComplete: true,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setShowOnboardingModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='flex flex-col w-full h-full relative bg-gray-100 border-b border-gray-200'>
      {showOnboardingModal && (
        <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center'>
          <div className='bg-white dark:bg-dark-dark rounded-lg p-5 max-w-4xl w-full'>
            <form
              onSubmit={handleSubmit}
              className='space-y-4 grid grid-cols-5 gap-6'
            >
              <div
                className='w-full h-full bg-cover bg-center col-span-2 flex flex-col justify-between p-5'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/reg-form-image.png')`,
                }}
              >
                <div className='flex flex-col gap-3'>
                  <div className='text-3xl font-bold text-white tracking-tight leading-[1.1]'>
                    Welcome to{' '}
                    <span className='text-white/60'>Packaging School</span>
                  </div>
                  <div className='text-white font-medium leading-snug'>
                    We are excited to have you onboard! Tell us a little bit
                    about yourself so our learning community can best serve you.
                  </div>
                </div>
                <div className='flex justify-end text-right text-white font-medium text-xs w-full'>
                  <div className='w-2/3'>
                    Thomas Roudebush, <br />
                    Certificate of Mastery in Packaging Management, 2018
                  </div>
                </div>
              </div>
              <div className='col-span-3 flex flex-col gap-4'>
                <div className='grid grid-cols-2 gap-4 w-full'>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-slate-600'>
                      Company
                    </label>
                    <input
                      type='text'
                      className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson'
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-slate-600'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson'
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-slate-600'>
                    Tell us about your background.
                  </label>
                  <textarea
                    className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-slate-600'>
                    What are you most interested in studying?
                  </label>
                  <textarea
                    className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
                    value={formData.interests}
                    onChange={(e) =>
                      setFormData({ ...formData, interests: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-slate-600'>
                    What are your education goals?
                  </label>
                  <textarea
                    className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-24'
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                  />
                </div>
                <div className='flex justify-end gap-3 mt-6 '>
                  <button
                    type='button'
                    onClick={() => setShowOnboardingModal(false)}
                    className='px-4 py-2  hover:text-gray-500 cursor-pointer'
                  >
                    Skip
                  </button>
                  <div className='relative group'>
                    <button
                      type='submit'
                      className={`px-6 py-2 rounded font-bold ${'bg-clemson text-white hover:bg-clemson/80'}`}
                    >
                      Let&apos;s go! (+50 PXP)
                    </button>
                    <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48'>
                      <div className='bg-gray-900 text-white text-xs rounded py-1.5 px-2 text-center'>
                        PXP (PackSchool Experience Points) help track your
                        learning progress, level up, and unlock bonuses.
                        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='grid grid-cols-12 w-full'>
        <div className='col-span-2 w-full h-full flex justify-end'>
          <div className='flex flex-col gap-4 h-full w-full bg-base-dark px-9 py-8'>
            <div
              className='aspect-[1/1] w-24 bg-cover bg-center'
              style={{
                backgroundImage: `url(${user?.picture})`,
              }}
            ></div>
            <div className='flex flex-col gap-0 leading-tight'>
              <div className='text-2xl font-bold text-gray-100'>
                {user?.name}
              </div>
              <div className='text-sm font-medium text-gray-300'>
                {user?.email}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='text-lg text-gray-100 leading-tight'>
                {awsUser?.title || 'Your Title'} at{' '}
                <span className='font-bold'>
                  {awsUser?.company || 'Your Company'}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <TbWorld className='text-gray-300' />
                <div className='text-gray-300'>
                  {awsUser?.location || 'Your Location'}
                </div>
              </div>
            </div>
            <button
              className='flex border bg-gray-100 border-gray-300 rounded-md px-2 py-1 w-fit items-center gap-2 text-xs text-gray-600 hover:text-clemson transition-colors'
              onClick={() => setShowEditModal(true)}
            >
              <TbEdit size={16} />
              <span>Edit Profile</span>
            </button>
            <hr className='w-full border-gray-400 mt-2.5' />
            <div className='flex flex-col gap-2 items-center'>
              <div className='relative w-40 h-40'>
                {/* XP Progress Ring */}
                <svg className='w-full h-full transform -rotate-90'>
                  <circle
                    cx='80'
                    cy='80'
                    r='64'
                    stroke='#e5e7eb'
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
                  <span className='text-4xl font-bold'>{userLevel.level}</span>
                  <span className='text-sm text-gray-100'>Level</span>
                </div>
              </div>
              {/* XP Info */}
              <div className='flex flex-col gap-0 text-center'>
                <div className='text-sm font-medium text-gray-100'>
                  {userLevel.xpNeeded.toLocaleString()} XP to next level
                </div>
                <div className='text-sm text-gray-300'>
                  Total XP: {currentUserXP.toLocaleString()}
                </div>
              </div>
            </div>
            <hr className='w-full border-gray-400 mt-2.5 mb-2.5' />
            <div className='flex flex-col gap-2.5'>
              {profileItems.map((item) => (
                <div
                  className='flex w-full justify-between items-center text-gray-100'
                  key={item.title}
                >
                  <div className='flex items-center gap-2'>
                    <item.icon size={16} />
                    <div className='font-medium'>{item.title}</div>
                  </div>
                  <div className='font-medium'>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* MAIN CONTENT */}
        <div className={`col-span-10 w-full h-full flex flex-col `}>
          <div className='relative'>
            <div className='flex flex-col w-full'>
              {/* Tab Content */}
              <div className='min-h-[600px] w-full bg-gray-100 p-7 rounded-b-lg'>
                <div className='max-w-7xl w-full grid grid-cols-12 gap-8'>
                  <div className='col-span-8 flex flex-col gap-8 h-full'>
                    <ProfileEnrollments
                      courses={thinkificUser && thinkificUser.courses.nodes}
                    />
                  </div>
                  <div className='col-span-4 flex flex-col gap-8 h-full'>
                    <div className='flex flex-col gap-6 bg-white rounded-lg p-6'>
                      <div className='font-bold text-gray-900 w-full'>
                        Achievements
                      </div>
                      <div className='flex flex-wrap gap-4'>
                        <div className='w-9 h-9 rounded-full bg-red-500'></div>
                        <div className='w-9 h-9 rounded-full bg-blue-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-green-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-yellow-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-purple-500'></div>
                        <div className='w-9 h-9 rounded-full bg-pink-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-indigo-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-teal-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-orange-500'></div>
                        <div className='w-9 h-9 rounded-full bg-cyan-500'></div>
                        <div className='w-9 h-9 rounded-full bg-lime-500'></div>
                        <div className='w-9 h-9 rounded-full bg-emerald-500/10'></div>
                        <div className='w-9 h-9 rounded-full bg-rose-500'></div>
                        <div className='w-9 h-9 rounded-full bg-fuchsia-500'></div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-white rounded-lg p-6'>
                      <div className='font-bold text-gray-900 w-full'>
                        Learning Paths
                      </div>
                      <div className='flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-lg p-6'>
                        <div>No Paths Selected</div>
                        <button className='text-sm  bg-gray-900 px-4 py-2 rounded-lg text-white'>
                          Select a Path
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-white rounded-lg p-6'>
                      <div className='font-bold text-gray-900 w-full'>
                        Saved Lessons
                      </div>
                      <div className='flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-lg p-6'>
                        <div>No courses or certificates selected</div>
                        <button className='text-sm  bg-gray-900 px-4 py-2 rounded-lg text-white'>
                          Browse Library
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-white rounded-lg p-6'>
                      <div className='font-bold text-gray-900 w-full'>
                        Wish List
                      </div>
                      <div className='flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-lg p-6'>
                        <div>No courses or certificates selected</div>
                        <button className='text-sm  bg-gray-900 px-4 py-2 rounded-lg text-white'>
                          Select Curriculum
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditProfileForm onClose={() => setShowEditModal(false)} user={user} />
      )}
    </div>
  );
});
