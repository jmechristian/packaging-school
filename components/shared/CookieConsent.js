import React from 'react';
import { hasCookie, setCookie } from 'cookies-next';

const CookieConsent = (props) => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie('localConsent', 'true', {});
  };

  const declineCookie = () => {
    setShowConsent(true);
    setCookie('localConsent', 'false', {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='fixed z-[210]'>
      <div className='fixed bottom-0 left-0 right-0 flex md:!flex-row flex-col md:gap-6 gap-2 items-center justify-between px-4 md:px-12 md:py-4 py-2 bg-base-dark'>
        <div className='text-white font-medium text-xs md:!text-base hidden md:!block'>
          We use cookies to improve your experience and analyze site traffic. We
          won&apos;t use your information for marketing without your request.
          For more information, see our{' '}
          <a href='https://library.packagingschool.com/articles/privacy-policy'>
            Privacy Policy
          </a>
          .
        </div>
        <div className='block md:hidden'>
          <div className='text-white font-medium text-xs leading-tight'>
            We use cookies to improve your experience and analyze site traffic.
            See our{' '}
            <a href='https://library.packagingschool.com/articles/privacy-policy'>
              Privacy Policy
            </a>
            .
          </div>
        </div>
        <div className='w-fit flex gap-5 items-center'>
          <button
            className='bg-brand-yellow py-0.5 md:py-3 px-4 md:px-8 rounded text-neutral-900 font-bold text-xs md:text-base'
            onClick={() => acceptCookie()}
          >
            Accept
          </button>
          <div
            className='text-white/80 cursor-pointer text-xs md:text-base'
            onClick={() => declineCookie()}
          >
            Decline
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
