import React, { useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
import {
  createCMPMForm,
  updateUser,
  createCPSForm,
} from '../../src/graphql/mutations';
import { useRouter } from 'next/router';

Amplify.configure(awsExports);
const FormStat = ({
  stat,
  label,
  link,
  updated,
  user,
  view,
  query,
  value,
  value1,
}) => {
  const [isErrors, setIsError] = useState(null);
  const router = useRouter();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const newDate = new Date(updated).toLocaleString();

  const formCreateHandler = async () => {
    const res = await API.graphql({
      query: `${query}`,
      variables: { input: { id: user.id, [value1]: user.id } },
    });
    if (res.data) {
      addCmpmToUser();
    } else {
      setIsError('Error creating new form.');
    }
  };

  const addCmpmToUser = async () => {
    const res = await API.graphql({
      query: updateUser,
      variables: { input: { id: user.id, [value]: user.id } },
    });
    if (res.data) {
      router.push(`${link}?email=${user.email}`);
    } else {
      setIsError('Error updating user.');
    }
  };

  return (
    <div className='flex flex-col' key={label}>
      <div className='py-2 text-center text-lg font-medium font-greycliff bg-base-mid'>
        <span className='text-slate-100 font-bold text-sm'>
          {stat ? '1' : '0'}
        </span>{' '}
        <span className='text-slate-100 text-sm'>{label}</span>
      </div>
      <div className='flex flex-col gap-2 py-16 border-r border-r-slate-300 dark:border-r-gray-900 bg-slate-200 dark:bg-neutral-700 h-full justify-center items-center'>
        <div className='text-slate-700 text-sm'>
          {!updated ? (
            'No Applications Found'
          ) : (
            <div className='flex flex-col gap-1 items-center dark:text-white'>
              <div className='font-semibold'>Last Updated:</div>
              <div>{updated && newDate}</div>
            </div>
          )}
        </div>
        <div className='mt-5 flex justify-center sm:mt-0'>
          <button
            onClick={updated ? () => router.push(view) : formCreateHandler}
            className={`flex items-center justify-center rounded-md cursor-pointer ${
              !updated
                ? 'bg-clemson hover:bg-clemson-dark'
                : 'bg-base-brand dark:bg-base-dark hover:bg-base-mid'
            } text-white px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-neutral-700 font-greycliff`}
          >
            {updated ? 'View' : 'Start'} Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStat;
