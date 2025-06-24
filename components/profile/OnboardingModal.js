import React, { useState } from 'react';
import {
  updateAWSUser,
  updateThinkificUser,
  handleSSO,
} from '../../helpers/api';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MdError } from 'react-icons/md';
import { useUser } from '@auth0/nextjs-auth0/client';

export const OnboardingModal = ({ onClose, refreshUser }) => {
  const { user } = useUser();
  const { awsUser, thinkificUser } = useSelector((state) => state.auth);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: awsUser.name.split(' ')[0],
    lastName: awsUser.name.split(' ')[1],
    company: awsUser.company,
    title: awsUser.title,
    bio: awsUser.bio,
    interests: awsUser.interests,
    goals: awsUser.goals,
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://packaging-school-git-dev-packaging-school.vercel.app';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    const requiredFields = ['firstName', 'lastName'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      setIsError(true);
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      // First update AWS user
      await updateAWSUser({
        id: awsUser.id,
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.company,
        title: formData.title,
        bio: formData.bio,
        interests: formData.interests,
        goals: formData.goals,
        onboardingComplete: true,
        onboardingCompleteDate: new Date().toISOString(),
        psXp: awsUser.psXp + 50,
      });

      await fetch(`${baseUrl}/api/update-auth0-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.sub,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      if (thinkificUser) {
        // Then update Thinkific user
        try {
          const thinkificResponse = await updateThinkificUser({
            id: thinkificUser.id,
            ...formData,
          });

          if (!thinkificResponse.ok) {
            console.error('Thinkific update failed, but AWS update succeeded');
          }
        } catch (thinkificError) {
          // Log Thinkific error but don't prevent completion
          console.error('Error updating Thinkific profile:', thinkificError);
        }
      } else {
        try {
          await fetch(`${baseUrl}/api/thinkific/create-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: awsUser.email,
              first_name: formData.firstName,
              last_name: formData.lastName,
            }),
          });
          await fetch(`${baseUrl}/api/update-auth0-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.sub,
              firstName: formData.firstName,
              lastName: formData.lastName,
            }),
          });
          const ssoUrl = await handleSSO({
            email: awsUser.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            returnTo:
              'https://learn.packagingschool.com/enrollments?variant=test-upgrade',
          });
          window.location.href = ssoUrl;
          console.log('ssoUrl', ssoUrl);
        } catch (error) {
          console.error('Error creating Thinkific user:', error);
        }
      }
      await refreshUser();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsError(true);
      setErrorMessage(
        'There was an error updating your profile. Please try again.'
      );
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-dark-dark rounded-lg p-5 max-w-5xl w-full'>
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
                We are excited to have you onboard! Tell us a little bit about
                yourself so our learning community can best serve you.
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
            <div className='grid grid-cols-2 gap-5 w-full'>
              <div>
                <div className='flex justify-between items-center w-full mb-1.5'>
                  <label className='block text-sm font-medium text-slate-600'>
                    First Name<span className='text-red-500'>*</span>
                  </label>
                  <div className='text-xs text-red-500 mr-1'>Required</div>
                </div>
                <input
                  type='text'
                  className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <div className='flex justify-between items-center w-full mb-1.5'>
                  <label className='block text-sm font-medium text-slate-600'>
                    Last Name<span className='text-red-500'>*</span>
                  </label>
                  <div className='text-xs text-red-500 mr-1'>Required</div>
                </div>
                <input
                  type='text'
                  className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson'
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 w-full'>
              <div>
                <label className='block mb-1.5 text-sm font-medium text-slate-600'>
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
              <label className='block mb-1.5 text-sm font-medium text-slate-600'>
                Tell us about your background.
              </label>
              <textarea
                className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-20'
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            <div>
              <label className='block mb-1.5 text-sm font-medium text-slate-600'>
                What are you most interested in studying?
              </label>
              <textarea
                className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-20'
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
              />
            </div>
            <div>
              <label className='block mb-1.5 text-sm font-medium text-slate-600'>
                What are your education goals?
              </label>
              <textarea
                className='w-full p-2 rounded border border-gray-500 focus:border-clemson focus:ring-1 focus:ring-clemson h-20'
                value={formData.goals}
                onChange={(e) =>
                  setFormData({ ...formData, goals: e.target.value })
                }
              />
            </div>

            <div className='flex items-center justify-between mt-4 w-full'>
              {isError && (
                <div className='text-sm text-red-500 flex items-center gap-1 w-2/3'>
                  <MdError className='w-4 h-4' />
                  <div className='text-sm'>{errorMessage}</div>
                </div>
              )}
              <div className='flex justify-end gap-2 w-full'>
                <button
                  type='button'
                  onClick={() => router.push('/api/auth/logout')}
                  className='px-4 py-2 text-sm  hover:text-gray-500 cursor-pointer'
                >
                  Sign Out
                </button>
                <div className='relative group'>
                  <button
                    type='submit'
                    className={`px-6 py-2 rounded font-bold ${'bg-clemson text-white hover:bg-clemson/80'}`}
                  >
                    Let&apos;s go!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
