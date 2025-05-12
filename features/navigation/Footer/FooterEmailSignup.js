import React, { useState } from 'react';
import {
  createNewEmailSubscription,
  getDeviceType,
} from '../../../helpers/api';
import { useSelector } from 'react-redux';
const FooterEmailSignup = ({ header, sm }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { location } = useSelector((state) => state.auth);

  const subscribeFormHandler = async (e) => {
    e.preventDefault();

    // Add email validation
    if (!email || !email.trim() || !email.includes('@')) {
      setEmail('Please enter a valid email');
      return;
    }

    const formData = new FormData(e.target);

    // Hidden field key/values.
    formData.append('u', '90');
    formData.append('f', '90');
    formData.append('s', 's');
    formData.append('c', '0');
    formData.append('m', '0');
    formData.append('act', 'sub');
    formData.append('v', '2');
    formData.append('or', '0c1319e8fc019ba9b13bc70d9fe0b4ef');

    formData.append('email', email);
    setIsLoading(true);

    try {
      await fetch('https://packagingschool42200.activehosted.com/proc.php', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });
      await createNewEmailSubscription(
        email,
        location,
        getDeviceType(),
        window.location.pathname
      );
      setIsLoading(false);
      setEmail('You are subscribed!');
    } catch (err) {
      setIsLoading(false);
      setEmail('Request failed!');
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {header && (
        <div className='flex flex-col gap-1 text-sm'>
          <div className='font-extrabold text-sm uppercase tracking-widest dark:text-gray-200 font-greycliff'>
            Stay Up To Date
          </div>
          <p className='text-gray-600 dark:text-gray-500'>
            Be the first to know about new classes and the latest tools to
            maximize your knowledge.
          </p>
        </div>
      )}
      <div className='flex flex-col gap-4'>
        <form className='flex h-11 border-none' onSubmit={subscribeFormHandler}>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='you@email.com'
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              sm ? 'text-sm' : ''
            } flex w-full border border-gray-500  bg-gray-300 rounded-l text-gray-700 focus:ring-base-light focus:border-none`}
          />
          <button
            type='submit'
            className='bg-clemson flex justify-center items-center border-none rounded-r border border-gray-500'
          >
            {sm ? (
              <div className='text-gray-700 font-medium uppercase text-xs px-3'>
                {isLoading ? '...' : '>'}
              </div>
            ) : (
              <div className='text-gray-700 font-medium uppercase text-xs tracking-widest px-3'>
                {isLoading ? 'Sending...' : 'Subscribe'}
              </div>
            )}
          </button>
        </form>
        <p className='text-xs text-gray-500 max-w-prose'>
          By signing up you indicate you have read and agree to our Terms of
          Use. Packaging School will always respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default FooterEmailSignup;
