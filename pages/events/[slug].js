'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  getAllEvents,
  getEventBySlug,
  checkRegistrantEmail,
} from '../../helpers/api';
import {
  MdCalendarMonth,
  MdLocationOn,
  MdPhotoLibrary,
  MdSlideshow,
  MdDoNotDisturb,
  MdSync,
  MdDehaze,
} from 'react-icons/md';
import {
  DropDownSelect,
  BrutalButton,
  CertCallout,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import APSPresentations from '../../components/shared/APSPresentations';
import APSImageGallery from '../../components/shared/APSImageGallery';
import APSAgenda from '../../components/shared/APSAgenda';

import { presentations } from '../../data/presentations';
import { sessionData } from '../../data/sessionData';

const EventPage = ({ event }) => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isPassword, setIsPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isImages, setIsImages] = useState([]);
  const [isEmail, setIsEmail] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isRecoverMode, setIsRecoverMode] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const dayOne = sessionData.filter((s) => s.date === '2024-10-21');
  const dayTwo = sessionData.filter((s) => s.date === '2024-10-22');
  const dayThree = sessionData.filter((s) => s.date === '2024-10-23');

  useEffect(() => {
    const mappedImages =
      event &&
      event.photos.items
        .map((photo) => ({
          id: photo.id,
          src: photo.photo,
          caption: photo.caption || '',
          alt: photo.caption || '',
          uploadedBy: photo.uploadedBy,
          uploadedAt: photo.createdAt,
        }))
        .sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));

    setIsImages(mappedImages);
    // console.log(event.photos.items);
  }, [event]);

  const unlockHandler = () => {
    setIsUnlocking(true);
  };

  const validatePasswordHandler = () => {
    if (isPassword.toLowerCase() === 'packphotos24') {
      setIsPassword('');
      setIsUnlocking(false);
      setIsLocked(false);
    }
  };

  const downloadHandler = (image) => {
    console.log(image);
  };

  const handleRecoverSubmit = () => {
    console.log('Recovery email sent to:', isEmail);
    setIsError(false);
    setIsRecoverMode(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setIsEmail(email);
    if (validateEmail(email)) {
      setIsCheckingEmail(true);
      const registrant = await checkRegistrantEmail(email);
      if (
        registrant.items.length > 0 ||
        email.toLowerCase().includes('@packagingschool.com')
      ) {
        setIsEmailError(false);
        setIsEmailConfirmed(true);
      } else {
        setIsEmailConfirmed(false);
        setIsEmailError(true);
      }
      setIsCheckingEmail(false);
    }
  };

  return event ? (
    <div className='max-w-7xl mx-auto flex flex-col gap-12 md:py-20 sm:py-10  relative'>
      {/*  LOGIN MODAL */}
      {isUnlocking && (
        <div className='fixed mx-auto inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='w-full max-w-xl p-10 bg-white border-2 border-black relative'>
            <button
              onClick={() => {
                setIsUnlocking(false);
                setIsRecoverMode(false);
                setIsPassword('');
                setIsEmail('');
                setIsEmailConfirmed(false);
              }}
              className='absolute top-4 right-4 text-2xl font-bold hover:text-gray-600'
            >
              ×
            </button>
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold text-clemson'>
                {isRecoverMode ? 'Recover Password' : 'Registered Attendee?'}
              </h2>
              <p className='mb-4 font-medium'>
                {isRecoverMode
                  ? 'Please enter the email you used to register to receive password recovery instructions.'
                  : 'Please enter the email used for registration and the password sent in the post-event email to access event media.'}
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium mb-1'
                >
                  Email (Case Sensitive)
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    value={isEmail}
                    onChange={handleEmailChange}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter your email'
                  />
                  {isEmailError && !isCheckingEmail && (
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      <div className='w-5 h-5 flex items-center justify-center'>
                        <MdDoNotDisturb color='black' size={24} />
                      </div>
                    </div>
                  )}
                  {isCheckingEmail && (
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      <div className='w-5 h-5 animate-spin rounded-full flex items-center justify-center'>
                        <MdSync color='black' size={24} />
                      </div>
                    </div>
                  )}
                  {isEmailConfirmed && (
                    <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                      <div className='w-5 h-5 rounded-full bg-green-500 flex items-center justify-center'>
                        <svg
                          className='w-3 h-3 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!isRecoverMode && (
                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium mb-1'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    value={isPassword}
                    onChange={(e) => setIsPassword(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    placeholder='Enter password'
                  />
                </div>
              )}
              <button
                onClick={
                  isRecoverMode ? handleRecoverSubmit : validatePasswordHandler
                }
                disabled={!isEmail || (!isRecoverMode && !isPassword)}
                className={`w-full py-2 rounded mt-4 ${
                  !isEmailConfirmed || (!isRecoverMode && !isPassword)
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                } text-white`}
              >
                {isRecoverMode ? 'Send Recovery Email' : 'Submit'}
              </button>
              <button
                onClick={() => setIsRecoverMode(!isRecoverMode)}
                className='underline text-sm flex w-full justify-center'
              >
                {isRecoverMode
                  ? 'Back to Login'
                  : 'I did not receive a password'}
              </button>
              {isError && (
                <p className='text-red-500 flex w-full justify-center'>
                  {isRecoverMode
                    ? 'Error sending recovery email. Please try again.'
                    : 'Incorrect email or password. Please try again.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* HEADER */}
      {/* <div className='grid md:grid-cols-2 gap-8'>
        <div className='grid content-center '>
          <Image src={event.hero} alt={event.title} width={800} height={600} />
        </div>
        <div className='flex flex-col gap-5 p-5 lg:p-10'>
          <h1 className='text-4xl md:text-5xl font-bold'>{event.title}</h1>
          <p className='text-lg md:text-xl leading-normal'>
            {event.description}
          </p>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <div>
                <MdCalendarMonth color='black' size={24} />
              </div>
              <span className='font-semibold '>{event.startDate}</span>
              <span className=''>-</span>
              <span className='font-semibold'>{event.endDate}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <MdLocationOn color='black' size={24} />
              </div>
              <span className='font-semibold '>{event.location}</span>
            </div>
          </div>
          <div className='flex gap-4'>
            <BrutalButton
              text='View Event Site'
              background='bg-clemson'
              link='https://www.autopacksummit.com'
              textColor='text-white'
            />
          </div>
        </div>
      </div> */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 relative'>
        <div className='flex flex-col gap-5 col-span-9 '>
          <div className='h2-base'>
            AutoPack Summit 2024 – Paving the Way for the Future of Automotive
            Packaging
          </div>
          <div>
            AutoPack Summit 2024 concluded on a high note, bringing together top
            industry leaders, experts, and innovators for a dynamic exchange of
            ideas and strategies. Held over three days, the summit explored
            critical topics shaping the future of automotive packaging, from
            sustainable innovations to cutting-edge technology integration.
          </div>
          <div>
            Throughout the summit, attendees actively participated in
            Mentimeter-powered Q&A sessions, fostering real-time interaction on
            topics like material innovations, regulatory impacts, and future
            trends. Networking opportunities, including speed networking rounds
            focused on Production Packaging and Expendable & Aftersales
            Packaging, provided valuable connections and insights.
          </div>
          <div>
            With an impressive lineup of speakers, case studies, and interactive
            discussions, AutoPack Summit 2024 solidified its role as a premier
            platform for advancing the automotive packaging industry. Attendees
            left with actionable strategies to implement in their organizations,
            paving the way for a more sustainable and efficient automotive
            supply chain.
          </div>
          <div>
            We look forward to welcoming everyone back next year for AutoPack
            Summit 2025!
          </div>
        </div>
        <div className='col-span-3 w-full h-full border-2 border-black shadow-[5px_5px_0px_black] bg-ap-yellow/40'>
          <div className='w-full h-auto aspect-video border bg-white p-8 flex items-center justify-center'>
            <Image
              src={
                'https://packschool.s3.us-east-1.amazonaws.com/AutoPackSummit+RGB+COLOR+on+Transparent+Back.png'
              }
              alt={event.title}
              width={1900}
              height={498}
              className='object-cover'
            />
          </div>
          <div className='p-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <div>
                  <MdCalendarMonth color='black' size={32} />
                </div>
                <div className='flex flex-col '>
                  <span className='font-semibold '>October 21, 2024 -</span>
                  <span className='font-semibold'>October 23, 2024</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div>
                  <MdLocationOn color='black' size={32} />
                </div>
                <span className='font-semibold '>{event.location}</span>
              </div>
              <div className='mt-4'>
                <BrutalButton
                  text='View Event Site'
                  background='bg-clemson'
                  link='https://www.autopacksummit.com'
                  textColor='text-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sticky z-20 top-2'>
        <div className='w-fit mx-auto bg-black/60 backdrop-blur-sm rounded-md flex items-center justify-start p-4'>
          <div className='flex items-center gap-3'>
            <div className='text-lg font-semibold text-white'>
              <div>
                <MdDehaze size={22} color='white' />
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div
                className='flex items-center gap-2 justify-center bg-white hover:bg-clemson transition-colors duration-300 py-2 px-3 cursor-pointer'
                onClick={() => {
                  router.push('#photos');
                }}
              >
                <MdPhotoLibrary color='black' size={24} />
                <div className='font-semibold text-black'>Photos</div>
              </div>
              <div
                className='flex items-center gap-2 justify-center bg-white hover:bg-clemson transition-colors duration-300 py-2 px-3 cursor-pointer'
                onClick={() => {
                  router.push('#presentations');
                }}
              >
                <MdSlideshow color='black' size={24} />
                <div className='font-semibold text-black'>Presentations</div>
              </div>
              <div
                className='flex items-center gap-2 justify-center bg-white hover:bg-clemson transition-colors duration-300 py-2 px-3 cursor-pointer'
                onClick={() => {
                  router.push('#agenda');
                }}
              >
                <MdCalendarMonth color='black' size={24} />
                <div className='font-semibold text-black'>Agenda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PHOTOS */}
      <div id='photos' className='scroll-mt-20'>
        <div className='flex flex-col gap-8 md:gap-10'>
          {/* <div className='flex items-center gap-2'>
            <MdPhotoLibrary color='black' size={24} />
            <h2 className='text-2xl md:text-3xl font-bold'>Gallery</h2>
          </div> */}
          <APSImageGallery
            images={isImages && isImages}
            isLocked={isLocked}
            unlockHandler={unlockHandler}
            validatePasswordHandler={validatePasswordHandler}
            downloadHandler={(image) => downloadHandler(image)}
            isUnlocking={isUnlocking}
          />
        </div>
      </div>
      <CertCallout
        headline='Master Automotive Packaging – Lead with Expertise and Innovation'
        subheadline='Gain the industry’s only 100% online certification designed for automotive packaging professionals. Develop critical skills with insights from leading experts and prepare to excel in a dynamic field.'
        linkText='Enroll Now and Accelerate Your Career'
        cert={'APC'}
        link='certifications/get-to-know-apc'
        cardClickHandler={() => {
          router.push('/certifications/get-to-know-apc');
        }}
      />
      {/* PRESENTATIONS */}
      <div id='presentations' className='scroll-mt-20'>
        <div className='flex flex-col gap-8 md:gap-10'>
          <APSPresentations presentations={presentations} />
        </div>
      </div>

      {/* AGENDA */}
      <div id='agenda' className='flex flex-col gap-8 md:gap-10 scroll-mt-20'>
        <APSAgenda
          dayOne={dayOne}
          dayTwo={dayTwo}
          dayThree={dayThree}
          enabled={true}
        />
      </div>
      {/* CTA */}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const event = await getEventBySlug(slug);

  return { props: { event: event.items[0] }, revalidate: 10 };
}

export default EventPage;
