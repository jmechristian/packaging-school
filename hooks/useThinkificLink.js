import { useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSelector } from 'react-redux';
import { handleThinkificLink } from '../helpers/thinkificLink';

export const useThinkificLink = () => {
  const { awsUser } = useSelector((state) => state.auth);
  const navigateToThinkific = useCallback(
    async (url, returnTo) => {
      await handleThinkificLink(url, awsUser, returnTo);
    },
    [awsUser]
  );

  return { navigateToThinkific };
};
