import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AfterSSO() {
  const router = useRouter();
  const { userSetupComplete, awsUser, thinkificUser } = useSelector(
    (state) => state.auth
  );
  const { user, isLoading: userIsLoading } = useUser();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    const { returnTo = '/' } = router.query;

    if (typeof returnTo === 'string' && !redirectAttempted) {
      // Wait for user setup to complete before redirecting
      if (
        !userIsLoading &&
        user &&
        userSetupComplete &&
        awsUser &&
        thinkificUser !== undefined
      ) {
        console.log('AfterSSO - All conditions met, redirecting');
        setRedirectAttempted(true);
        router.replace(returnTo);
      } else if (!userIsLoading && user) {
        console.log('AfterSSO - User loaded but setup incomplete, waiting...');
        // If user is loaded but setup isn't complete, wait a bit longer
        const timeout = setTimeout(() => {
          if (!redirectAttempted) {
            console.log('AfterSSO - Fallback timeout, redirecting');
            setRedirectAttempted(true);
            router.replace(returnTo);
          }
        }, 2000); // 2 second fallback

        return () => clearTimeout(timeout);
      }
    }
  }, [
    router,
    user,
    userIsLoading,
    userSetupComplete,
    awsUser,
    thinkificUser,
    redirectAttempted,
  ]);

  // Force redirect after 5 seconds as ultimate fallback
  useEffect(() => {
    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string') {
      const forceTimeout = setTimeout(() => {
        if (!redirectAttempted) {
          console.log('AfterSSO - Force redirect after 5 seconds');
          setRedirectAttempted(true);
          router.replace(returnTo);
        }
      }, 5000);

      return () => clearTimeout(forceTimeout);
    }
  }, [router, redirectAttempted]);

  return <div>Finishing login...</div>;
}
