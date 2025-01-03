import React from 'react';
import CenteredTextHeader from '../../components/layout/CenteredTextHeader';
import { useForm } from 'react-hook-form';
import Image from "next/legacy/image";
import Meta from '../../components/shared/Meta';

const Index = () => {
  const submitForm = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Meta
        title={'Sales Bootcamp Registration Page'}
        description={
          'If you would like to register for the Packaging Sales Fast Track, please enter your information below.'
        }
      />
      <div className='relative pb-24'>
        <div></div>
        <CenteredTextHeader
          headline='Register for Packaging Sales Fast Track'
          subhead='If you would like to register for the Packaging Sales Fast Track, please enter your information below.'
          logo='https://packschool.s3.amazonaws.com/sandler_ps-logo-2048x918.png'
        />
        <section>
          <form
            className='grid grid-cols-1 md:grid-cols-2 overflow-hidden gap-6 p-6 w-full mx-auto max-w-3xl'
            onSubmit={handleSubmit(submitForm)}
          >
            <div className='w-full col-span-1'>
              <label htmlFor='studentFirstName' className='sr-only'>
                Student First Name
              </label>
              <input
                {...register('studentFirstName', { required: true })}
                type='text'
                name='studentFirstName'
                id='studentFirstName'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
                placeholder='Student First Name*'
              />
              {errors.studentFirstName?.type === 'required' && (
                <p role='alert' className='text-red-500 text-sm mt-2'>
                  <sup>*</sup>Field Required
                </p>
              )}
            </div>
            <div className='w-full'>
              <label htmlFor='studentLastName' className='sr-only'>
                Last Name
              </label>
              <input
                {...register('studentLastName', { required: true })}
                type='text'
                name='studentLastName'
                id='studentLastName'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
                placeholder='Student Last Name*'
              />
              {errors.studentLastName?.type === 'required' && (
                <p role='alert' className='text-red-500 text-sm mt-2'>
                  <sup>*</sup>Field Required
                </p>
              )}
            </div>
            <div className='w-full col-span-1 md:col-span-2'>
              <label htmlFor='mailingAddress' className='sr-only'>
                Mailing Address
              </label>
              <input
                {...register('mailingAddress')}
                type='text'
                name='mailingAddress'
                id='mailingAddress'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
                placeholder='Mailing Address'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='company' className='sr-only'>
                Company
              </label>
              <input
                {...register('company')}
                type='text'
                name='company'
                id='company'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
                placeholder='Company'
              />
            </div>
            <div className='w-full col-span-1'>
              <label htmlFor='title' className='sr-only'>
                Parent/Guardian Name
              </label>
              <input
                {...register('title', { required: true })}
                type='text'
                name='title'
                id='title'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
                placeholder='Title*'
              />
            </div>
            <div className='w-full col-span-1 md:col-span-2'>
              <label htmlFor='courseSelect' className='sr-only'>
                Which materials course would you like to enroll in?*
              </label>
              <select
                {...register('courseSelect', { required: true })}
                name='courseSelect'
                id='courseSelect'
                className='bg-base-light block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
              >
                <option value='' disabled selected hidden>
                  Which materials course would you like to enroll in?*
                </option>
                <option value='paperboard'>Paperboard Cartons</option>
                <option value='corrugated'>Corrugated Containers</option>
                <option value='glassMetal'>Glass and Metal Packaging</option>
                <option value='polymers'>Polymers in Packaging</option>
              </select>
              {errors.courseSelect?.type === 'required' && (
                <p role='alert' className='text-red-500 text-sm mt-2'>
                  <sup>*</sup>Field Required
                </p>
              )}
            </div>
            <button
              className='col-span-1  md:col-span-2 bg-clemson text-center shadow-md hover:bg-clemson-dark text-lg md:text-xl py-4 px-5 rounded-lg font-bold font-greycliff text-white ring-1 ring-white/20 ring-inset'
              type='submit'
            >
              Submit Your Application
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Index;
