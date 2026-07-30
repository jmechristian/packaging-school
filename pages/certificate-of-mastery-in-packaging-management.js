import React, { useState } from 'react';
import CenteredTextHeader from '../components/layout/CenteredTextHeader';
import TextInput from '../components/forms/TextInput';
import { useForm, FormProvider } from 'react-hook-form';
import {
  ArrowLongRightIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { createCertAppStart } from '../src/graphql/mutations';
import Loader from '../components/shared/Loader';
import Meta from '../components/shared/Meta';
import { createCmpmFromAppStart } from '../helpers/api';
import { trackAbCmpmStart } from '../libs/analytics';
import { SECTION3_QUOTE } from '../components/certifications/cmpm/variantB/constants';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { location } = useSelector((state) => state.auth);

  const automateDealHandler = async (
    isEmail,
    isForm,
    isFirstName,
    isLastName,
    isPhone
  ) => {
    // Check For User
    const user = await fetch(`/api/get-ac-user?email=${isEmail}`).then(
      (response) => response.json()
    );
    if (user.data.contacts[0]) {
      //Create Deal
      const deal = await fetch('/api/create-deal', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          formType: isForm,
          contactId: user.data.contacts[0].id,
          title: 'CMPM Abandoned App',
        }),
      }).then((response) => response.json());

      if (deal.data.deal.id) {
        // Update Deal
        await fetch(
          `/api/update-deal?dealId=${deal.data.deal.id}&formType=${isForm}`
        ).then((response) => response.json());
      } else {
        console.log('no deal');
      }
    } else {
      const newUser = await fetch('/api/create-ac-user', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: isEmail,
          firstName: isFirstName,
          lastName: isLastName,
          phone: isPhone,
        }),
      }).then((res) => res.json());

      if (newUser.data.contact) {
        //Create Deal
        const deal = await fetch('/api/create-deal', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            formType: isForm,
            contactId: newUser.data.contact.id,
            title: 'CMPM Abandoned App',
          }),
        }).then((response) => response.json());

        if (deal.data.deal.id) {
          // Update Deal
          await fetch(
            `/api/update-deal?dealId=${deal.data.deal.id}&formType=${isForm}`
          ).then((response) => response.json());
        } else {
          console.log('no deal');
        }
      }
    }
  };

  const methods = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    setIsLoading(true);

    // CertAppStart / ActiveCampaign still expect name fields; collect email only
    // and fill the rest on the full application form.
    const firstName = '';
    const lastName = '';
    const phone = '';

    // Internal analytics: the visitor started (created) their CMPM application.
    // Fire early with the typed email so the eventual sale can stitch back to
    // this touch via the abEventByEmail journey resolution. keepalive covers
    // the router.push to the full form below.
    try {
      trackAbCmpmStart({
        email: data.email || null,
        source: 'cmpm_application_start',
        metadata: {
          firstName: null,
          lastName: null,
          hasPhone: false,
          emailOnly: true,
        },
      });
    } catch (error) {
      console.warn('ab_cmpm_start tracking failed:', error?.message);
    }

    await API.graphql({
      query: createCertAppStart,
      variables: {
        input: {
          firstName,
          lastName,
          email: data.email,
          phone,
          country: location.country ? location.country : 'Undefined',
          ipAddress: location.ip ? location.ip : 'Undefined',
          source: 'CMPM',
          sourceUrl: router && router.asPath,
          type: 'APP_START',
        },
      },
    });

    const formId = await createCmpmFromAppStart({
      firstName,
      lastName,
      email: data.email,
      phone,
      streetAddress: '',
      addressExtra: '',
      city: '',
      state: '',
      birthYear: '',
      companyName: '',
      companyTitle: '',
      linkedin: '',
      background: '',
      whyPackaging: '',
      areaOfInterest: '',
      yearGoals: '',
      cmpmGoals: '',
      moreAboutYou: '',
      status: 'DRAFT',
    });

    await automateDealHandler(data.email, 'CMPM', firstName, lastName, phone);

    await fetch('/api/send-certificate-start', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        firstName,
        lastName,
        phone,
        form: 'CMPM',
      }),
    });
    setIsLoading(false);
    router.push(`/forms/cmpm/${formId.id}`);
  };
  return (
    <>
      <Meta
        title={'Certificate of Mastery in Packaging Management Form Start'}
        description={
          'Distinguish yourself from your colleagues by acquiring a tangible solution that can be presented to both management and peers. Take your first step below—enter your email to begin your application.'
        }
        image={'https://packschool.s3.amazonaws.com/form-seoImage3.webp'}
      />
      <div className='flex flex-col pb-24'>
        <CenteredTextHeader
          headline='Certificate of Mastery in Packaging Management'
          heading='Student Application'
          subhead='Distinguish yourself with a Clemson-backed credential you can present to management and peers. Enter your email to start your application—you’ll fill in the rest on the next step. After you submit the full application, expect a confirmation email within 1–3 business days.'
        />
        <div className='px-6 xl:px-0 pt-2 pb-4 md:pt-4 md:pb-8'>
          <FormProvider {...methods}>
            <form
              className='flex flex-col gap-5 max-w-xl mx-auto'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextInput
                name={'email'}
                type='email'
                placeholder={'Enter your work email'}
                label={'Email'}
                required
              />

              <div className='gap-3 flex justify-end items-center pt-1'>
                {isLoading && (
                  <div className='mr-3'>
                    <Loader />
                  </div>
                )}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='bg-clemson align-end w-full sm:w-fit hover:bg-clemson-dark text-white font-semibold items-center rounded-lg px-5 py-3.5 flex gap-1 justify-center'
                >
                  {isLoading ? 'Preparing' : 'Continue Application'}
                  <div>
                    <ArrowLongRightIcon className='w-6 h-6 stroke-white' />
                  </div>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>

        <div className='px-6 xl:px-0 mt-10 md:mt-14 flex flex-col gap-6'>
          <div
            className='bg-indigo-100 w-full text-center max-w-xs md:max-w-2xl mx-auto rounded-lg py-4 cursor-pointer'
            onClick={() =>
              window.open(
                'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                '_blank'
              )
            }
          >
            <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
              <div>
                <CalendarDaysIcon className='w-8 h-8 items-center' />
              </div>
              <div>
                Questions about CMPM?{' '}
                <span className='font-bold underline'>
                  Schedule a meeting with a counselor.
                </span>
              </div>
            </div>
          </div>

          <blockquote className='mx-auto max-w-2xl border-l-4 border-clemson bg-slate-50 px-6 py-5 md:px-8'>
            <p className='font-greycliff text-lg leading-relaxed text-slate-700 md:text-xl'>
              &ldquo;{SECTION3_QUOTE.body}&rdquo;
            </p>
            <footer className='mt-4 text-sm font-semibold text-slate-900'>
              {SECTION3_QUOTE.author}
              <span className='font-normal text-slate-500'>
                {' '}
                · {SECTION3_QUOTE.role}
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default Page;
