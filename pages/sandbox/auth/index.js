import React from 'react';

import { useState } from 'react';

const SSOButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSSO = async () => {
    setLoading(true);

    const response = await fetch('/api/generateJWT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'jamie@packagingschool.com',
        first_name: 'Jamie',
        last_name: 'Christian',
        return_to: 'localhost:3000', // Optional
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      // Redirect the user to the Thinkific SSO URL
      window.location.href = data.url;
    } else {
      console.error(data.error);
    }
  };

  return (
    <button
      onClick={handleSSO}
      disabled={loading}
      className='bg-blue-500 text-white px-4 py-2 rounded'
    >
      {loading ? 'Redirecting...' : 'Login with Thinkific'}
    </button>
  );
};

const Page = () => {
  return (
    <div className='w-full flex flex-col gap-16 lg:gap-36 relative pb-16 max-w-sm mx-auto my-16'>
      <SSOButton />
    </div>
  );
};

export default Page;
