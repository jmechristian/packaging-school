import React from 'react';
import CPSPricing from './CPSPricing';
import { useFormContext } from 'react-hook-form';
import TextInput from '../TextInput';
import Link from 'next/link';

const CPSApply = ({ email }) => {
  const { register, formState } = useFormContext();
  return (
    <div className='flex flex-col gap-12'>
      <fieldset>
        <div className='flex justify-between items-center'>
          <legend className='text-sm md:text-base max-w-[75%] font-semibold leading-6 text-slate-700 font-greycliff'>
            Where did you hear about the Certificate of Packaging Science?
          </legend>
          <span
            className='leading-6 text-red-500 text-sm md:text-base'
            id='email-optional'
          >
            Required
          </span>
        </div>
        <div>
          <div className='mt-6 gap-x-12 gap-y-3 flex flex-wrap items-center text-sm md:text-base'>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='google'
                name='referral'
                value='google'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='google'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Google
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='linkedIn'
                name='referral'
                type='radio'
                value='linkedin'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='linkedIn'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                LinkedIn
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='industry-show'
                name='referral'
                type='radio'
                value='industry-show'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='show'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Industry Conference/ Show
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='colleague'
                name='referral'
                value='colleague'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='colleague'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Colleague
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='other'
                name='referral'
                value='other'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='other'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Other
              </label>
              <TextInput name={'otherInput'} placeholder={'Other'} />
            </div>
          </div>
          {formState.errors.hasOwnProperty('referral') && (
            <div className='text-sm text-red-600 mt-3 mb-2'>
              Please fill out field.
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <div>
          <div className='flex justify-between items-center pt-6 text-sm md:text-base'>
            <legend className='font-semibold leading-6 text-slate-700 font-greycliff text-sm md:text-base'>
              How will you be paying for this program?
            </legend>
            <span className='leading-6 text-red-500' id='email-optional'>
              Required
            </span>
          </div>
          <div className='mt-6 gap-4 lg:gap-12 flex flex-wrap items-center text-sm md:text-base'>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('payment', { required: true })}
                id='self-pay'
                name='payment'
                value='self-pay'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='self-pay'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Self Pay
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('payment', { required: true })}
                id='employer-paid'
                name='payment'
                value='employer-paid'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='employer-paid'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Employer Paid
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('payment', { required: true })}
                id='employer-reimbursed'
                name='payment'
                value='employer-reimbursed'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='employer-reimbursed'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Employer Reimbursed
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('payment', { required: true })}
                id='employer-benefits'
                name='payment'
                type='radio'
                value='employer-benefits'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='employer-benefits'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Employer Benefits
              </label>
            </div>
          </div>
        </div>
        {formState.errors.hasOwnProperty('payment') && (
          <div className='text-sm text-red-600 mt-4 mb-2'>
            Please fill out field.
          </div>
        )}
      </fieldset>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <label
            htmlFor={'country'}
            className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'
          >
            Elective<sup>*</sup>
          </label>
          <span
            className='text-sm lg:text-base leading-6 text-red-500'
            id='email-optional'
          >
            Required
          </span>
        </div>
        <select
          className='form-select w-full text-sm md:text-base'
          id='elective'
          name='elective'
          {...register('elective', { required: true })}
        >
          <option value=''>Select Elective</option>
          <option value='later'>
            I&apos;d like to decide at a later date.
          </option>
          <option value='human_factors'>
            Human Factors in Packaging Design
          </option>
          <option value='solidworks'>Solidworks for Packaging - Basics</option>
          <option value='project_management'>
            Project Management Essentials
          </option>
          <option value='cannabis'>Cannabis Packaging</option>
          <option value='pressure_labels'>Pressure Sensitive Labels</option>
          <option value='liquid_filling_machinery'>
            Liquid Filling Machinery
          </option>
          <option value='corrugated'>Corrugated Design</option>
          <option value='bioplastics'>
            Sales Operations for Printing and Packaging
          </option>
        </select>
        {formState.errors.elective && (
          <div className='text-sm text-red-600 mt-1 mb-2'>
            Please fill out field.
          </div>
        )}
        <div className='text-slate-700 text-sm mt-1'>
          <sup>*</sup>Course descriptions can be found{' '}
          <Link
            href='/all_courses'
            className='flex gap-1 items-center'
            target='_blank'
          >
            here
          </Link>
          .
        </div>
      </div>
      <CPSPricing email={email} />
    </div>
  );
};

export default CPSApply;
