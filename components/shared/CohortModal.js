import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CohortModal = ({ isOpen, setIsOpen, cohorts, onSelectCohort }) => {
  const renderCohortType = (type) => {
    if (type === 'CMPM') {
      return 'Certificate of Mastery in Packaging Management';
    } else if (type === 'CPS') {
      return 'Certificate of Packaging Science';
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='mx-auto max-w-3xl w-full rounded-xl bg-white p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-end gap-3'>
              <Dialog.Title className='text-2xl font-bold text-gray-900 mb-0.5'>
                Upcoming Cohorts
              </Dialog.Title>
              <p className='text-brand-indigo underline font-medium cursor-pointer'>
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

          <div className='space-y-6'>
            {cohorts.map((cohort) => (
              <div
                key={cohort.id}
                className='border rounded-lg p-5 space-y-4 hover:shadow-md transition-shadow'
              >
                <div className='flex justify-between items-start border-b pb-4 border-gray-200'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {renderCohortType(cohort.type)}
                    </h3>
                    <p className='text-gray-600'>{cohort.name}</p>
                  </div>
                  <button
                    onClick={() => onSelectCohort(cohort)}
                    className='bg-clemson font-medium text-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors'
                  >
                    Apply Now
                  </button>
                </div>
                <div>
                  <p className='text-gray-600 text-sm border-b pb-4 border-gray-200 w-full'>
                    {cohort.description}
                  </p>
                </div>
                <div className='grid grid-cols-1 md:!grid-cols-3 gap-4'>
                  <p className='text-gray-600'>
                    {new Date(cohort.startDate).toLocaleDateString()}
                  </p>
                  <p className='text-gray-600'>
                    {new Date(cohort.endDate).toLocaleDateString()}
                  </p>
                  <p className='text-gray-600'>
                    <span className='font-medium'>Application Deadline:</span>{' '}
                    {new Date(cohort.deadline).toLocaleDateString()}
                  </p>

                  {cohort.instructor && (
                    <div className='flex items-center gap-4'>
                      <img
                        src={cohort.instructor.image}
                        alt={cohort.instructor.name}
                        className='w-16 h-16 rounded-full object-cover'
                      />
                      <div>
                        <p className='font-medium text-gray-900'>
                          {cohort.instructor.name}
                        </p>
                        <p className='text-gray-600'>
                          {cohort.instructor.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CohortModal;
