import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AfterSSO() {
  const router = useRouter();
  const { userSetupComplete, awsUser, thinkificUser } = useSelector(
    (state) => state.auth
  );
  const { user, isLoading: userIsLoading } = useUser();

  useEffect(() => {
    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string') {
      // Wait for user setup to complete before redirecting
      if (!userIsLoading && user && userSetupComplete && awsUser) {
        router.replace(returnTo);
      }
    }
  }, [router, user, userIsLoading, userSetupComplete, awsUser, thinkificUser]);

  return <div>Finishing login...</div>;
}
