import React, { useState, useEffect } from 'react';

import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
  GiAstronautHelmet,
  GiDeadlyStrike,
} from 'react-icons/gi';

const Sandbox = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch('/api/get-auth0-user-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setUser(data);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Sandbox</h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter email'
      />
      <button onClick={handleSubmit}>Submit</button>
      {user && <div>{JSON.stringify(user)}</div>}
    </div>
  );
};

export default Sandbox;
