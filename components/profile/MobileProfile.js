import React from 'react';

const MobileProfile = ({ refreshUser, awsUser }) => {
  return (
    <div className='w-full h-full p-3'>
      <div className='w-full flex flex-col gap-5 p-3'>
        <div className='w-full flex flex-col gap-0.5'>
          <div className='font-medium uppercase font-oswald'>Welcome</div>
          <div className='h2-base'>{awsUser.name} </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProfile;
