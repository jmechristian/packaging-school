/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react';
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

export default function Index() {
  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/contact',
    title: 'Contact the Packaging School',
    description:
      'Have queries or want to learn about packaging? Contact the Packaging School for expert insights and tailored educational content.',
  });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Contact', path: '/contact' }],
    siteUrl,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => sendSubmitNotification(data);

  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const sendSubmitNotification = async (data) => {
    setIsSending(true);
    await fetch('/api/send-contact-email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    setIsSending(false);
    setHasSent(true);
  };

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/contact'
        image='https://packschool.s3.amazonaws.com/contact-seoImage.webp'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='relative isolate bg-white'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
          <div className='relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48'>
            <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
              <div className='absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2'>
                <svg
                  className='absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
                  aria-hidden='true'
                >
                  <defs>
                    <pattern
                      id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
                      width={200}
                      height={200}
                      x='100%'
                      y={-1}
                      patternUnits='userSpaceOnUse'
                    >
                      <path d='M130 200V.5M.5 .5H200' fill='none' />
                    </pattern>
                  </defs>
                  <rect
                    width='100%'
                    height='100%'
                    strokeWidth={0}
                    fill='white'
                  />
                  <svg
                    x='100%'
                    y={-1}
                    className='overflow-visible fill-gray-50'
                  >
                    <path d='M-470.5 0h201v201h-201Z' strokeWidth={0} />
                  </svg>
                  <rect
                    width='100%'
                    height='100%'
                    strokeWidth={0}
                    fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
                  />
                </svg>
              </div>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                Get in touch
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                Do you have any inquiries regarding certificates or courses? Are
                you open to collaborating with Packaging School? Feel free to
                reach out to us and share your thoughts on how we can enhance
                your learning journey, making it even more fulfilling. Join the
                ranks of knowledge leaders in the packaging design realm by
                getting involved with us. Drop us a line today!
              </p>
              <dl className='mt-10 space-y-4 text-base leading-7 text-gray-600'>
                <div className='flex gap-x-4'>
                  <dt className='flex-none'>
                    <span className='sr-only'>Address</span>
                    <BuildingOffice2Icon
                      className='h-7 w-6 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd>
                    640 S Main St Suite 100
                    <br />
                    Greenville, SC 29601
                  </dd>
                </div>
                <div className='flex gap-x-4'></div>
                <div className='flex gap-x-4'>
                  <dt className='flex-none'>
                    <span className='sr-only'>Email</span>
                    <EnvelopeIcon
                      className='h-7 w-6 text-gray-400'
                      aria-hidden='true'
                    />
                  </dt>
                  <dd>
                    <a
                      className='hover:text-gray-900'
                      href='mailto:info@packagingschool.com'
                    >
                      info@packagingschool.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form
            className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
              <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      autoComplete='given-name'
                      className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register('firstName', { required: true })}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      autoComplete='family-name'
                      className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register('lastName', { required: true })}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Email
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      autoComplete='email'
                      className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register('email', { required: true })}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Phone number
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='tel'
                      name='phone'
                      id='phone'
                      autoComplete='tel'
                      className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register('phone')}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='message'
                    className='block text-sm font-semibold leading-6 text-gray-900'
                  >
                    Message
                  </label>
                  <div className='mt-2.5'>
                    <textarea
                      name='message'
                      id='message'
                      rows={4}
                      className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      defaultValue={''}
                      {...register('message', { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className='mt-8 flex justify-end'>
                <button
                  type='submit'
                  className='rounded-md bg-clemson px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson'
                  disabled={hasSent}
                >
                  {isSending
                    ? 'Sending...'
                    : hasSent
                    ? 'Sent!'
                    : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
