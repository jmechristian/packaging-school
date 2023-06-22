import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { API } from 'aws-amplify';
import {
  updateCPSForm,
  createCPSForm,
  updateUser,
} from '../../../src/graphql/mutations';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CPSNav from './CPSNav';
import CPSForm from './CPSForm';
import { useDispatch } from 'react-redux';
import { toggleSignInModal } from '../../../features/layout/layoutSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CPSWrapper = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const methods = useForm();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params) {
      for (const property in params) {
        console.log(`${property}: ${params[property]}`);
        methods.setValue(`${property}`, `${params[property]}`);
      }
    }
  }, [params, methods]);

  const sendFormToAWS = async () => {
    if (user && user.cpsFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: updateCPSForm,
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
            referral: methods.getValues('referral'),
            payment: methods.getValues('payment'),
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    } else if (user && !user.CPSFormID) {
      setIsUpdated(false);
      setIsLoading(true);
      await API.graphql({
        query: createCPSForm,
        variables: {
          input: {
            id: user.id,
            cPSFormUserId: user.id,
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
            yearGoals: methods.getValues('yearGoals'),
            cpsGoals: methods.getValues('cpsGoals'),
            moreAboutYou: methods.getValues('moreAboutYou'),
            elective: methods.getValues('elective'),
          },
        },
      });

      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            cpsFormID: user.id,
          },
        },
      });
      setIsLoading(false);
      setIsUpdated(true);
    }
  };

  const saveHandler = () => {
    const data = methods.getValues();
    if (user) {
      sendFormToAWS(data);
    } else if (!user) {
      dispatch(toggleSignInModal());
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (!user) {
      const res = await API.graphql({
        query: createCPSForm,
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            streetAddress: data.streetAddress,
            addressExtra: data.addressExtra,
            city: data.city,
            state: data.state,
            country: data.country,
            birthYear: data.birthYear,
            companyName: data.companyName,
            companyTitle: data.companyTitle,
            linkedin: data.linkedin,
            background: data.background,
            whyPackaging: data.whyPackaging,
            areaOfInterest: data.areaOfInterest,
            referral: data.referral,
            payment: data.payment,
            yearGoals: data.yearGoals,
            cpsGoals: data.cpsGoals,
            moreAboutYou: data.moreAboutYou,
            elective: data.elective,
          },
        },
      });

      if (res.data) {
        router.push('/cps-application-confirmation');
      }
    }

    if (user && !user.cpsFormID) {
      const res = await API.graphql({
        query: createCPSForm,
        variables: {
          input: {
            id: user.id,
            cPSFormUserId: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            streetAddress: data.streetAddress,
            addressExtra: data.addressExtra,
            city: data.city,
            state: data.state,
            country: data.country,
            birthYear: data.birthYear,
            companyName: data.companyName,
            companyTitle: data.companyTitle,
            linkedin: data.linkedin,
            background: data.background,
            whyPackaging: data.whyPackaging,
            areaOfInterest: data.areaOfInterest,
            referral: data.referral,
            payment: data.payment,
            yearGoals: data.yearGoals,
            cpsGoals: data.cpsGoals,
            moreAboutYou: data.moreAboutYou,
            elective: data.elective,
          },
        },
      });

      if (res.data) {
        await API.graphql({
          query: updateUser,
          variables: {
            input: {
              id: user.id,
              cpsFormID: user.id,
            },
          },
        });

        router.push('/cps-application-confirmation');
      }
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className='w-full max-w-4xl mx-auto sm:px-0 pb-24'>
      <FormProvider {...methods}>
        <CPSNav />
        <CPSForm methods={{ ...methods }} />
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
            <div
              className='flex cursor-pointer justify-center items-center w-fit px-6 py-3 rounded-lg bg-clemson font-greycliff font-semibold text-white text-sm md:text-base'
              onClick={methods.handleSubmit(onSubmit, onError)}
            >
              Submit Form
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default CPSWrapper;
