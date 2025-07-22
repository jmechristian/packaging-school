import React, { useState, useEffect, useMemo } from 'react';
import {
  TbWorld,
  TbEdit,
  TbBolt,
  TbFlame,
  TbTrophy,
  TbFileCertificate,
  TbBrain,
  TbBook,
} from 'react-icons/tb';
import ProfileEnrollments from './ProfileEnrollments';
import { updateAWSUser, updateThinkificUser } from '../../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import CompletedLesson from '../../components/profile/CompletedLesson';

import { useRouter } from 'next/router';
import EditProfileForm from './EditProfileForm';
import ProfilePaths from './ProfilePaths';
import ProfileApplications from './ProfileApplications';
import SavedLessons from './SavedLessons';
import ProfileWishlist from './ProfileWishlist';
const ProfileDashboard = ({ refreshUser, isLoading, navigateToThinkific }) => {
  const { awsUser, thinkificUser, user, userXp } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('courses');

  // Add effect to sync with URL on mount and URL changes
  useEffect(() => {
    const tabFromUrl = router.query.tab;
    if (tabFromUrl && tabs.some((tab) => tab.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [router.query.tab]);

  // Only handle tab change, do NOT call refreshUser or set users to null
  const handleTabChange = (tabValue, tabType) => {
    setActiveTab(tabValue);
    // Update URL without full page reload
    if (tabType === 'external') {
      navigateToThinkific(tabValue, tabValue);
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tab: tabValue },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const tabs = [
    {
      label: 'Enrollments',
      value: 'courses',
    },
    {
      label: 'Certificates',
      value: 'https://learn.packagingschool.com/account/certificates',
      type: 'external',
    },
    {
      label: 'Applications',
      value: 'certificates',
    },
    {
      label: ' Learning Paths',
      value: 'paths',
    },

    {
      label: 'Lessons Completed',
      value: 'lessonsCompleted',
    },
    {
      label: 'Lessons Saved',
      value: 'lessonsSaved',
    },
    {
      label: 'Wishlist',
      value: 'wishlist',
    },
    {
      label: 'Profile',
      value: 'profile',
    },
    {
      label: 'Billing Information',
      value: 'https://learn.packagingschool.com/account/billing',
      type: 'external',
    },
  ];

  // Memoize tab content to avoid unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'courses':
        return (
          <ProfileEnrollments
            courses={thinkificUser && thinkificUser.courses.nodes}
            email={user?.email}
            refreshUser={refreshUser}
            navigateToThinkific={navigateToThinkific}
          />
        );
      case 'certificates':
        return (
          <ProfileApplications
            CMPM={awsUser?.cmpmFormID}
            CPS={awsUser?.cpsFormID}
          />
        );
      case 'paths':
        return <ProfilePaths paths={awsUser.learningPathProgress.items} />;
      case 'wishlist':
        return (
          <ProfileWishlist
            courses={awsUser?.wishlist?.items}
            refreshUser={refreshUser}
            awsUser={awsUser}
          />
        );
      case 'lessonsCompleted':
        return <CompletedLesson lessons={awsUser?.lessonsCompleted?.items} />;
      case 'lessonsSaved':
        return <SavedLessons lessons={awsUser?.savedLessons} />;
      case 'profile':
        return (
          <EditProfileForm
            awsUser={awsUser}
            thinkificUser={thinkificUser}
            refreshUser={refreshUser}
          />
        );
      default:
        return null;
    }
  }, [
    activeTab,
    thinkificUser,
    awsUser,
    user,
    refreshUser,
    navigateToThinkific,
  ]);

  if (!awsUser || !thinkificUser) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-clemson border-t-transparent rounded-full animate-spin'></div>
          <div className='text-lg font-medium text-gray-600'>
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full relative bg-gray-100 border-b border-gray-200'>
      <div className='grid grid-cols-1 lg:!grid-cols-12 w-full max-w-7xl mx-auto overflow-hidden gap-4 mb-8'>
        <div className='col-span-1 lg:!col-span-2 w-full flex justify-center lg:justify-end'>
          <div className='flex flex-col gap-2.5 py-5 lg:!py-8'>
            <div
              className='aspect-[1/1] w-16 bg-cover bg-center rounded-full border-2 border-clemson  bg-gray-600'
              style={{
                backgroundImage: `url(${user?.picture})`,
              }}
            ></div>
            <div className='flex flex-col gap-0 leading-tight'>
              <div className='text-lg font-bold text-slate-700 break-all'>
                {awsUser?.name}
              </div>
              <div className='text-sm font-medium text-slate-500 break-all'>
                {awsUser?.email}
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='text-sm text-slate-700 leading-tight'>
                {awsUser?.title || 'Your Title'} at{' '}
                <span className='font-bold'>
                  {awsUser?.company || 'Your Company'}
                </span>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <TbWorld className='text-slate-700' />
                <div className='text-slate-700'>
                  {awsUser?.location || 'Your Location'}
                </div>
              </div>
            </div>
            {/* <button
              className='flex underlinerounded-md text-white items-center gap-2 text-xs hover:text-clemson transition-colors'
              onClick={() => setShowEditModal(true)}
            >
              <TbEdit size={16} />
              <span>Edit Profile</span>
            </button> */}
            <hr className='w-full border-gray-400 my-2.5' />
            <div className='flex flex-col gap-2.5'>
              {tabs.map((tab) => (
                <div
                  className='flex w-full justify-between items-center text-gray-700'
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value, tab.type)}
                >
                  <div
                    className={`font-medium text-sm w-full transition-all duration-300 cursor-pointer ${
                      activeTab === tab.value
                        ? 'text-white bg-slate-500 p-2 rounded'
                        : ''
                    }`}
                  >
                    {tab.label}
                  </div>
                </div>
              ))}
            </div>
            <hr className='w-full border-gray-400 my-2.5' />

            <div className='flex flex-col gap-2.5'>
              {profileItems.map((item) => (
                <div
                  className='flex w-full justify-between items-center text-gray-700'
                  key={item.title}
                >
                  <div className='flex items-center gap-2'>
                    <item.icon size={16} />
                    <div className='font-medium text-sm'>{item.title}</div>
                  </div>
                  <div className='font-medium text-sm'>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* MAIN CONTENT */}
        <div
          className={`col-span-1 lg:!col-span-10 w-full flex flex-col bg-white p-6 rounded-lg lg:mt-8`}
        >
          <div className='w-full h-full'>{tabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
