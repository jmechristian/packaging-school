import React, { useEffect } from 'react';
import TextArea from '../../TextArea';
import TextInput from '../../TextInput';
import FileUpload from '../../FileUpload';
import { useFormContext } from 'react-hook-form';
import { validateManualVideoLink } from '../../../../libs/validateManualVideoLink';

const hasVideoValue = (value) =>
  !!value &&
  value !== 'null' &&
  value !== 'undefined' &&
  String(value).trim().length > 0;

const CMPMGoals = () => {
  const { register, watch, getValues, clearErrors } = useFormContext();
  const videoLink = watch('videoLink');
  const manualVideoLink = watch('manualVideoLink');

  const validateVideoResponse = () => {
    const hasUpload = hasVideoValue(getValues('videoLink'));
    const hasManual = hasVideoValue(getValues('manualVideoLink'));
    if (hasUpload || hasManual) return true;
    return 'Please upload a video or provide a video link';
  };

  const validateManualLinkField = (value) => {
    if (!hasVideoValue(value)) {
      return validateVideoResponse();
    }
    return validateManualVideoLink(value);
  };

  useEffect(() => {
    const hasUpload = hasVideoValue(videoLink);
    const hasManual = hasVideoValue(manualVideoLink);
    const manualOk =
      !hasManual || validateManualVideoLink(manualVideoLink) === true;

    if ((hasUpload || hasManual) && manualOk) {
      clearErrors(['videoLink', 'manualVideoLink']);
    }
  }, [videoLink, manualVideoLink, clearErrors]);

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
      <div className='md:col-span-2'>
        <div className='flex flex-row justify-between'>
          <label
            htmlFor='contactConsent'
            className='block font-medium font-greycliff leading-6 text-slate-900'
          >
            I understand that I may be contacted for an informational interview
            during the review period.
          </label>
          <span className='text-sm leading-6 text-red-500' id='email-optional'>
            Required
          </span>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <input
          {...register('contactConsent', { required: true })}
          id='yes'
          name='contactConsent'
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
          {...register('contactConsent', { required: true })}
          id='no'
          name='contactConsent'
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
      <div className='md:col-span-2 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='block font-medium font-greycliff leading-6 text-slate-900'>
            Please submit a short video response addressing the following two
            questions:
          </div>
          <ul className='list-disc list-outside pl-5 text-slate-800 font-greycliff'>
            <li>
              Think about a product you&apos;ve received that was over-packaged
              or under-protected. What would you change and why?
            </li>
            <li>
              Tell us about something you&apos;ve worked on in school, a job, or
              an activity that you&apos;re proud of. What did you do, and what did
              you learn from it?
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-semibold font-greycliff text-slate-900'>
            Guidelines:
          </div>
          <ul className='list-disc list-outside pl-5 text-slate-800 font-greycliff'>
            <li>Please keep each response to 1-2 minutes.</li>
            <li>
              A smartphone recording is perfectly fine - production quality is
              not important.
            </li>
            <li>
              We encourage you to speak naturally. We&apos;re interested in
              hearing directly from you and getting a sense of your passion,
              perspective, and personality in a way that written responses
              can&apos;t fully capture.
            </li>
          </ul>
        </div>
      </div>
      <div className='md:col-span-2 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'>
            Video response
          </div>
          <span className='text-sm leading-6 text-red-500'>Required</span>
        </div>
        <p className='text-sm text-slate-600 font-greycliff -mt-2'>
          Upload your video file or paste a link to it — at least one is
          required.
        </p>
        <FileUpload
          name={'videoLink'}
          label={'Upload your video response'}
          accept={'.mp4,.mov,.m4v,.webm,.avi'}
          maxSize={250 * 1024 * 1024}
          placeholder={'Upload your video response file'}
          validate={validateVideoResponse}
        />
        <TextInput
          name={'manualVideoLink'}
          label={'Or paste a link to your video'}
          placeholder={'https://drive.google.com/...'}
          validate={validateManualLinkField}
        />
        <p className='text-xs text-slate-500 font-greycliff -mt-2'>
          https only. Supported hosts: YouTube, Vimeo, Google Drive, Dropbox,
          OneDrive, Loom, WeTransfer, Box, iCloud, Streamable.
        </p>
      </div>
    </div>
  );
};

export default CMPMGoals;
