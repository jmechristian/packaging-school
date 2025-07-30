import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AfterSSO() {
  const router = useRouter();
  useEffect(() => {
    // Clean up SSO session storage to prevent future redirect issues
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ssoRedirectCount');
      sessionStorage.removeItem('ssoTimestamp');
    }

    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string') {
      router.replace(returnTo);
    }
  }, [router]);
  return <div>Finishing login...</div>;
}
