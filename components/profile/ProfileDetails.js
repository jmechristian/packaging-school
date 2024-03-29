import { API } from 'aws-amplify';
import { useState } from 'react';
import { updateUser } from '../../src/graphql/mutations';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ProfileDetails({ user, isEditing, toggleEditing }) {
  const [fullName, setFullName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [company, setCompany] = useState(user?.company);
  const [title, setTitle] = useState(user?.title);
  const [linkedIn, setLinkedIn] = useState(user?.linkedin);
  const [bio, setBio] = useState(user?.bio);
  const [errors, setErrors] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const res = await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.id,
          email: email,
          company: company,
          name: fullName,
          title: title,
          linkedin: linkedIn,
          bio: bio,
        },
      },
    });

    if (res.data) {
      setIsSending(false);
      setIsSent(true);
    } else if (res.errors) {
      setIsSending(fasle);
      setIsSent(true);
      setErrors(true);
    }
  };

  return (
    <div className='px-6 md:px-16 py-12 dark:bg-dark-mid'>
      <div className='flex justify-between'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-lg font-bold font-greycliff leading-7 text-slate-900 dark:text-white'>
            Your Information
          </h3>
          <p className='mt-1 max-w-2xl  leading-6 text-slate-500 dark:text-gray-400'>
            Personal details and bio.
          </p>
        </div>
        <div className='mt-5 flex justify-center sm:mt-0'>
          <div
            onClick={toggleEditing}
            className='flex items-center justify-center rounded-md bg-white dark:bg-dark-dark w-10 h-10 font-semibold text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-400 hover:bg-slate-50 font-greycliff'
          >
            {isEditing ? (
              <XMarkIcon className='w-5 h-5 text-slate-500' />
            ) : (
              <PencilSquareIcon className='w-5 h-5 text-slate-500' />
            )}
          </div>
        </div>
      </div>
      {isEditing ? (
        <div className='mt-6'>
          <form
            className='md:grid md:grid-cols-2 md:gap-x-16'
            onSubmit={updateUserProfile}
          >
            <div className='border-t border-slate-300 py-7 sm:col-span-1 sm:px-0'>
              <dt className='font-medium leading-6 font-greycliff text-slate-500 dark:text-gray-400'>
                Full name
              </dt>
              <div>
                <input
                  className='block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  id='firstName'
                  name='firstName'
                  type='text'
                  defaultValue={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className='border-t border-slate-300  py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Company
              </dt>
              <input
                className='block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                id='company'
                name='company'
                type='text'
                defaultValue={company}
                placeholder='Set Company...'
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className='border-t border-slate-300  py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Email address
              </dt>
              <input
                className='block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                id='email'
                name='email'
                type='text'
                defaultValue={email}
                placeholder='Set Email...'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='border-t border-slate-300  py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Title
              </dt>
              <input
                className='block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                id='title'
                name='title'
                type='text'
                defaultValue={title}
                placeholder='Set Title...'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='border-t border-slate-300  py-7 sm:col-span-2 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                LinkedIn
              </dt>
              <input
                className=' block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                id='linkedin'
                name='linkedin'
                type='text'
                defaultValue={linkedIn}
                placeholder='Set LinkedIn...'
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className='border-t border-slate-300  py-7 sm:col-span-2 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Bio
              </dt>
              <textarea
                rows={4}
                name='bio'
                id='bio'
                className='block w-full rounded-md border-0 py-2 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                defaultValue={bio}
                placeholder='Set Bio...'
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className='flex justify-end col-span-2'>
              <button
                type='submit'
                className='bg-transparent hover:bg-slate-300 dark:hover:bg-neutral-80 dark:text-white ring-1 ring-inset ring-gray-300 dark:bg-dark-dark border cursor-pointer border-slate-900 font-greycliff font-semibold px-4 py-2 rounded-lg w-fit text-right'
              >
                {isSending
                  ? 'Sending...'
                  : !isSent
                  ? 'Update Profile'
                  : 'Updated!'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='mt-6'>
          <dl className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-1 sm:px-0'>
              <dt className='font-medium leading-6 font-greycliff text-slate-500 dark:text-gray-400'>
                Full name
              </dt>
              <dd className='mt-1 leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.name}
              </dd>
            </div>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Company
              </dt>
              <dd className='mt-1  leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.company}
              </dd>
            </div>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Email address
              </dt>
              <dd className='mt-1  leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.email}
              </dd>
            </div>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-1 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Title
              </dt>
              <dd className='mt-1  leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.title}
              </dd>
            </div>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-2 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                LinkedIn
              </dt>
              <dd className='mt-1  leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.linkedin}
              </dd>
            </div>
            <div className='border-t border-slate-300 px-4 py-7 sm:col-span-2 sm:px-0'>
              <dt className=' font-medium leading-6 text-slate-500 dark:text-gray-400 font-greycliff'>
                Bio
              </dt>
              <dd className='mt-1  leading-6 text-slate-700 dark:text-gray-300 sm:mt-2'>
                {user && user.bio}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
