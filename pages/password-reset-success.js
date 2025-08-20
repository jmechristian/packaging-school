import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PasswordResetSuccess() {
  const router = useRouter();
  const { returnTo } = router.query;

  useEffect(() => {
    // Auto-redirect to login page after 5 seconds (increased from 3)
    const timer = setTimeout(() => {
      const loginUrl = `/login${
        returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''
      }`;
      router.push(loginUrl);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, returnTo]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center'>
        <div className='mb-6'>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
            <svg
              className='h-6 w-6 text-green-600'
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

        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Password Reset Successful!
        </h2>

        <p className='text-gray-600 mb-6'>
          Your password has been successfully reset. You can now log in with
          your new password. You will be redirected to the login page in a few
          seconds.
        </p>

        <div className='space-y-3'>
          <Link
            href={`/login${
              returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''
            }`}
            className='block w-full bg-clemson text-white py-3 px-4 rounded-md hover:bg-clemson-dark transition-colors font-medium'
          >
            Go to Login Now
          </Link>

          <Link
            href='/'
            className='block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium'
          >
            Return to Home
          </Link>
        </div>

        <div className='mt-6 text-sm text-gray-500'>
          <p>
            If you&apos;re not automatically redirected, please click &quot;Go
            to Login Now&quot; above.
          </p>
        </div>
      </div>
    </div>
  );
}
