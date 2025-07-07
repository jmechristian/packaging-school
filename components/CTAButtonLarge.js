import { useRouter } from 'next/router';
import React from 'react';
import { useThinkificLink } from '../hooks/useThinkificLink';
import { useSelector } from 'react-redux';

const CTAButtonLarge = ({ link }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const router = useRouter();

  const clickHandler = () => {
    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(link, link);
    } else {
      router.push(link);
    }
  };

  return (
    <button
      className='w-full bg-clemson hover:bg-clemson-dark text-center rounded-md'
      onClick={clickHandler}
    >
      <div className='w-full py-4 uppercase font-bold text-xl text-white'>
        Enroll Now!
      </div>
    </button>
  );
};

export default CTAButtonLarge;
