import FormStat from './FormStat';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  createCMPMForm,
  updateUser,
  createCPSForm,
} from '../../src/graphql/mutations';
import { useThinkificLink } from '../../hooks/useThinkificLink';

export default function ProfileHead({ user }) {
  const { navigateToThinkific } = useThinkificLink();

  const handleThinkificClick = async (e) => {
    e.preventDefault();
    await navigateToThinkific('https://learn.packagingschool.com');
  };

  return (
    <div className='overflow-hidden rounded-t-lg bg-white dark:bg-dark-mid box-shadow-lg'>
      <h2 className='sr-only' id='profile-overview-title'>
        Profile Overview
      </h2>
      <div className='bg-white dark:bg-dark-mid p-9'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='sm:flex sm:space-x-5'>
            <div className='flex-shrink-0'>
              <img
                className='mx-auto h-28 w-28 rounded-full'
                src={user.picture}
                alt=''
              />
            </div>
            <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left flex flex-col justify-center'>
              <p className='text-lg font-medium text-slate-600 dark:text-white/60'>
                Welcome back,
              </p>
              <div className='text-xl font-bold text-slate-900 dark:text-white sm:text-4xl'>
                {user.name}
              </div>
              <p className=' font-medium text-slate-600 dark:text-white flex justify-center gap-1.5'>
                {user.title ? (
                  user.title
                ) : (
                  <span className='text-slate-400 underline'>Enter Title</span>
                )}{' '}
                at{' '}
                {user.company ? (
                  user.company
                ) : (
                  <span className='text-slate-400 underline'>
                    Enter Company
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className='bg-green-600  mt-6 lg:mt-0  px-4 py-2.5 rounded-lg text-center shadow-sm flex items-center justify-center'>
            <button
              onClick={handleThinkificClick}
              className='text-sm text-white font-semibold text-center flex flex-col'
            >
              <div className='text-lg'>Already a Student?</div>
              <div className='leading-none'>Go to your LMS Dashboard</div>
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* <div className='col-span-1 bg-slate-300 dark:bg-neutral-700 flex flex-col gap-6 py-3 px-9'>
          <div className='font-greycliff text-lg text-slate-600 dark:text-white font-semibold'>
            Badges Earned
          </div>
        </div> */}
        <div className='lg:col-span-2 grid lg:grid-cols-2'>
          <div className='sm:col-span-2 py-2.5 w-full bg-base-dark'>
            <div className='font-greycliff text-center font-semibold text-lg text-white'>
              Certificate Applications
            </div>
          </div>
          <FormStat
            label='CMPM'
            stat={user.cmpmFormID}
            link={'/certificate-of-mastery-in-packaging-management'}
            view={`/forms/cmpm/${user.id}`}
            updated={user.cmpmForm?.updatedOn}
            user={user}
            value={'cmpmFormID'}
            value1={'cMPMFormUserId'}
            query={createCMPMForm}
          />
          <FormStat
            label='CPS'
            stat={user.cpsFormID}
            link={'/certificate-of-packaging-science-application'}
            view={`/forms/cps/${user.id}`}
            updated={user.cpsForm?.updatedOn}
            user={user}
            value={'cpsFormID'}
            value1={'cPSFormUserId'}
            query={createCPSForm}
          />
        </div>
      </div>
    </div>
  );
}
