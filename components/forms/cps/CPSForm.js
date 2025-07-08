import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import {
  updateCPSForm,
  createCPSForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignInModal } from '../../../features/layout/layoutSlice';
import CPSPersonalInfo from './CPSPersonalInfo';
import CPSProfessionalInfo from './CPSProfessionalInfo';
import { useRouter } from 'next/router';
import CPSGoals from './CPSGoals';
import CPSApply from './CPSApply';

const CPSForm = ({ methods, email, free }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (email) {
      setIsEmail(email);
    }
  }, [email]);

  const { awsUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const sendFormToAWS = async (data) => {
    if (awsUser && awsUser.cpsFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: updateCPSForm,
        variables: {
          input: {
            id: awsUser.id,
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
            linkedin: methods.getValues('linkedIn'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
            paymentType: methods.getValues('paymentType'),
            paymentConfirmation: free
              ? 'WAIVED'
              : methods.getValues('paymentConfirmation'),
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    } else if (awsUser && !awsUser.CPSFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCPSForm,
        variables: {
          input: {
            id: awsUser.id,
            cPSFormUserId: awsUser.id,
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
            linkedin: methods.getValues('linkedIn'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
            paymentType: methods.getValues('paymentType'),
            paymentConfirmation: free
              ? 'WAIVED'
              : methods.getValues('paymentConfirmation'),
          },
        },
      });

      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: awsUser.id,
            cpsFormID: awsUser.id,
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    }
  };

  const submitFormToAWS = async () => {
    if (!awsUser) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCPSForm,
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
            linkedin: methods.getValues('linkedIn'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
            paymentType: methods.getValues('paymentType'),
            paymentConfirmation: free
              ? 'WAIVED'
              : methods.getValues('paymentConfirmation'),
            status: 'SUBMITTED',
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cps-application-confirmation');
    }
    if (awsUser && awsUser.cpsFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: updateCPSForm,
        variables: {
          input: {
            id: awsUser.id,
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
            linkedin: methods.getValues('linkedIn'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
            paymentType: methods.getValues('paymentType'),
            paymentConfirmation: free
              ? 'WAIVED'
              : methods.getValues('paymentConfirmation'),
            status: 'SUBMITTED',
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cps-application-confirmation');
    } else if (awsUser && !awsUser.CPSFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCPSForm,
        variables: {
          input: {
            id: awsUser.id,
            cPSFormUserId: awsUser.id,
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
            linkedin: methods.getValues('linkedIn'),
            background: methods.getValues('background'),
            whyPackaging: methods.getValues('whyPackaging'),
            areaOfInterest: methods.getValues('areaOfInterest'),
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
            paymentType: methods.getValues('paymentType'),
            paymentConfirmation: free
              ? 'WAIVED'
              : methods.getValues('paymentConfirmation'),
            status: 'SUBMITTED',
          },
        },
      });

      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: awsUser.id,
            cpsFormID: awsUser.id,
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
      router.push('/cps-application-confirmation');
    }
  };

  const saveHandler = async () => {
    const data = methods.getValues();
    if (awsUser) {
      await sendFormToAWS(data);
    } else if (!awsUser) {
      dispatch(toggleSignInModal());
    }
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
    await submitFormToAWS(data);
    sendSubmitNotification(data);
  };

  const onError = (errors, e) => console.log(errors, e);

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
        <CPSApply email={isEmail} free={free} onSubmit={onSubmit} />
      </div>
      <div className='flex justify-between items-center bg-slate-300 dark:bg-dark-dark px-6 py-4 rounded-t sticky z-50 bottom-0 gap-3 lg:gap-6 border-t border-t-slate-300 text-sm md:text-base'>
        <div className='w-fit font-greycliff font-semibold h-full text-green-600 text-lg'>
          {isLoading ? 'Sending...' : isUpdated ? 'Updated!' : ''}
        </div>
        <div className='flex gap-2 items-center'>
          <div
            className='flex cursor-pointer justify-center items-center w-fit px-6 py-3 rounded-lg ring-2 ring-slate-400 text-slate-500 font-greycliff font-semibold '
            onClick={saveHandler}
          >
            Save Form
          </div>
          <button
            type='submit'
            className='flex cursor-pointer justify-center items-center w-fit px-6 py-3 rounded-lg bg-clemson font-greycliff font-semibold text-white text-sm md:text-base'
          >
            Submit Form
          </button>
        </div>
      </div>
    </form>
  );
};

export default CPSForm;
