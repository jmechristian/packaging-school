import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import CohortItem from './CohortItem';
import { useRouter } from 'next/router';
const CohortModal = ({ isOpen, setIsOpen, cohorts, onSelectCohort }) => {
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center'>
        <Dialog.Panel
          className='mx-auto max-w-4xl w-full rounded-lg bg-white max-h-[90vh] overflow-y-auto relative'
          id='scrollers'
        >
          <div className='flex justify-between items-center pt-5 px-5'>
            <div className='flex items-end gap-2'>
              <div>
                <CalendarDaysIcon className='h-9 w-9 text-gray-500' />
              </div>
              <Dialog.Title className='text-2xl font-bold text-gray-900 leading-none'>
                Upcoming Cohorts
              </Dialog.Title>
              <p
                className='text-brand-indigo underline font-medium cursor-pointer ml-1'
                onClick={() => router.push('/cohorts')}
              >
                Why cohort learning?
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-gray-500 hover:text-gray-700'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>

          <div className='space-y-3 p-5 mt-1'>
            {cohorts.map((cohort) => (
              <CohortItem
                key={cohort.id}
                cohort={cohort}
                onSelectCohort={() => router.push(`${cohort.link}`)}
              />
            ))}
          </div>

          <div className='!sticky left-0 right-0 bottom-0 h-40 !bg-gradient-to-t !from-white via-white !to-transparent z-[60]'></div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CohortModal;
