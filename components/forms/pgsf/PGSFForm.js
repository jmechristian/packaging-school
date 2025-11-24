import React, { useState, useEffect, useRef } from 'react';
import { API } from 'aws-amplify';
import {
  updatePgsfForm,
  createPgsfForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import PGSFPersonalInfo from './PGSFPersonalInfo';
import PGSFProfessionalInfo from './PGSFProfessionalInfo';
import { useRouter } from 'next/router';
import PGSFGoals from './PGSFGoals';
import PGSFSessionInfo from './PGSFSessionInfo';
import PGSFPricing from './PGSFPricing';
import { MdCopyAll } from 'react-icons/md';
import { savePgsfForm, getAWSUser } from '../../../helpers/api';
import { setAWSUser } from '../../../features/auth/authslice';

const PGSFForm = ({ methods, email, free, id }) => {
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

  const submitFormToAWS = async () => {
    setIsUpdated(false);
    setIsLoading(true);
    await API.graphql({
      query: updatePgsfForm,
      variables: {
        input: {
          id: id,
          age: methods.getValues('age'),
          pgsfFormUserId: awsUser && awsUser.id ? awsUser.id : null,
          firstName: methods.getValues('firstName'),
          lastName: methods.getValues('lastName'),
          email: methods.getValues('email'),
          phone: methods.getValues('phone'),
          streetAddress: methods.getValues('streetAddress'),
          addressExtra: methods.getValues('addressExtra'),
          city: methods.getValues('city'),
          state: methods.getValues('state'),
          country: methods.getValues('country'),
          companyName: methods.getValues('companyName'),
          companyTitle: methods.getValues('companyTitle'),
          linkedin: methods.getValues('linkedin'),
          background: methods.getValues('background'),
          whyPackaging: methods.getValues('whyPackaging'),
          areaOfInterest: methods.getValues('areaOfInterest'),
          certApplying: methods.getValues('certApplying'),
          r2rconsent:
            methods.getValues('r2rconsent') === true ||
            methods.getValues('r2rconsent') === 'true',
          referral: methods.getValues('referral'),
          payment: methods.getValues('payment'),
          yearGoals: methods.getValues('yearGoals'),
          careerGoals: methods.getValues('careerGoals'),
          openToInternships:
            methods.getValues('openToInternships') === 'true' ||
            methods.getValues('openToInternships') === true,
          school: methods.getValues('school'),
          schoolType: methods.getValues('schoolType'),
          studying: methods.getValues('studying'),
          credential: methods.getValues('credential'),
          credentialProgress: methods.getValues('credentialProgress'),
          credentialYear: methods.getValues('credentialYear'),
          fullTime:
            methods.getValues('fullTime') === 'true' ||
            methods.getValues('fullTime') === true,
          organizations: methods.getValues('organizations'),
          transcript: methods.getValues('transcript'),
          resume: methods.getValues('resume'),
          corrugatedImpact: methods.getValues('corrugatedImpact'),
          opportunities:
            methods.getValues('opportunities') === 'true' ||
            methods.getValues('opportunities') === true,
          moreAboutYou: methods.getValues('moreAboutYou'),
          whyinterested: methods.getValues('whyinterested'),
          optOut:
            methods.getValues('optOut') === 'true' ||
            methods.getValues('optOut') === true,
          birthYear: methods.getValues('birthYear'),
          paymentConfirmation: methods.getValues('paymentConfirmation'),
          impact: methods.getValues('impact'),
          status: 'SUBMITTED',
        },
      },
    });

    if (awsUser) {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { id: awsUser.id, pgsfFormID: id },
        },
      });

      const dbUser = await getAWSUser(awsUser.email);
      if (dbUser) {
        dispatch(setAWSUser(dbUser));
      }
    }

    setIsLoading(false);
    setIsUpdated(true);
    router.push('/pgsf-application-confirmation');
  };

  const saveHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await savePgsfForm({
      id: id,
      age: methods.getValues('age'),
      pgsfFormUserId: awsUser && awsUser.id ? awsUser.id : null,
      firstName: methods.getValues('firstName'),
      lastName: methods.getValues('lastName'),
      email: methods.getValues('email'),
      phone: methods.getValues('phone'),
      streetAddress: methods.getValues('streetAddress'),
      addressExtra: methods.getValues('addressExtra'),
      city: methods.getValues('city'),
      state: methods.getValues('state'),
      country: methods.getValues('country'),
      companyName: methods.getValues('companyName'),
      companyTitle: methods.getValues('companyTitle'),
      linkedin: methods.getValues('linkedin'),
      background: methods.getValues('background'),
      whyPackaging: methods.getValues('whyPackaging'),
      areaOfInterest: methods.getValues('areaOfInterest'),
      referral: methods.getValues('referral'),
      payment: methods.getValues('payment'),
      certApplying: methods.getValues('certApplying'),
      yearGoals: methods.getValues('yearGoals'),
      careerGoals: methods.getValues('careerGoals'),
      moreAboutYou: methods.getValues('moreAboutYou'),
      paymentConfirmation: methods.getValues('paymentConfirmation'),
      opportunities:
        methods.getValues('opportunities') === 'true' ||
        methods.getValues('opportunities') === true,
      status: 'DRAFT',
      school: methods.getValues('school'),
      schoolType: methods.getValues('schoolType'),
      credential: methods.getValues('credential'),
      credentialProgress: methods.getValues('credentialProgress'),
      credentialYear: methods.getValues('credentialYear'),
      studying: methods.getValues('studying'),
      fullTime:
        methods.getValues('fullTime') === 'true' ||
        methods.getValues('fullTime') === true,
      organizations: methods.getValues('organizations'),
      transcript: methods.getValues('transcript'),
      resume: methods.getValues('resume'),
      corrugatedImpact: methods.getValues('corrugatedImpact'),
      whyinterested: methods.getValues('whyinterested'),
      impact: methods.getValues('impact'),
      openToInternships:
        methods.getValues('openToInternships') === 'true' ||
        methods.getValues('openToInternships') === true,
      r2rconsent:
        methods.getValues('r2rconsent') === true ||
        methods.getValues('r2rconsent') === 'true',
      optOut:
        methods.getValues('optOut') === 'true' ||
        methods.getValues('optOut') === true,
      birthYear: methods.getValues('birthYear'),
    });

    if (awsUser) {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { id: awsUser.id, pgsfFormID: id },
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
    await fetch('/api/send-pgsf-certificate-submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        form: 'PGSF',
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
      await savePgsfForm({
        id: id,
        age: methods.getValues('age'),
        pgsfFormUserId: awsUser && awsUser.id ? awsUser.id : null,
        firstName: methods.getValues('firstName'),
        lastName: methods.getValues('lastName'),
        email: methods.getValues('email'),
        phone: methods.getValues('phone'),
        streetAddress: methods.getValues('streetAddress'),
        addressExtra: methods.getValues('addressExtra'),
        city: methods.getValues('city'),
        state: methods.getValues('state'),
        country: methods.getValues('country'),
        companyName: methods.getValues('companyName'),
        companyTitle: methods.getValues('companyTitle'),
        linkedin: methods.getValues('linkedin'),
        background: methods.getValues('background'),
        whyPackaging: methods.getValues('whyPackaging'),
        areaOfInterest: methods.getValues('areaOfInterest'),
        referral: methods.getValues('referral'),
        payment: methods.getValues('payment'),
        certApplying: methods.getValues('certApplying'),
        yearGoals: methods.getValues('yearGoals'),
        careerGoals: methods.getValues('careerGoals'),
        moreAboutYou: methods.getValues('moreAboutYou'),
        paymentConfirmation: methods.getValues('paymentConfirmation'),
        school: methods.getValues('school'),
        schoolType: methods.getValues('schoolType'),
        credential: methods.getValues('credential'),
        credentialProgress: methods.getValues('credentialProgress'),
        credentialYear: methods.getValues('credentialYear'),
        opportunities:
          methods.getValues('opportunities') === 'true' ||
          methods.getValues('opportunities') === true,
        status: 'DRAFT',
        studying: methods.getValues('studying'),
        fullTime:
          methods.getValues('fullTime') === 'true' ||
          methods.getValues('fullTime') === true,
        organizations: methods.getValues('organizations'),
        transcript: methods.getValues('transcript'),
        resume: methods.getValues('resume'),
        corrugatedImpact: methods.getValues('corrugatedImpact'),
        whyinterested: methods.getValues('whyinterested'),
        impact: methods.getValues('impact'),
        openToInternships:
          methods.getValues('openToInternships') === 'true' ||
          methods.getValues('openToInternships') === true,
        r2rconsent:
          methods.getValues('r2rconsent') === true ||
          methods.getValues('r2rconsent') === 'true',
        optOut:
          methods.getValues('optOut') === 'true' ||
          methods.getValues('optOut') === true,
        birthYear: methods.getValues('birthYear'),
      });

      if (awsUser) {
        await API.graphql({
          query: updateUser,
          variables: {
            input: { id: awsUser.id, pgsfFormID: id },
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
    // Start autosave every 3 minutes (180,000 milliseconds)
    autoSaveIntervalRef.current = setInterval(autoSave, 3 * 60 * 1000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <PGSFPersonalInfo getEmail={(val) => captureEmail(val)} />
      </div>
      <div
        id='professional'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Professional Information
        </div>
        <PGSFProfessionalInfo />
      </div>
      <div id='goals' className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'>
        <div className='text-xl lg:text-2xl lg:mb-4 font-greycliff font-semibold'>
          Educational Goals
        </div>
        <PGSFGoals />
      </div>
      <div
        id='session'
        className='py-6 scroll-mt-24 lg:py-9 flex flex-col gap-6'
      >
        <PGSFSessionInfo email={isEmail} free={free} />
        <PGSFPricing
          email={isEmail}
          free={paymentConfirmed === 'WAIVED'}
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

export default PGSFForm;
