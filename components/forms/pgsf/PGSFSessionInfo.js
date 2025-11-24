import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from '../TextInput';

const PGSFSessionInfo = ({ email, free }) => {
  const { register, formState } = useFormContext();
  return (
    <div className='flex flex-col gap-12'>
      <fieldset>
        <div className='flex justify-between items-center'>
          <legend className='text-sm md:text-base max-w-[75%] font-semibold leading-6 text-slate-700 font-greycliff'>
            Where did you hear about this scholarship opportunity?
          </legend>
          <span
            className='leading-6 text-red-500 text-sm md:text-base'
            id='email-optional'
          >
            Required
          </span>
        </div>
        <div>
          <div className='mt-6 gap-x-12 gap-y-3 grid grid-cols-3 md:grid-cols-4 items-center text-sm md:text-base'>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='google-search'
                name='referral'
                value='google-search'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='google-search'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Google Search
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='google-ad'
                name='referral'
                value='google-ad'
                type='radio'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='google-ad'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Google Ad
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
                id='instagram'
                name='referral'
                type='radio'
                value='instagram'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='instagram'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Instagram
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='youtube'
                name='referral'
                type='radio'
                value='youtube'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='youtube'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                YouTube
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='facebook'
                name='referral'
                type='radio'
                value='facebook'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='facebook'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Facebook
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='tiktok'
                name='referral'
                type='radio'
                value='tiktok'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='tiktok'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                TikTok
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='email'
                name='referral'
                type='radio'
                value='email'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='email'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Email
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='chatGPT'
                name='referral'
                type='radio'
                value='chatGPT'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='chatGPT'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                ChatGPT
              </label>
            </div>
            <div className='flex items-center gap-x-3'>
              <input
                {...register('referral', { required: true })}
                id='other-blog'
                name='referral'
                type='radio'
                value='other-blog'
                className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
              />
              <label
                htmlFor='other-blog'
                className='block font-medium font-greycliff leading-6 text-slate-900'
              >
                Other Blog/List
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
            <div className='flex items-center gap-x-3 col-span-3'>
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
    </div>
  );
};

export default PGSFSessionInfo;
