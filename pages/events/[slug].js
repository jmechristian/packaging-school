'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
  getAllEvents,
  getEventBySlug,
  uploadUserEventPhoto,
  uploadToAPS3,
  registerEventClick,
  sendAPSRecoveryEmail,
} from '../../helpers/api';
import {
  MdCalendarMonth,
  MdLocationOn,
  MdPhotoLibrary,
  MdSlideshow,
  MdDoNotDisturb,
  MdSync,
  MdCheckCircle,
  MdError,
} from 'react-icons/md';
import {
  BrutalButton,
  CertCallout,
  H2,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import APSPresentations from '../../components/shared/APSPresentations';
import APSImageGallery from '../../components/shared/APSImageGallery';
import APSAgenda from '../../components/shared/APSAgenda';
import Meta from '../../components/shared/Meta';
import { presentations } from '../../data/presentations';
import { sessionData } from '../../data/sessionData';
import { apsAttendees } from '../../data/aps24';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

const resizeImage = async (file) => {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      throw new Error('This function must be run on client side');
    }

    // Dynamically import heic2any only on client side
    if (file.type === 'image/heic' || file.type === 'image/heif') {
      const heic2any = (await import('heic2any')).default;

      // Convert HEIC to JPEG blob
      const jpegBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9,
      });

      // Create new file with jpeg extension
      const fileName = file.name.replace(/\.(heic|HEIC|heif|HEIF)$/, '.jpg');
      file = new File([jpegBlob], fileName, { type: 'image/jpeg' });
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > 1920) {
              height = Math.round((height * 1920) / width);
              width = 1920;
            }
          } else {
            if (height > 1920) {
              width = Math.round((width * 1920) / height);
              height = 1920;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Start with high quality
          let quality = 0.9;
          let output = canvas.toDataURL('image/jpeg', quality);

          // Reduce quality until file size is under MAX_FILE_SIZE
          while (output.length > MAX_FILE_SIZE * 1.37) {
            // 1.37 accounts for base64 encoding
            quality -= 0.1;
            output = canvas.toDataURL('image/jpeg', quality);
          }

          // Convert base64 to file with sanitized filename
          const sanitizedFilename = file.name.replace(/\s+/g, '_');
          const resizedFile = dataURLtoFile(output, sanitizedFilename);
          resolve({
            file: resizedFile,
            preview: output,
            width,
            height,
            quality: Math.round(quality * 100),
          });
        };
      };
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image: ' + error.message);
  }
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const EventPage = ({ event }) => {
  const router = useRouter();
  const { location } = useSelector((state) => state.auth);
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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const [isUploadedPhoto, setIsUploadedPhoto] = useState(null);
  const [isPasswordSending, setIsPasswordSending] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

  useEffect(() => {
    const savedEmail = Cookies.get('aps_user_email');
    if (savedEmail) {
      setIsUser(savedEmail);
      setIsLocked(false);
    }
  }, []);

  const unlockHandler = () => {
    setIsUnlocking(true);
  };

  const validatePasswordHandler = async () => {
    if (isPassword.toLowerCase() === 'autopack2024') {
      // Set cookie to expire in 30 days
      Cookies.set('aps_user_email', isUser, { expires: 30 });

      setIsPassword('');
      setIsUnlocking(false);
      setIsLocked(false);
    } else {
      setIsError(true);
    }
  };

  const downloadHandler = async (image) => {
    const res = await registerEventClick({
      country: location.country,
      email: isUser,
      eventTemplateClicksId: event.id,
      ipAddress: location.ipAddress,
      object: image.src,
      objectId: image.id,
      page: 'APS24',
      type: 'download',
    });

    router.push(image.src);
  };

  const handleRecoverSubmit = async () => {
    setIsPasswordSending(true);
    const res = await sendAPSRecoveryEmail(isEmail);
    if (res === 200) {
      setIsError(false);
      setIsRecoverMode(false);
      setIsEmailSent(true);
    } else {
      setIsError(true);
    }
    setIsPasswordSending(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkLocalAttendee = async (email) => {
    return apsAttendees.find(
      (attendee) => attendee.email.toLowerCase() === email.toLowerCase()
    );
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setIsEmail(email);
    if (validateEmail(email)) {
      setIsCheckingEmail(true);
      const attendee = await checkLocalAttendee(email);
      if (attendee || email.toLowerCase().includes('@packagingschool.com')) {
        setIsUser(email);
        setIsEmailError(false);
        setIsEmailConfirmed(true);
      } else {
        setIsEmailConfirmed(false);
        setIsEmailError(true);
      }
      setIsCheckingEmail(false);
    }
  };

  const photoAddHandler = () => {
    setIsUploadOpen(true);
  };

  const handleFileUpload = async (file) => {
    try {
      // Accept both standard images and HEIC/HEIF
      if (
        !file.type.startsWith('image/') &&
        !['image/heic', 'image/heif'].includes(file.type)
      ) {
        throw new Error('Please upload a valid image file');
      }

      const resizedImage = await resizeImage(file);

      // Set preview
      setUploadPreview(resizedImage.preview);

      // Optional: Log image details
      // console.log(
      //   `Resized image: ${resizedImage.width}x${resizedImage.height} at ${resizedImage.quality}% quality`
      // );
      // console.log(
      //   `File size: ${resizedImage.file.name} - ${Math.round(
      //     resizedImage.file.size / 1024
      //   )}KB`
      // );

      const photoUrl = await uploadToAPS3(resizedImage.file);
      if (photoUrl) {
        setIsUploadedPhoto(photoUrl);
      }
      // const upload = await uploadUserEventPhoto(
      //   uploadCaption,
      //   event.title,
      //   event.id,
      //   photoUrl,
      //   isUser
      // );
    } catch (error) {
      console.error('Error processing image:', error);
      // Handle error appropriately
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadSubmit = async () => {
    setIsUploading(true);
    try {
      const res = await uploadUserEventPhoto(
        uploadCaption,
        event.title,
        event.id,
        isUploadedPhoto,
        isUser
      );
      setIsUploadSuccess(true);
      setUploadPreview(null);
      setUploadCaption('');
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploadError(true);
    }
    setIsUploading(false);
  };

  const handleLogout = () => {
    Cookies.remove('aps_user_email');
    setIsUser('');
    setIsLocked(true);
  };

  return (
    <>
      {event ? (
        <>
          <Meta
            title={event.title}
            description={event.description}
            image={event.hero}
          />
          <div className='max-w-7xl mx-auto flex flex-col py-10 lg:!py-20 relative'>
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
                    <h2 className='text-2xl font-bold text-brand-indigo'>
                      {isRecoverMode
                        ? 'Recover Password'
                        : 'Registered Attendee?'}
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
                        Email
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
                        isRecoverMode
                          ? handleRecoverSubmit
                          : validatePasswordHandler
                      }
                      disabled={!isEmail || (!isRecoverMode && !isPassword)}
                      className={`w-full py-2 rounded mt-4 ${
                        !isEmailConfirmed || (!isRecoverMode && !isPassword)
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-black hover:bg-gray-800'
                      } text-white ${isPasswordSending ? 'animate-pulse' : ''}`}
                    >
                      {isRecoverMode ? 'Send Recovery Email' : 'Submit'}
                    </button>
                    <button
                      onClick={() => {
                        setIsError(false);
                        setIsRecoverMode(!isRecoverMode);
                      }}
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
                          : 'Incorrect password. Please try again.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* HEADER */}
            <div className='grid p-5 md:!p-[2.5rem] lg:!p-0 grid-cols-1 lg:grid-cols-12 gap-10'>
              <div className='flex flex-col gap-5 lg:col-span-9 '>
                <H2 textColor='text-black'>
                  AutoPack Summit 2024 – Paving the Way for the Future of
                  Automotive Packaging
                </H2>
                <div>
                  AutoPack Summit 2024 concluded on a high note, bringing
                  together top industry leaders, experts, and innovators for a
                  dynamic exchange of ideas and strategies. Held over three
                  days, the summit explored critical topics shaping the future
                  of automotive packaging, from sustainable innovations to
                  cutting-edge technology integration.
                </div>
                <div>
                  Throughout the summit, attendees actively participated in
                  Mentimeter-powered Q&A sessions, fostering real-time
                  interaction on topics like material innovations, regulatory
                  impacts, and future trends. Networking opportunities,
                  including speed networking rounds focused on Production
                  Packaging and Expendable & Aftersales Packaging, provided
                  valuable connections and insights.
                </div>
                <div>
                  With an impressive lineup of speakers, case studies, and
                  interactive discussions, AutoPack Summit 2024 solidified its
                  role as a premier platform for advancing the automotive
                  packaging industry. Attendees left with actionable strategies
                  to implement in their organizations, paving the way for a more
                  sustainable and efficient automotive supply chain.
                </div>
                <div>
                  We look forward to welcoming everyone back next year for
                  AutoPack Summit 2025!
                </div>
              </div>
              <div className='lg:col-span-3 w-full border-2 border-black shadow-[5px_5px_0px_black] bg-ap-yellow/40 flex flex-col md:!flex-row lg:!flex-col'>
                <div className='w-full aspect-video md:!aspect-square border bg-white p-16 lg:!p-8 flex items-center justify-center'>
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
                        <span className='font-semibold '>
                          October 21, 2024 -
                        </span>
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
            <div className='sticky z-20 top-2 mt-10 lg:!mt-28'>
              <div className='w-full bg-black/60 backdrop-blur-sm flex items-center justify-start p-5'>
                <div className='flex items-center gap-3'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div
                      className='flex items-center gap-2 justify-center bg-black hover:bg-ap-yellow transition-colors duration-300 py-2 px-3 cursor-pointer'
                      onClick={() => {
                        router.push('#photos');
                      }}
                    >
                      <MdPhotoLibrary
                        color='white'
                        size={24}
                        className='hidden md:block lg:block'
                      />
                      <div className='font-semibold text-white text-sm lg:text-base'>
                        Photos
                      </div>
                    </div>
                    <div
                      className='flex items-center gap-2 justify-center bg-black hover:bg-ap-yellow transition-colors duration-300 py-2 px-3 cursor-pointer'
                      onClick={() => {
                        router.push('#presentations');
                      }}
                    >
                      <MdSlideshow
                        color='white'
                        size={24}
                        className='hidden md:block lg:block'
                      />
                      <div className='font-semibold text-white text-sm lg:text-base'>
                        Presentations
                      </div>
                    </div>
                    <div
                      className='flex items-center gap-2 justify-center bg-black hover:bg-ap-yellow transition-colors duration-300 py-2 px-3 cursor-pointer'
                      onClick={() => {
                        router.push('#agenda');
                      }}
                    >
                      <MdCalendarMonth
                        color='white'
                        size={24}
                        className='hidden md:block lg:block'
                      />
                      <div className='font-semibold text-white text-sm lg:text-base'>
                        Agenda
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PHOTOS */}
            <div id='photos' className='scroll-mt-20 mb-12'>
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
                  photoAddHandler={photoAddHandler}
                />
              </div>
            </div>
            <div className='flex flex-col gap-10 lg:gap-24'>
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
              <div
                id='agenda'
                className='flex flex-col gap-8 md:gap-10 scroll-mt-20'
              >
                <APSAgenda
                  dayOne={dayOne}
                  dayTwo={dayTwo}
                  dayThree={dayThree}
                  enabled={true}
                />
              </div>
            </div>

            {/* Upload Modal */}
            {isUploadOpen && (
              <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'>
                <div className='w-full max-w-xl p-10 bg-white border-2 border-black relative'>
                  <AnimatePresence>
                    {isUploadSuccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => {
                          setTimeout(() => {
                            setIsUploadSuccess(false);
                          }, 2000);
                        }}
                        className='flex gap-2 items-center absolute bottom-4 right-4 z-30 bg-green-600 text-white px-4 py-2 rounded-lg'
                      >
                        <MdCheckCircle color='white' size={24} />
                        <div className='font-bold'>Photo Uploaded!</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isUploadError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={() => {
                          setTimeout(() => {
                            setIsUploadError(false);
                          }, 2000);
                        }}
                        className='flex gap-2 items-center absolute bottom-4 right-4 z-30 bg-red-600 text-white px-4 py-2 rounded-lg'
                      >
                        <MdError color='white' size={24} />
                        <div className='font-bold'>Error Uploading Photo!</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => {
                      setIsUploadOpen(false);
                      setUploadPreview(null);
                      setUploadCaption('');
                    }}
                    className='absolute top-4 right-4 text-2xl font-bold hover:text-gray-600'
                  >
                    ×
                  </button>

                  <div className='flex flex-col gap-6'>
                    <h2 className='text-2xl font-bold text-brand-indigo'>
                      Upload Photo
                    </h2>

                    {/* File Drop Zone */}
                    <div
                      className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400'
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file.type.startsWith('image/')) {
                          handleFileUpload(file);
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {uploadPreview ? (
                        <img
                          src={uploadPreview}
                          alt='Preview'
                          className='max-h-48 mx-auto'
                        />
                      ) : (
                        <div>
                          <p>Drag and drop your image here or</p>
                          <input
                            type='file'
                            accept='image/*'
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0])
                            }
                            className='mt-2'
                          />
                        </div>
                      )}
                    </div>

                    {/* Caption Input */}
                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Caption ({uploadCaption.length}/140 characters)
                      </label>
                      <textarea
                        value={uploadCaption}
                        onChange={(e) =>
                          setUploadCaption(e.target.value.slice(0, 140))
                        }
                        className='w-full p-2 border border-gray-300 rounded'
                        rows={3}
                        placeholder='Add a caption to your photo...'
                      />
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4'>
                      <button
                        onClick={handleUploadSubmit}
                        disabled={!uploadPreview || isUploading}
                        className={`flex-1 py-2 rounded ${
                          !uploadPreview || isUploading
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-black hover:bg-gray-800 text-white'
                        }`}
                      >
                        {isUploading ? 'Uploading...' : 'Submit'}
                      </button>
                      <button
                        onClick={() => {
                          setIsUploadOpen(false);
                          setUploadPreview(null);
                          setUploadCaption('');
                        }}
                        className='flex-1 py-2 border border-black rounded hover:bg-gray-100'
                      >
                        Cancel
                      </button>
                    </div>
                    <div className='text-sm text-gray-500 leading-tight text-center'>
                      Thank you for sharing your photos! Just a quick note: all
                      images and captions will go through a brief approval
                      process. By uploading, you grant us the right to feature
                      your image in our marketing materials if selected. We’re
                      excited to see what you’ll share!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
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
