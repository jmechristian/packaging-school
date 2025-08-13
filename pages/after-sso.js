import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AfterSSO() {
  const router = useRouter();

  useEffect(() => {
    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string') {
      // Simple redirect with a small delay to allow user setup to start
      setTimeout(() => {
        router.replace(returnTo);
      }, 100);
    }
  }, [router]);

  return <div>Finishing login...</div>;
}
