import React from 'react';
import { useRouter } from 'next/router';
import { useThinkificLink } from '../hooks/useThinkificLink';
import { useSelector } from 'react-redux';

const CTAButtonTrial = ({ link, onClick, isLoading }) => {
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
      className='w-full border border-clemson hover:border-clemson-dark text-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      onClick={onClick}
      disabled={isLoading}
    >
      <div className='w-full py-4 uppercase font-bold text-xl text-clemson hover:text-clemson-dark'>
        {isLoading ? 'Loading...' : 'Free Trial'}
      </div>
    </button>
  );
};

export default CTAButtonTrial;
