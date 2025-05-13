import { updateAWSUser, updateThinkificUser } from '../../helpers/api';
import { useState, useEffect } from 'react';

const EditProfileForm = ({ awsUser, thinkificUser, refreshUser }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    bio: '',
    interests: '',
    goals: '',
    linkedin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (awsUser) {
      setFormData({
        company: awsUser.company || '',
        title: awsUser.title || '',
        location: awsUser.location || '',
        bio: awsUser.bio || '',
        interests: awsUser.interests || '',
        goals: awsUser.goals || '',
        linkedin: awsUser.linkedin || '',
      });
    }
  }, [awsUser]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await updateAWSUser({
        id: awsUser.id,
        ...formData,
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
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      refreshUser();
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>Edit Profile</h2>
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
  );
};

export default EditProfileForm;
