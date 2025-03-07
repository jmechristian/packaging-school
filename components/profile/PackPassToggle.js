'use client';

import { useState, useEffect } from 'react';
import { Switch, Label, Field } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { MdBolt } from 'react-icons/md';

const PackPassToggle = ({ enabled, onChange }) => {
  const dispatch = useDispatch();
  const { awsUser } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     setEnabled(awsUser.allAccess);
  //   }, [awsUser]);

  return (
    <div className='w-72 flex items-center justify-between bg-yellow-300 rounded-lg py-2 px-2 border-4 border-yellow-100'>
      <Field
        as='span'
        className='text-sm w-full flex items-center justify-between'
      >
        <Label
          as='div'
          className='font-medium text-gray-900 flex items-center gap-0'
        >
          <div>
            <MdBolt size={20} />
          </div>
          All-Access Pass{' '}
          <span className='text-gray-100 text-xs bg-black rounded px-1.5 font-semibold ml-1'>
            {enabled ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </Label>{' '}
        <Switch
          checked={enabled}
          onChange={(newValue) => onChange(newValue)}
          className={`${
            enabled ? 'bg-base-brand' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-base-brand focus:ring-offset-1`}
        >
          <span
            aria-hidden='true'
            className={`
            transform transition-transform duration-200 ease-in-out
            ${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm
          `}
          />
        </Switch>
      </Field>
    </div>
  );
};

export default PackPassToggle;
