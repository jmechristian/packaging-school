import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function CorporateLogin() {
  const router = useRouter();
  const { loginWithRedirect } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleDirectLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithRedirect({
        returnTo: router.query.returnTo || '/',
        authorizationParams: {
          // Skip SSO for corporate users
          prompt: 'login',
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-dark dark:bg-black fade-in'>
      <img src='/logos/logo-sq-wh.svg' alt='Logo' className='w-40 mb-6' />
      <div className='flex flex-col items-center gap-6 max-w-md text-center'>
        <div className='text-blue-400 text-6xl mb-4'>🏢</div>
        <h1 className='text-xl font-semibold text-white mb-2'>
          Corporate Network Detected
        </h1>
        <p className='text-slate-300 text-sm leading-relaxed mb-6'>
          We detected that you &apos;re accessing from a corporate network that
          may block our SSO system. You can try the direct login option below,
          or contact your IT department to whitelist our domain.
        </p>
        <div className='flex flex-col gap-3 w-full'>
          <button
            onClick={handleDirectLogin}
            disabled={isLoading}
            className='bg-clemson hover:bg-clemson/90 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            {isLoading ? 'Logging in...' : 'Try Direct Login'}
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className='bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            Return to Homepage
          </button>
        </div>
        <div className='mt-6 p-4 bg-slate-800 rounded-lg'>
          <h3 className='text-white font-medium mb-2'>
            For IT Administrators:
          </h3>
          <p className='text-slate-400 text-xs'>
            To whitelist our SSO system, please allow connections to: <br />
            <code className='bg-slate-900 px-2 py-1 rounded'>
              *.packagingschool.com
            </code>{' '}
            and <br />
            <code className='bg-slate-900 px-2 py-1 rounded'>*.auth0.com</code>
          </p>
        </div>
      </div>
    </div>
  );
}
