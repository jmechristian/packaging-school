import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AfterSSO() {
  const router = useRouter();
  const { userSetupComplete, awsUser } = useSelector((state) => state.auth);
  const { user, isLoading: userIsLoading } = useUser();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    const { returnTo = '/' } = router.query;
    if (typeof returnTo === 'string' && !redirectAttempted) {
      // Wait for user setup to complete before redirecting
      if (!userIsLoading && user && userSetupComplete && awsUser) {
        setRedirectAttempted(true);
        router.replace(returnTo);
      } else if (!userIsLoading && user) {
        // If user is loaded but setup isn't complete, wait a bit longer
        const timeout = setTimeout(() => {
          if (!redirectAttempted) {
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
    redirectAttempted,
  ]);

  return <div>Finishing login...</div>;
}
