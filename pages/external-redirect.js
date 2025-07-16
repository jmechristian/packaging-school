import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ExternalRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check for external URL in sessionStorage
    const externalUrl = sessionStorage.getItem('externalReturnTo');

    if (externalUrl) {
      // Clear the stored URL
      sessionStorage.removeItem('externalReturnTo');

      // Redirect to the external URL
      window.location.href = externalUrl;
    } else {
      // Fallback to profile page
      router.push('/profile?tab=courses');
    }
  }, [router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='w-12 h-12 border-4 border-clemson border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-gray-600'>Redirecting...</p>
      </div>
    </div>
  );
}
