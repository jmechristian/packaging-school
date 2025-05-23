import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TextInput from '../TextInput';
import { getCurrentCMPMSessions } from '../../../helpers/api';

const CMPMSessionInfo = ({ email, free }) => {
  const { register, formState } = useFormContext();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessions = await getCurrentCMPMSessions();
      console.log(sessions);
      setSessions(sessions);
    };
    fetchSessions();
  }, []);
  return (
    <div className='flex flex-col gap-12'>
      <fieldset>
        <div className='flex justify-between items-center'>
          <legend className='text-sm md:text-base max-w-[75%] font-semibold leading-6 text-slate-700 font-greycliff'>
            Which session are you applying for?
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
            {sessions.map((session) => (
              <div className='flex items-center gap-x-3' key={session.id}>
                <input
                  {...register('sessionApplying', { required: true })}
                  id={session.title.replace(/\s+/g, '')}
                  name='sessionApplying'
                  type='radio'
                  value={session.title.replace(/\s+/g, '')}
                  className='h-4 w-4 border-slate-300 text-base-brand focus:ring-base-brand'
                />
                <label
                  htmlFor={session.title.replace(/\s+/g, '')}
                  className='block font-medium font-greycliff leading-6 text-slate-900'
                >
                  {session.title} <br />
                  <span className='text-sm text-slate-700'>
                    {session.startDate} - {session.endDate}
                    <br />
                    Deadline: {session.deadline}
                  </span>
                </label>
              </div>
            ))}
          </div>
          {formState.errors.hasOwnProperty('sessionApplying') && (
            <div className='text-sm text-red-600 mt-3 mb-2'>
              Please fill out field.
            </div>
          )}
        </div>
      </fieldset>
      <div className='relative flex gap-x-3 pt-6'>
        <div className='flex h-6 items-center'>
          <input
            {...register('optOut')}
            id='optOut'
            name='optOut'
            type='checkbox'
            className='h-4 w-4 rounded border-slate-300 text-base-brand focus:ring-base-brand'
          />
        </div>
        <div className='leading-6'>
          <label
            htmlFor='comments'
            className='font-semibold font-greycliff text-slate-700'
          >
            I would like to opt out of early access to the online lessons.
          </label>
          <p className='text-sm mt-2 px-0 md:pr-9 text-slate-600 leading-normal'>
            Early access to the online lessons can be granted to anyone upon
            full payment of the tuition. Students participating in early access
            will not receive any feedback from the instructor until the cohort
            start date selected above. Students opting to not pay early in full
            will receive access to the lessons along with the rest of their
            cohort on the selected start date.
          </p>
        </div>
      </div>
      <fieldset>
        <div className='flex justify-between items-center'>
          <legend className='text-sm md:text-base max-w-[75%] font-semibold leading-6 text-slate-700 font-greycliff'>
            Where did you hear about the Certificate of Mastery in Packaging
            Management?
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
    </div>
  );
};

export default CMPMSessionInfo;
