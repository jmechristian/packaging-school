import React from 'react';
import TextArea from '../TextArea';
import { useFormContext } from 'react-hook-form';

const PGSFGoals = () => {
  const { formState, register } = useFormContext();
  return (
    <div className='flex flex-col gap-6 lg:gap-9'>
      <fieldset>
        <div className='flex justify-between items-center'>
          <legend className='text-sm md:text-base max-w-[75%] font-semibold leading-6 text-slate-700 font-greycliff'>
            Which certificate are you applying for?
          </legend>
          <span
            className='leading-6 text-red-500 text-sm md:text-base'
            id='email-optional'
          >
            Required
          </span>
        </div>
        <div>
          <div className='mt-6'>
            <select
              {...register('certApplying', { required: true })}
              name='certApplying'
              className='w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6'
            >
              <option value=''>Select Certificate</option>
              <option value='CMPM'>CMPM</option>
              <option value='CPS'>CPS</option>
              <option value='APS'>APS</option>
              <option value='CSP'>CSP</option>
            </select>
          </div>
          {formState.errors.hasOwnProperty('certApplying') && (
            <div className='text-sm text-red-600 mt-3 mb-2'>
              Please fill out field.
            </div>
          )}
        </div>
      </fieldset>
      <TextArea
        name={'yearGoals'}
        label={
          'Explain why you are interested in a career in the printing, graphic communications, or packaging industry. How do you see our certificate programs helping you achieve your goals and what impact do you hope to make in the graphics and packaging sectors?'
        }
        required
      />
      <TextArea
        name={'careerGoals'}
        label={
          'Describe how our certificate program aligns with your academic or career goals and how it will help you advance toward them'
        }
        required
      />
      <TextArea
        name={'impact'}
        label={
          'What kind of impact do the printing, graphic communications, and packaging industries have on the global marketplace and why does this field matter to you?'
        }
        required
      />

      <div className='md:col-span-2'>
        <div className='flex flex-row justify-between'>
          <label
            htmlFor='openToInternships'
            className='block font-medium font-greycliff leading-6 text-slate-900'
          >
            Are you open to internship or job opportunities with PGSF partner
            companies after completing your program?
          </label>
          <span className='text-sm leading-6 text-red-500' id='email-optional'>
            Required
          </span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <input
          {...register('openToInternships', { required: true })}
          id='yes'
          name='openToInternships'
          type='radio'
          value='true'
          className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
        />
        <label
          htmlFor='yes'
          className='block font-medium font-greycliff leading-6 text-slate-900'
        >
          Yes
        </label>
        <input
          {...register('openToInternships', { required: true })}
          id='no'
          name='openToInternships'
          type='radio'
          value='false'
          className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
        />
        <label
          htmlFor='no'
          className='block font-medium font-greycliff leading-6 text-slate-900'
        >
          No
        </label>
      </div>
      <div className='md:col-span-2'>
        <div className='flex flex-row justify-between'>
          <label
            htmlFor='r2rconsent'
            className='block font-medium font-greycliff leading-6 text-slate-900'
          >
            The Association for Roll-to-Roll Converters focuses on advancing
            technologies and careers related to roll-to-roll manufacturing,
            printing, and converting. Would you like to receive more information
            about this association and learn how to get involved in their R2R
            Conference?
          </label>
          <span className='text-sm leading-6 text-red-500' id='email-optional'>
            Required
          </span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <input
          {...register('r2rconsent', { required: true })}
          id='yes'
          name='r2rconsent'
          type='radio'
          value='true'
          className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
        />
        <label
          htmlFor='yes'
          className='block font-medium font-greycliff leading-6 text-slate-900'
        >
          Yes
        </label>
        <input
          {...register('r2rconsent', { required: true })}
          id='no'
          name='r2rconsent'
          type='radio'
          value='false'
          className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
        />
        <label
          htmlFor='no'
          className='block font-medium font-greycliff leading-6 text-slate-900'
        >
          No
        </label>
      </div>
    </div>
  );
};

export default PGSFGoals;
