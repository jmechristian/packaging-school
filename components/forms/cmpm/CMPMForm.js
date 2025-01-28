import React, { useState, useEffect, useMemo } from 'react';
import { API } from 'aws-amplify';
import {
  updateCMPMForm,
  createCMPMForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { usersByEmail } from '../../../src/graphql/queries';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignInModal } from '../../../features/layout/layoutSlice';
import { setUser } from '../../../features/auth/authslice';
import CMPMPersonalInfo from './CMPMPersonalInfo';
import CMPMProfessionalInfo from './CMPMProfessionalInfo';
import { useRouter } from 'next/router';
import CMPMGoals from './CMPMGoals';
import CMPMSessionInfo from './CMPMSessionInfo';
import CMPMPricing from './CMPMPricing';
const CMPMForm = ({ methods, email, free }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [cookieData, setCookieData] = useState(undefined);
  const [isEmail, setIsEmail] = useState('');
  const router = useRouter();

  const paymentConfirmed = methods.watch('paymentConfirmation');

  useEffect(() => {
    if (email) {
      setIsEmail(email);
    }
  }, [email]);

  const { user } = useSelector((state) => state.auth);

  const captureEmail = (val) => setIsEmail(val);

  const dispatch = useDispatch();

  const getAndSetUser = async () => {
    const currentUser = await API.graphql({
      query: usersByEmail,
      variables: { email: user.email },
    });

    if (currentUser.data.usersByEmail.items[0]) {
      dispatch(setUser(currentUser.data.usersByEmail.items[0]));
    }
  };

  const sendFormToAWS = async () => {
    if (user && user.cmpmFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: updateCMPMForm,
        variables: {
          input: {
            id: user.id,
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
            sessionApplying: methods.getValues('sessionApplying'),
            companyTitle: methods.getValues('companyTitle'),
            linkedin: methods.getValues('linkedin'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cmpmGoals: methods.getValues('cmpmGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            paymentConfirmation: methods.getValues('paymentConfirmation'),
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    } else if (user && !user.CMPMFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCMPMForm,
        variables: {
          input: {
            id: user.id,
            cMPMFormUserId: user.id,
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
          },
        },
      });

      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            cmpmFormID: user.id,
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    }
  };

  const submitFormToAWS = async () => {
    if (!user) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCMPMForm,
        variables: {
          input: {
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
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cmpm-application-confirmation');
    } else if (user && user.cmpmFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: updateCMPMForm,
        variables: {
          input: {
            id: user.id,
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
            paymentConfirmation: user.cmpmForm.paymentConfirmation
              ? user.cmpmForm.paymentConfirmation
              : methods.getValues('paymentConfirmation'),
            status: 'SUBMITTED',
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cmpm-application-confirmation');
    } else if (user && !user.cmpmFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCMPMForm,
        variables: {
          input: {
            id: user.id,
            cMPMFormUserId: user.id,
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
            status: 'SUBMITTED',
          },
        },
      });

      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            cmpmFormID: user.id,
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cmpm-application-confirmation');
    }
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    console.log(data);
    const rawData = JSON.stringify(data);
    if (user) {
      await sendFormToAWS(data);
      getAndSetUser();
    } else if (!user) {
      Cookies.set('cmpmFormSave', rawData, { expires: 7 });
      dispatch(toggleSignInModal());
    }
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
    await submitFormToAWS(data);
    sendSubmitNotification(data);
  };

  const onError = (errors, data) => console.log('errors', errors, 'data', data);

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
        className='flex justify-between items-center dark:bg-dark-dark bg-gray-300 px-6 py-4 rounded-t sticky z-50 bottom-0 gap-3 lg:gap-6 border-t border-t-slate-300 text-sm md:text-base'
      >
        <div className='w-fit font-greycliff font-semibold h-full text-green-500 text-lg'>
          {isLoading ? 'Sending...' : isUpdated ? 'Updated!' : ''}
        </div>
        <div className='flex gap-2 items-center'>
          <div
            className='flex cursor-pointer bg-white/80 justify-center items-center w-fit px-6 py-3 rounded-lg ring-2 ring-slate-400 text-slate-700 font-greycliff font-semibold '
            onClick={(e) => saveHandler(e)}
          >
            Save Form
          </div>
        </div>
      </div>
    </form>
  );
};

export default CMPMForm;
