import { useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { handleThinkificLink } from '../helpers/thinkificLink';

export const useThinkificLink = () => {
  const { user } = useUser();

  const navigateToThinkific = useCallback(
    async (url, returnTo) => {
      await handleThinkificLink(url, user, returnTo);
    },
    [user]
  );

  return { navigateToThinkific };
};
