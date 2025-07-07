import React from 'react';
import { useRouter } from 'next/router';
import { useThinkificLink } from '../hooks/useThinkificLink';
import { useSelector } from 'react-redux';

const CTAButtonTrial = ({ link }) => {
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
      className='w-full border border-clemson hover:border-clemson-dark text-center rounded-md'
      onClick={clickHandler}
    >
      <div className='w-full py-4 uppercase font-bold text-xl text-clemson hover:text-clemson-dark'>
        Free Trial
      </div>
    </button>
  );
};

export default CTAButtonTrial;
