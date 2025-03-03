import React from 'react';

const CohortItem = ({ cohort, onSelectCohort }) => {
  const renderCohortType = (type) => {
    if (type === 'CMPM') {
      return 'Certificate of Mastery in Packaging Management';
    } else if (type === 'CPS') {
      return 'Certificate of Packaging Science';
    }
  };
  return (
    <div
      key={cohort.id}
      className='border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow'
    >
      <div className='flex justify-between items-start border-b pb-1 border-gray-200'>
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
        <p className='text-gray-600 text-sm border-b pb-2 border-gray-200 w-full'>
          {cohort.description}
        </p>
      </div>
      <div className='grid grid-cols-1 md:!grid-cols-3 gap-5 bg-gray-100 p-4 rounded-lg'>
        <p className='text-gray-600 text-sm'>
          {new Date(cohort.startDate).toLocaleDateString()} -{' '}
          {new Date(cohort.endDate).toLocaleDateString()}
        </p>

        <p className='text-gray-600 text-sm'>
          <span className='font-bold'>Application Deadline:</span>{' '}
          {new Date(cohort.deadline).toLocaleDateString()}
        </p>

        {cohort.instructor && (
          <div className='flex justify-end gap-3'>
            <img
              src={cohort.instructor.image}
              alt={cohort.instructor.name}
              className='w-8 h-8 rounded-full object-cover'
            />
            <div className='flex flex-col gap-1 justify-end'>
              <div className='font-bold text-gray-900 text-sm !leading-none'>
                {cohort.instructor.name}
              </div>
              <div className='text-gray-600 text-sm !leading-none'>
                {cohort.instructor.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortItem;
