import React, { useState } from 'react';
import { updateAWSUser, updateThinkificUser } from '../../helpers/api';
import { useUser } from '@auth0/nextjs-auth0/client';

const EditProfileForm = ({ awsUser, thinkificUser }) => {
  const { user } = useUser();

  const awsRawName = awsUser?.name || '';
  const awsLooksLikeEmail = awsRawName.includes('@');
  const awsNameParts = !awsLooksLikeEmail ? awsRawName.split(' ') : [];

  const authRawName = user?.name || '';
  const authLooksLikeEmail = authRawName.includes('@');
  const authNameParts = !authLooksLikeEmail ? authRawName.split(' ') : [];

  const initialFirstName =
    user?.given_name ||
    authNameParts[0] ||
    awsNameParts[0] ||
    '';

  const initialLastName =
    user?.family_name ||
    (authNameParts.length > 1 ? authNameParts.slice(1).join(' ') : '') ||
    (awsNameParts.length > 1 ? awsNameParts.slice(1).join(' ') : '') ||
    '';

  const rawLinkedin = awsUser?.linkedin || '';
  const linkedinBase = 'https://www.linkedin.com/in/';
  const linkedinSlug = rawLinkedin.startsWith(linkedinBase)
    ? rawLinkedin.replace(linkedinBase, '')
    : '';

  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    company: awsUser.company,
    title: awsUser.title,
    location: awsUser.location || '',
    linkedin: linkedinSlug,
    bio: awsUser.bio,
    interests: awsUser.interests,
    goals: awsUser.goals,
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : window.location.origin;

  // Only call refreshUser after a real update (after profile save)
  // Do NOT call refreshUser in useEffect or on mount

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      await updateAWSUser({
        id: awsUser.id,
        name: fullName || awsUser.name,
        company: formData.company,
        title: formData.title,
        bio: formData.bio,
        interests: formData.interests,
        goals: formData.goals,
        location: formData.location,
      });

      const thinkificResponse = await updateThinkificUser({
        id: thinkificUser.id,
        linkedin: `https://www.linkedin.com/in/${formData.linkedin}`,
        company: formData.company,
        title: formData.title,
      });

      if (!thinkificResponse.ok) {
        throw new Error('Failed to update Thinkific profile');
      }

      // Keep Auth0 profile in sync with updated name
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
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsError(true);
      setErrorMessage(
        'There was an error updating your profile. Please try again.'
      );
    } finally {
      setIsLoading(false);
      window.location.reload(); // Only here, not on mount
    }
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>Edit Profile</h2>
      </div>

      <form onSubmit={handleEditSubmit} className='space-y-4'>
        {isError && (
          <div className='text-sm text-red-500 mb-2'>
            {errorMessage}
          </div>
        )}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              First Name
            </label>
            <input
              type='text'
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder='Your first name'
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-slate-600'>
              Last Name
            </label>
            <input
              type='text'
              className='w-full p-2.5 rounded-lg border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson'
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder='Your last name'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
            type='submit'
            disabled={isLoading}
            className='px-6 py-2 bg-clemson text-white rounded-lg font-bold hover:bg-clemson/90 transition-colors disabled:opacity-50 flex items-center gap-2'
          >
            {isLoading ? (
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
  );
};

export default EditProfileForm;
