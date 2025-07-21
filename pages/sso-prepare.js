import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SsoPrepare() {
  const router = useRouter();
  useEffect(() => {
    const doSSO = async () => {
      const res = await fetch('/api/auth/me');
      const text = await res.text();
      console.log('Session API response:', text);
      let session;
      try {
        session = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse session JSON:', e);
        return;
      }
      if (session?.ssoUser) {
        // Call your SSO endpoint to get the SSO URL
        const ssoRes = await fetch('/api/generateJWT', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.ssoUser.email,
            first_name: session.ssoUser.first_name,
            last_name: session.ssoUser.last_name,
            returnTo: `${
              window.location.origin
            }/after-sso?returnTo=${encodeURIComponent(
              session.ssoUser.returnTo
            )}`,
            baseUrl: session.ssoUser.baseUrl,
          }),
        });
        const ssoData = await ssoRes.json();
        if (ssoData.url) {
          window.location.href = ssoData.url;
        }
      }
    };
    doSSO();
  }, [router]);
  return <div>Preparing SSO login...</div>;
}
