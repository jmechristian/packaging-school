import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { returnTo } = router.query;

  // Get the referring URL if no returnTo is specified
  const getReturnTo = () => {
    if (returnTo) {
      // If returnTo is an external URL (learn subdomain), store it for later use
      if (returnTo.includes('learn.packagingschool.com')) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('externalReturnTo', returnTo);
        }
        // Return a local URL that will trigger the external redirect logic
        return `/api/auth/external-redirect?returnTo=${encodeURIComponent(
          returnTo
        )}`;
      }
      return returnTo;
    }

    return null;
  };

  const handleMagicLink = () => {
    if (!email) return;

    const returnToUrl = getReturnTo();
    // Redirect directly to the magic link endpoint
    const magicLinkUrl = `/api/magic-link?email=${encodeURIComponent(email)}${
      returnToUrl ? `&returnTo=${encodeURIComponent(returnToUrl)}` : ''
    }`;
    window.location.href = magicLinkUrl;
  };

  const getAuthUrl = (baseUrl) => {
    const returnToUrl = getReturnTo();
    return `${baseUrl}${
      returnToUrl ? `?returnTo=${encodeURIComponent(returnToUrl)}` : ''
    }`;
  };

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center px-4 py-8 z-50'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-80 z-10'></div>
      <div className='max-w-md w-full space-y-6 bg-white py-6 md:!py-9 px-4 md:!px-8 rounded-xl shadow relative z-20'>
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
        <div className='flex flex-col items-center gap-2 mb-4'>
          <div className='text-center text-slate-600 text-lg font-semibold'>
            We&apos;ve Updated Our Login Process
          </div>
          <div className='text-center text-gray-500 md:!text-lg md:!leading-snug'>
            For security, some users may need to reset their password the first
            time. Or, skip the reset and sign in with a one-time email code —
            whichever you prefer.
          </div>
        </div>

        <div className='w-full h-[1px] bg-gray-200'></div>
        {/* Social logins */}
        <div className='grid grid-cols-4 gap-3'>
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

        <div className='text-center text-gray-400'>or</div>

        {/* Email input and login options */}
        <div className='space-y-4'>
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
                      getReturnTo()
                        ? `&returnTo=${encodeURIComponent(getReturnTo())}`
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
        </div>
      </div>
    </div>
  );
}
