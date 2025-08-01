import React from 'react';
import TextArea from '../../TextArea';
import { useFormContext } from 'react-hook-form';

const CMPMGoals = () => {
  const { formState, register } = useFormContext();
  return (
    <div className='flex flex-col gap-6 lg:gap-9'>
      <TextArea
        name={'yearGoals'}
        label={
          'Explain why you are interested in a career in the packaging or supply chain industry. How do you see the CMPM program helping you achieve your goals, and what impact do you hope to make in the corrugated packaging sector?'
        }
        required
      />
      <TextArea
        name={'cmpmGoals'}
        label={
          'How do you see the CMPM program helping you achieve your academic or career goals?'
        }
        required
      />
      <TextArea
        name={'moreAboutYou'}
        label={
          'What kind of impact does the corrugated packaging industry have on the global marketplace, and why does this field matter to you?'
        }
        required
      />
      <div className='md:col-span-2'>
        <div className='flex flex-row justify-between'>
          <label
            htmlFor='opportunities'
            className='block font-medium font-greycliff leading-6 text-slate-900'
          >
            Are you open to internship or job opportunities with ICPF partner
            companies after completing your program?
          </label>
          <span className='text-sm leading-6 text-red-500' id='email-optional'>
            Required
          </span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <input
          {...register('opportunities', { required: true })}
          id='yes'
          name='opportunities'
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
          {...register('opportunities', { required: true })}
          id='no'
          name='opportunities'
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

export default CMPMGoals;
