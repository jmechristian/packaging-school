import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AfterSSO() {
  const router = useRouter();
  useEffect(() => {
    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string') {
      router.replace(returnTo);
    }
  }, [router]);
  return <div>Finishing login...</div>;
}
