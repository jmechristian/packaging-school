import React, { useEffect, useState, useRef } from 'react';
import { API } from 'aws-amplify';
import {
  updateCPSForm,
  createCPSForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import CPSPersonalInfo from './CPSPersonalInfo';
import CPSProfessionalInfo from './CPSProfessionalInfo';
import { useRouter } from 'next/router';
import CPSGoals from './CPSGoals';
import CPSApply from './CPSApply';
import { saveCpsForm, getAWSUser } from '../../../helpers/api';
import { setAWSUser } from '../../../features/auth/authslice';
import { MdCopyAll } from 'react-icons/md';

const CPSForm = ({ methods, email, free, id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const [lastAutoSave, setLastAutoSave] = useState(null);
  const autoSaveIntervalRef = useRef(null);
  const router = useRouter();
  const paymentConfirmed = methods.watch('paymentConfirmation');

  useEffect(() => {
    if (email) {
      setIsEmail(email);
    }
  }, [email]);

  const { awsUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const saveHandler = async ({ isStatus }) => {
    setIsLoading(true);
    await saveCpsForm({
      id: id,
      cPSFormUserId: awsUser && awsUser.id ? awsUser.id : null,
      firstName: methods.getValues('firstName'),
      lastName: methods.getValues('lastName'),
      email: methods.getValues('email'),
      phone: methods.getValues('phone'),
      streetAddress: methods.getValues('streetAddress'),
      addressExtra: methods.getValues('addressExtra'),
      city: methods.getValues('city'),
      state: methods.getValues('state'),
      country: methods.getValues('country'),
      birthYear: methods.getValues('birthYear'),
      companyName: methods.getValues('companyName'),
      companyTitle: methods.getValues('companyTitle'),
      linkedin: methods.getValues('linkedin'),
      background: methods.getValues('background'),
      whyPackaging: methods.getValues('whyPackaging'),
      areaOfInterest: methods.getValues('areaOfInterest'),
      sessionApplying: methods.getValues('sessionApplying'),
      referral: methods.getValues('referral'),
      payment: methods.getValues('payment'),
      yearGoals: methods.getValues('yearGoals'),
      cpsGoals: methods.getValues('cpsGoals'),
      paymentType: methods.getValues('paymentType'),
      moreAboutYou: methods.getValues('moreAboutYou'),
      elective: methods.getValues('elective'),
      optOut: methods.getValues('optOut'),
      paymentConfirmation: free
        ? 'WAIVED'
        : methods.getValues('paymentConfirmation'),
      status: isStatus || 'DRAFT',
    });
    if (awsUser) {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { id: awsUser.id, cpsFormID: id },
        },
      });
      const dbUser = await getAWSUser(awsUser.email);
      if (dbUser) {
        dispatch(setAWSUser(dbUser));
      }
    }
    setIsLoading(false);
    setIsUpdated(true);
    setTimeout(() => {
      setIsUpdated(false);
    }, 3000);
  };

  const sendSubmitNotification = async (data) => {
    await fetch('/api/send-cps-submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        form: 'CPS',
      }),
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await saveHandler('SUBMITTED');
    sendSubmitNotification(data);
    setIsSubmitting(false);
    router.push('/cps-application-confirmation');
  };

  const onError = (errors, e) => console.log(errors, e);

  const autoSave = async () => {
    try {
      await saveCpsForm({
        id: id,
        cPSFormUserId: awsUser && awsUser.id ? awsUser.id : null,
        firstName: methods.getValues('firstName'),
        lastName: methods.getValues('lastName'),
        email: methods.getValues('email'),
        phone: methods.getValues('phone'),
        streetAddress: methods.getValues('streetAddress'),
        addressExtra: methods.getValues('addressExtra'),
        city: methods.getValues('city'),
        state: methods.getValues('state'),
        country: methods.getValues('country'),
        birthYear: methods.getValues('birthYear'),
        companyName: methods.getValues('companyName'),
        companyTitle: methods.getValues('companyTitle'),
        linkedin: methods.getValues('linkedin'),
        background: methods.getValues('background'),
        whyPackaging: methods.getValues('whyPackaging'),
        areaOfInterest: methods.getValues('areaOfInterest'),
        sessionApplying: methods.getValues('sessionApplying'),
        referral: methods.getValues('referral'),
        payment: methods.getValues('payment'),
        yearGoals: methods.getValues('yearGoals'),
        cpsGoals: methods.getValues('cpsGoals'),
        paymentType: methods.getValues('paymentType'),
        moreAboutYou: methods.getValues('moreAboutYou'),
        elective: methods.getValues('elective'),
        optOut: methods.getValues('optOut'),
        paymentConfirmation: free
          ? 'WAIVED'
          : methods.getValues('paymentConfirmation'),
        status: 'DRAFT',
      });

      if (awsUser) {
        await API.graphql({
          query: updateUser,
          variables: {
            input: { id: awsUser.id, cpsFormID: id },
          },
        });
        const dbUser = await getAWSUser(awsUser.email);
        if (dbUser) {
          dispatch(setAWSUser(dbUser));
        }
      }

      setLastAutoSave(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  // Set up autosave interval
  useEffect(() => {
    // Start autosave every 5 minutes (300,000 milliseconds)
    autoSaveIntervalRef.current = setInterval(autoSave, 3 * 60 * 1000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [id, awsUser]); // Dependencies for the effect

  return (
    <form
      className='w-full bg-slate-200 p-6 divide-y space-y-6 divide-slate-300'
      onSubmit={methods.handleSubmit(onSubmit, onError)}
    >
      <div
        id='personal'
        className='flex flex-col gap-6 py-6 scroll-mt-24 lg:py-9'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Personal Information
        </div>
        <CPSPersonalInfo setEmail={(val) => setIsEmail(val)} />
      </div>
      <div
        id='professional'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Professional Information
        </div>
        <CPSProfessionalInfo />
      </div>
      <div id='goals' className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'>
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Professional Goals
        </div>
        <CPSGoals />
      </div>
      <div
        id='session'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Session Info
        </div>
        <CPSApply
          email={isEmail}
          free={paymentConfirmed === 'WAIVED'}
          onSubmit={onSubmit}
        />
      </div>
      <div
        id='submit-button'
        className='flex justify-between items-center dark:bg-dark-dark bg-gray-300 -mx-6 px-6 py-4 rounded-t sticky z-50 bottom-0 gap-3 lg:gap-6 border-t border-t-slate-300 text-sm md:text-base'
      >
        <div
          className='flex items-center gap-0.5 cursor-pointer'
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
          }}
        >
          <div>
            <div className='rounded-full p-1 hover:bg-slate-100 transition-all duration-300 flex items-center justify-center'>
              <MdCopyAll size={24} className='text-slate-700' />
            </div>
          </div>
          <div className='font-semibold text-slate-700'>
            Get your personal form link
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col items-start'>
            <div
              className={`w-fit font-greycliff font-semibold h-full text-slate-600 animate-pulse ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? 'Sending...' : isUpdated ? 'Updated!' : ''}
            </div>
            {lastAutoSave && (
              <div className='text-xs text-slate-500 font-greycliff'>
                Auto-saved: {lastAutoSave.toLocaleTimeString()}
              </div>
            )}
          </div>
          <div
            className='flex cursor-pointer bg-white/80 justify-center items-center w-fit px-6 py-3 rounded-lg ring-2 ring-slate-400 text-slate-700 font-greycliff font-semibold '
            onClick={(e) => saveHandler(e)}
          >
            Save Form
          </div>
          {paymentConfirmed === 'WAIVED' && (
            <div
              className='flex cursor-pointer bg-clemson hover:bg-clemson/80 text-white justify-center items-center w-fit px-6 py-3 rounded-lg ring-2 ring-slate-400 font-greycliff font-semibold '
              onClick={methods.handleSubmit(onSubmit, onError)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CPSForm;
