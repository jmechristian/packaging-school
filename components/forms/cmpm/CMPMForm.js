import React, { useState, useEffect, useMemo, useRef } from 'react';
import { API } from 'aws-amplify';
import {
  updateCMPMForm,
  createCMPMForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import CMPMPersonalInfo from './CMPMPersonalInfo';
import CMPMProfessionalInfo from './CMPMProfessionalInfo';
import { useRouter } from 'next/router';
import CMPMGoals from './CMPMGoals';
import CMPMSessionInfo from './CMPMSessionInfo';
import CMPMPricing from './CMPMPricing';
import { MdCopyAll } from 'react-icons/md';
import { saveCmpmForm, getAWSUser } from '../../../helpers/api';
import { setAWSUser } from '../../../features/auth/authslice';
const CMPMForm = ({ methods, email, free, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const [lastAutoSave, setLastAutoSave] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const paymentConfirmed = methods.watch('paymentConfirmation');
  const autoSaveIntervalRef = useRef(null);

  useEffect(() => {
    if (email) {
      setIsEmail(email);
    }
  }, [email]);

  const { awsUser } = useSelector((state) => state.auth);

  const captureEmail = (val) => setIsEmail(val);

  // const getAndSetUser = async () => {
  //   const currentUser = await API.graphql({
  //     query: usersByEmail,
  //     variables: { email: awsUser.email },
  //   });

  //   if (currentUser.data.usersByEmail.items[0]) {
  //     dispatch(setUser(currentUser.data.usersByEmail.items[0]));
  //   }
  // };

  // const sendFormToAWS = async () => {
  //   if (awsUser && awsUser.cmpmFormID) {
  //     setIsUpdated(false);
  //     setIsLoading(true);
  //     await API.graphql({
  //       query: updateCMPMForm,
  //       variables: {
  //         input: {
  //           id: id,
  //           firstName: methods.getValues('firstName'),
  //           lastName: methods.getValues('lastName'),
  //           email: methods.getValues('email'),
  //           phone: methods.getValues('phone'),
  //           streetAddress: methods.getValues('streetAddress'),
  //           addressExtra: methods.getValues('addressExtra'),
  //           city: methods.getValues('city'),
  //           state: methods.getValues('state'),
  //           country: methods.getValues('country'),
  //           birthYear: methods.getValues('birthYear'),
  //           companyName: methods.getValues('companyName'),
  //           sessionApplying: methods.getValues('sessionApplying'),
  //           companyTitle: methods.getValues('companyTitle'),
  //           linkedin: methods.getValues('linkedin'),
  //           background: methods.getValues('background'),
  //           whyPackaging: methods.getValues('whyPackaging'),
  //           areaOfInterest: methods.getValues('areaOfInterest'),
  //           referral: methods.getValues('referral'),
  //           payment: methods.getValues('payment'),
  //           yearGoals: methods.getValues('yearGoals'),
  //           cmpmGoals: methods.getValues('cmpmGoals'),
  //           moreAboutYou: methods.getValues('moreAboutYou'),
  //           paymentConfirmation: methods.getValues('paymentConfirmation'),
  //         },
  //       },
  //     });
  //     setIsLoading(false);
  //     setIsUpdated(true);
  //   } else if (awsUser && !awsUser.cmpmFormID) {
  //     setIsUpdated(false);
  //     setIsLoading(true);
  //     await API.graphql({
  //       query: createCMPMForm,
  //       variables: {
  //         input: {
  //           cMPMFormUserId: awsUser.id,
  //           firstName: methods.getValues('firstName'),
  //           lastName: methods.getValues('lastName'),
  //           email: methods.getValues('email'),
  //           phone: methods.getValues('phone'),
  //           streetAddress: methods.getValues('streetAddress'),
  //           addressExtra: methods.getValues('addressExtra'),
  //           city: methods.getValues('city'),
  //           state: methods.getValues('state'),
  //           country: methods.getValues('country'),
  //           birthYear: methods.getValues('birthYear'),
  //           companyName: methods.getValues('companyName'),
  //           companyTitle: methods.getValues('companyTitle'),
  //           linkedin: methods.getValues('linkedin'),
  //           background: methods.getValues('background'),
  //           whyPackaging: methods.getValues('whyPackaging'),
  //           areaOfInterest: methods.getValues('areaOfInterest'),
  //           sessionApplying: methods.getValues('sessionApplying'),
  //           referral: methods.getValues('referral'),
  //           payment: methods.getValues('payment'),
  //           yearGoals: methods.getValues('yearGoals'),
  //           cmpmGoals: methods.getValues('cmpmGoals'),
  //           moreAboutYou: methods.getValues('moreAboutYou'),
  //           paymentConfirmation: methods.getValues('paymentConfirmation'),
  //         },
  //       },
  //     });

  //     await API.graphql({
  //       query: updateUser,
  //       variables: {
  //         input: {
  //           id: awsUser.id,
  //           cmpmFormID: awsUser.id,
  //         },
  //       },
  //     });
  //     setIsLoading(false);
  //     setIsUpdated(true);
  //   }
  // };

  const submitFormToAWS = async () => {
    setIsUpdated(false);
    setIsLoading(true);
    await API.graphql({
      query: updateCMPMForm,
      variables: {
        input: {
          id: id,
          cMPMFormUserId: awsUser && awsUser.id ? awsUser.id : null,
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
          cmpmGoals: methods.getValues('cmpmGoals'),
          moreAboutYou: methods.getValues('moreAboutYou'),
          paymentConfirmation: methods.getValues('paymentConfirmation'),
          status: 'SUBMITTED',
        },
      },
    });

    if (awsUser) {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { id: awsUser.id, cmpmFormID: id },
        },
      });

      const dbUser = await getAWSUser(awsUser.email);
      if (dbUser) {
        dispatch(setAWSUser(dbUser));
      }
    }

    setIsLoading(false);
    setIsUpdated(true);
    router.push('/cmpm-application-confirmation');
  };

  const saveHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await saveCmpmForm({
      id: id,
      cMPMFormUserId: awsUser && awsUser.id ? awsUser.id : null,
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
      referral: methods.getValues('referral'),
      payment: methods.getValues('payment'),
      sessionApplying: methods.getValues('sessionApplying'),
      yearGoals: methods.getValues('yearGoals'),
      cmpmGoals: methods.getValues('cmpmGoals'),
      moreAboutYou: methods.getValues('moreAboutYou'),
      paymentConfirmation: methods.getValues('paymentConfirmation'),
      status: 'DRAFT',
    });

    if (awsUser) {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { id: awsUser.id, cmpmFormID: id },
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
    await fetch('/api/send-certificate-submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        form: 'CMPM',
      }),
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await submitFormToAWS(data);
    sendSubmitNotification(data);
    setIsSubmitting(false);
  };

  const onError = (errors, data) => console.log('errors', errors, 'data', data);

  const autoSave = async () => {
    try {
      await saveCmpmForm({
        id: id,
        cMPMFormUserId: awsUser && awsUser.id ? awsUser.id : null,
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
        referral: methods.getValues('referral'),
        payment: methods.getValues('payment'),
        sessionApplying: methods.getValues('sessionApplying'),
        yearGoals: methods.getValues('yearGoals'),
        cmpmGoals: methods.getValues('cmpmGoals'),
        moreAboutYou: methods.getValues('moreAboutYou'),
        paymentConfirmation: methods.getValues('paymentConfirmation'),
        status: 'DRAFT',
      });

      if (awsUser) {
        await API.graphql({
          query: updateUser,
          variables: {
            input: { id: awsUser.id, cmpmFormID: id },
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
    autoSaveIntervalRef.current = setInterval(autoSave, 5 * 60 * 1000);

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
        <CMPMPersonalInfo getEmail={(val) => captureEmail(val)} />
      </div>
      <div
        id='professional'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Professional Information
        </div>
        <CMPMProfessionalInfo />
      </div>
      <div id='goals' className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'>
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Professional Goals
        </div>
        <CMPMGoals />
      </div>
      <div
        id='session'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Session Info
        </div>
        <CMPMSessionInfo email={isEmail} free={free} />
        <CMPMPricing
          email={isEmail}
          free={free}
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          payment={paymentConfirmed}
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
          {free && (
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

export default CMPMForm;
