import React, { useState, useEffect } from 'react';
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
import { showToast } from '../../features/navigation/navigationSlice';
import { useRouter } from 'next/router';
import EditProfileForm from './EditProfileForm';
import ProfilePaths from './ProfilePaths';
import ProfileApplications from './ProfileApplications';
import SavedLessons from './SavedLessons';
import ProfileWishlist from './ProfileWishlist';
const ProfileDashboard = ({ refreshUser, isLoading }) => {
  const { awsUser, thinkificUser, user, userXp } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    bio: '',
    interests: '',
    goals: '',
  });

  const profileItems = [
    {
      title: 'Daily Streak',
      icon: TbBolt,
      value: awsUser?.dailyStreak || 1,
    },

    // {
    //   title: 'Achievements',
    //   icon: TbTrophy,
    //   value: 0,
    // },
    // {
    //   title: 'Certificates',
    //   icon: TbFileCertificate,
    //   value: 0,
    // },
    {
      title: 'Courses Completed',
      icon: TbBrain,
      value: 0,
    },
    {
      title: 'Lessons Completed',
      icon: TbBook,
      value: awsUser?.lessonsCompleted?.items?.length || 0,
    },
  ];
  //Onboarding Modal
  useEffect(() => {
    if (awsUser) {
      if (
        awsUser.onboardingComplete === null ||
        awsUser.onboardingComplete === false
      ) {
        setShowOnboardingModal(true);
        // Initialize form data when opening onboarding modal
        setFormData({
          company: awsUser.company || '',
          title: awsUser.title || '',
          location: awsUser.location || '',
          bio: awsUser.bio || '',
          interests: awsUser.interests || '',
          goals: awsUser.goals || '',
          linkedin: awsUser.linkedin || '',
        });
      } else {
        setShowOnboardingModal(false);
      }
    }
  }, [awsUser]);

  const [activeTab, setActiveTab] = useState('courses');

  const tabs = [
    {
      label: 'Your Courses',
      value: 'courses',
    },
    {
      label: 'Applications',
      value: 'certificates',
    },
    {
      label: 'Paths',
      value: 'paths',
    },
    {
      label: 'Wishlist',
      value: 'wishlist',
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
      label: 'Profile',
      value: 'profile',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <ProfileEnrollments
            courses={thinkificUser && thinkificUser.courses.nodes}
            email={user?.email}
            refreshUser={refreshUser}
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
        return <ProfilePaths paths={awsUser?.learningPathProgress?.items} />;
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    const requiredFields = ['company', 'title', 'bio', 'interests', 'goals'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert('Please fill in all required fields: ' + emptyFields.join(', '));
      return;
    }

    try {
      // First update AWS user
      await updateAWSUser({
        id: awsUser.id,
        ...formData,
        onboardingComplete: true,
        onboardingCompleteDate: new Date().toISOString(),
        psXp: awsUser.psXp + 50,
      });

      // Then update Thinkific user
      try {
        const thinkificResponse = await updateThinkificUser({
          id: thinkificUser.id,
          ...formData,
        });

        if (!thinkificResponse.ok) {
          console.error('Thinkific update failed, but AWS update succeeded');
        }

        dispatch(
          showToast({
            message: 'Profile updated successfully!',
            description: 'You have earned 50 PXP',
          })
        );
      } catch (thinkificError) {
        // Log Thinkific error but don't prevent completion
        console.error('Error updating Thinkific profile:', thinkificError);
      }

      setShowOnboardingModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again.');
    }
  };

  const handleSkip = async () => {
    try {
      const response = await updateAWSUser({
        id: awsUser.id,
        onboardingComplete: true,
        onboardingCompleteDate: new Date().toISOString(),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setShowOnboardingModal(false);
  };

  const updateLoginStreak = async () => {
    if (!awsUser) return;

    const now = new Date();
    const lastLogin = new Date(awsUser.lastLogin);

    // Reset time to midnight for accurate day comparison
    now.setHours(0, 0, 0, 0);
    lastLogin.setHours(0, 0, 0, 0);

    const timeDiff = now.getTime() - lastLogin.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    let newStreak = awsUser.dailyStreak || 1;

    // If last login was yesterday, increment streak
    if (daysDiff === 1) {
      newStreak += 1;
    }
    // If last login was more than 1 day ago, reset streak
    else if (daysDiff > 1) {
      newStreak = 1;
    }
    // If last login was today, keep current streak
    else if (daysDiff === 0) {
      return; // No need to update
    }

    try {
      await updateAWSUser({
        id: awsUser.id,
        lastLogin: new Date().toISOString(),
        dailyStreak: newStreak,
      });
    } catch (error) {
      console.error('Error updating login streak:', error);
    }
  };

  useEffect(() => {
    updateLoginStreak();
  }, [awsUser]); // Run once when component mounts

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
                    onClick={() => handleSkip()}
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
      <div className='grid grid-cols-12 w-full max-w-7xl mx-auto overflow-hidden gap-6 mb-8'>
        <div className='col-span-2 w-full flex justify-end'>
          <div className='flex flex-col gap-2.5 py-8'>
            <div
              className='aspect-[1/1] w-20 bg-cover bg-center rounded-full border-2 border-clemson  bg-gray-600'
              style={{
                backgroundImage: `url(${user?.picture})`,
              }}
            ></div>
            <div className='flex flex-col gap-0 leading-tight'>
              <div className='text-lg font-bold text-slate-700'>
                {user?.name}
              </div>
              <div className='text-sm font-medium text-slate-500'>
                {user?.email}
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
                  onClick={() => setActiveTab(tab.value)}
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
          className={`col-span-10 w-full flex flex-col bg-white p-6 rounded-lg mt-8`}
        >
          <div className='w-full h-full'>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
