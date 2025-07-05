import { useEffect } from 'react';

export function useThinkificSSO(user) {
  useEffect(() => {
    if (!user) return;

    let iframe = null;

    const runSSO = async () => {
      try {
        const res = await fetch('/api/generateJWT', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            first_name: user.given_name,
            last_name: user.family_name,
          }),
        });

        const data = await res.json();
        if (data.url) {
          iframe = document.createElement('iframe');
          iframe.src = data.url;
          iframe.style.display = 'none';
          iframe.width = '0';
          iframe.height = '0';
          iframe.onload = () => {
            console.log('✅ Thinkific SSO iframe loaded successfully');
          };
          document.body.appendChild(iframe);
        }
      } catch (error) {
        console.error('❌ Thinkific SSO failed:', error);
      }
    };

    runSSO();

    return () => {
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, [user]);
}
