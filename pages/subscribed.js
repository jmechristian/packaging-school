import { useState } from 'react';
import {
  BoltIcon,
  ServerIcon,
  AcademicCapIcon,
  BookOpenIcon,
  LightBulbIcon,
  UsersIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/20/solid';
import UnsubscribeModal from '../components/shared/UnsubscribeModal';
import { useRouter } from 'next/router';
import Head from 'next/head';

const features = [
  {
    name: 'Comprehensive Curriculum.',
    description:
      'Accelarate your packaging knowledge and differientiate yourself from your peers.',
    icon: AcademicCapIcon,
    link: '/certifications',
  },
  {
    name: 'Learning of the Months.',
    description:
      'Monthly, free lessons and resources from the industry leaders in packaging education.',
    icon: LightBulbIcon,
    link: '/library',
  },
  {
    name: 'Robust Knowledge Library.',
    description:
      'An ever-growing collection of tools to help you navigate your packaging design solutions.',
    icon: BookmarkSquareIcon,
    link: '/library',
  },
  {
    name: 'Powerful Community.',
    description:
      'Join a diverse set of packaging professionals committed to accessible and applicable online packaging education.',
    icon: UsersIcon,
    link: 'https://www.linkedin.com/school/the-packaging-school-llc',
  },
];

export default function Example() {
  const [isSubmitted, setSubmitted] = useState(undefined);
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const email = router.query.email;

  const unsubscribe = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    setIsSending(true);
    await fetch('/api/unsub-pearldiver', options).then((response) =>
      response
        .json()
        .then((response) => setSubmitted(response))
        .catch((err) => console.log(err))
    );
    setIsSending(false);
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='bg-white py-24 sm:py-32 sm:mb-12 relative'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl sm:text-center'>
            <h2 className='text-base font-semibold leading-7 text-clemson'>
              You Are Subscribed!
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Leverage the expertise of the packaging industry&apos;s knowledge
              leaders.
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We are grateful you have chosen to be a part of the Packaging
              School. We hope you take advantage and explore the comprehensive
              library of expertly-currated curriculum.
            </p>
          </div>
        </div>
        <div className='mx-auto mt-16 max-w-4xl px-6 sm:mt-16 md:mt-16 lg:px-8'>
          <dl className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16 lg:gap-y-16'>
            {features.map((feature) => (
              <div
                key={feature.name}
                className='relative pl-9 cursor-pointer'
                onClick={() => router.push(feature.link)}
              >
                <dt className='inline font-semibold text-gray-900'>
                  <feature.icon
                    className='absolute left-1 top-1 h-5 w-5 text-clemson'
                    aria-hidden='true'
                  />
                  {feature.name}
                </dt>{' '}
                <dd className='inline'>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className='bg-indigo-100 max-w-4xl container mx-auto w-full mt-16 lg:mt-20 md:rounded-lg'>
          <div className='py-8 flex justify-center items-center cursor-pointer'>
            {isSubmitted ? (
              isSubmitted.message
            ) : (
              <div
                className='text-base text-center'
                onClick={() => setIsOpen(true)}
              >
                Didn&apos;t mean to subscribe?{' '}
                <strong>Click here to unsubscribe.</strong>
              </div>
            )}
          </div>
        </div>
        <UnsubscribeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          unSub={() => unsubscribe()}
          loading={isSending}
        />
      </div>
    </>
  );
}
