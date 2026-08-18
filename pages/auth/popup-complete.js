import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PopupComplete() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (typeof window !== 'undefined' && window.opener) {
      window.opener.postMessage(
        { type: 'ND_AUTH_COMPLETE' },
        window.location.origin,
      );
      window.close();
      return;
    }

    router.replace('/network-distribution');
  }, [router]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/80'>
      <div className='bg-white rounded-xl px-8 py-10 max-w-sm text-center'>
        <div className='w-12 h-12 border-4 border-clemson border-t-transparent rounded-full animate-spin mx-auto mb-4' />
        <p className='text-gray-700'>Signing you in...</p>
      </div>
    </div>
  );
}
