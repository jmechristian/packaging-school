import React from 'react';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import FileUpload from '../FileUpload';
import { useFormContext } from 'react-hook-form';

const PGSFProfessionalInfo = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col gap-6 lg:gap-9'>
      <div className='grid grid-col-1 gap-6 md:grid-cols-2 md:gap-12'>
        <TextInput
          name={'school'}
          placeholder={'What school are you currently attending?'}
          label={'School'}
        />
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between'>
            <label
              htmlFor='schoolType'
              className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'
            >
              School Type
            </label>
          </div>
          <select
            {...register('schoolType')}
            name={'schoolType'}
            className='w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6'
          >
            <option value=''>Select School Type</option>
            <option value='college'>4-year college or university</option>
            <option value='communityCollege'>Community college</option>
            <option value='technicalSchool'>Technical or trade school</option>
          </select>
        </div>
        <div className='md:col-span-2'>
          <TextInput
            name={'studying'}
            placeholder={''}
            label={'What is your current area of study or program focus?'}
          />
        </div>
        <TextInput
          name={'credential'}
          placeholder={"e.g., Associate's, Bachelor's, Certificate"}
          label={'Credential or degree'}
        />
        <TextInput
          name={'credentialProgress'}
          placeholder={'e.g., first year, second year, final year'}
          label={'What year are you in your program?'}
        />
        <TextInput
          name={'credentialYear'}
          placeholder={'Enter year of graduation'}
          label={'Year of graduation'}
        />
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between'>
            <label
              htmlFor='fullTime'
              className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'
            >
              Are you attending full-time or part-time?
            </label>
          </div>
          <select
            {...register('fullTime')}
            name={'fullTime'}
            className='w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6'
          >
            <option value=''>Select</option>
            <option value='true'>Full-time</option>
            <option value='false'>Part-time</option>
          </select>
        </div>
        <div className='md:col-span-2'>
          <TextArea
            name={'organizations'}
            label={
              'Are you involved in any student organizations, internships, or related experiences?'
            }
          />
        </div>
        <div className='md:col-span-2'>
          <FileUpload
            name={'transcript'}
            label={
              'Please upload a PDF, image, or screenshot (JPG, PNG, etc.) of your current transcript or most recent report card.'
            }
            accept={'.pdf,.jpg,.jpeg,.png'}
            maxSize={5 * 1024 * 1024} // 5MB
            placeholder={
              'Upload a PDF, image, or screenshot of your current transcript or most recent report card'
            }
          />
        </div>
        <div className='md:col-span-2'>
          <FileUpload
            name={'resume'}
            label={'Upload your resume (if available)'}
            accept={'.pdf,.jpg,.jpeg,.png'}
            maxSize={5 * 1024 * 1024} // 5MB
          />
        </div>
        <div className='md:col-span-2'>
          <TextInput
            name={'linkedin'}
            placeholder={'https://'}
            label={'LinkedIn Profile'}
          />
        </div>
      </div>
    </div>
  );
};

export default PGSFProfessionalInfo;
