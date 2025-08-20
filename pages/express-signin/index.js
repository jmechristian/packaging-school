import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAuth0User, updateAuth0UserPassword } from '../../helpers/api';

const Page = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState('');

  // Set email from URL query parameter
  React.useEffect(() => {
    async function fetchUser() {
      if (router.query.email) {
        setEmail(router.query.email);
        const response = await getAuth0User(router.query.email);

        if (response.data && response.data.length > 0) {
          // Find user with Username-Password-Authentication connection
          const passwordUser = response.data.find(
            (user) =>
              user.identities &&
              user.identities.some(
                (identity) =>
                  identity.connection === 'Username-Password-Authentication'
              )
          );

          if (passwordUser) {
            setUserId(passwordUser.user_id);
            console.log('User ID:', passwordUser.user_id);
            setError(null); // Clear any existing error
          } else {
            setError('No Email/Password found');
          }
        } else {
          setError('No Email/Password found');
        }
      } else {
        setError('No email provided');
      }
    }
    fetchUser();
  }, [router.query.email]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    console.log('Password validation:', {
      password,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid:
        minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar,
    });

    return (
      minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    setError(null);
    setMessage(null);
    e.preventDefault();

    console.log('Form submission started');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('User ID:', userId);

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password does not meet requirements. Please ensure it has at least 8 characters with uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!userId) {
      setError('User ID not found');
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateAuth0UserPassword(userId, password);
      console.log('Response:', response);

      // Check if response has an error property (API returned error)
      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setMessage('Password reset successful');
        setPassword('');
        setConfirmPassword('');
        router.push(`/login?email=${email}`);
      } else {
        setError('Password reset failed');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Password reset failed');
    }

    setIsLoading(false);
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center px-4 py-8 z-50'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-90 z-10'></div>
      <div
        className='max-w-md w-full space-y-5 bg-white py-6 md:!py-9 px-4 md:!px-8 rounded-xl shadow relative z-20 overflow-y-scroll max-h-[90vh]'
        id='scrollers'
      >
        <div className='flex justify-center'>
          <Image
            src='https://packschool.s3.us-east-1.amazonaws.com/ps-logo-square.svg'
            alt='Packaging School Logo'
            width={90}
            height={90}
          />
        </div>
        <div className='flex flex-col items-center gap-1 mb-4'>
          <div className='font-oswald uppercase text-center text-clemson text-xl tracking-[.4em]'>
            Welcome To
          </div>
          <div className='h3-base text-center'>The Packaging School</div>
        </div>
        <div className='w-full h-[1px] bg-gray-200'></div>
        <div className='flex flex-col items-center gap-2 mb-4 space-y-1.5 py-2'>
          <div className='text-center text-slate-600 text-lg font-semibold'>
            Enter Your New Password Below
          </div>
          <div className='text-sm text-gray-500 mx-auto'>
            Password must be at least 8 characters long and contain:
            <ul className='text-xs mt-1 mb-3 space-y-0.5'>
              <li>• At least one uppercase letter (A-Z)</li>
              <li>• At least one lowercase letter (a-z)</li>
              <li>• At least one number (0-9)</li>
              <li>• At least one special character (!@#$%^&*...)</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className='w-full space-y-3'>
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='New Password'
                className='w-full border border-gray-300 rounded-md px-3 py-2 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                {showPassword ? (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className='relative w-full'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                className='w-full border border-gray-300 rounded-md px-3 py-2 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                {showConfirmPassword ? (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                )}
              </button>
            </div>
            <button
              type='submit'
              disabled={
                isLoading ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                !email
              }
              className='w-full bg-clemson text-white py-3 px-4 rounded-md hover:bg-clemson-dark transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          {error && (
            <div className='text-center text-red-600 mt-2'>{error}</div>
          )}
          {message && (
            <div className='text-center text-green-600 mt-2'>{message}</div>
          )}
        </div>

        <div className='w-full h-[1px] bg-gray-200'></div>
        {/* Social logins */}
        {/* <div className='grid grid-cols-4 gap-3'>
          <Link
            href={getAuthUrl('/api/auth/linkedin-login')}
            className='flex items-center justify-center bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 transition-colors'
            title='Continue with LinkedIn'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </Link>

          <Link
            href={getAuthUrl('/api/auth/google-login')}
            className='flex items-center justify-center bg-white text-gray-700 p-3 rounded-md hover:bg-gray-50 transition-colors border border-gray-300'
            title='Continue with Google'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
          </Link>

          <Link
            href={getAuthUrl('/api/auth/facebook-login')}
            className='flex items-center justify-center bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors'
            title='Continue with Facebook'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
          </Link>

          <Link
            href={getAuthUrl('/api/auth/apple-login')}
            className='flex items-center justify-center bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors'
            title='Continue with Apple'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
            </svg>
          </Link>
        </div>

        <div className='text-center text-gray-400'>or</div> */}

        {/* Email input and login options */}
        {/* <div className='space-y-4'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your email'
            className='w-full border border-gray-300 rounded-md px-3 py-2'
          />

          <div className='space-y-3'>
            <Link
              href={
                email
                  ? `/api/auth/password-login?email=${encodeURIComponent(
                      email
                    )}${
                      returnTo
                        ? `&returnTo=${encodeURIComponent(returnTo)}`
                        : ''
                    }`
                  : getAuthUrl('/api/auth/password-login')
              }
              className='block text-center bg-clemson text-white py-3 px-4 rounded-md hover:bg-clemson-dark transition-colors font-medium'
            >
              Login with Password
            </Link>

            <button
              onClick={handleMagicLink}
              disabled={!email}
              className='block w-full bg-base-brand text-white py-3 px-4 rounded-md hover:bg-base-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium'
            >
              Send One-Time Code
            </button>
          </div>

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes('Check your inbox')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div className='text-center text-sm text-gray-500'>
          New here?{' '}
          <Link
            href={getAuthUrl('/api/auth/signup')}
            className='text-blue-600 hover:underline'
          >
            Create an account.
          </Link>
        </div>
        <div className='text-center text-sm text-gray-500'>
          <Link href={getAuthUrl('/')} className='text-red-600 hover:underline'>
            Cancel
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
