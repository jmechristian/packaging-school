import { runThinkificSSO } from './sso';

export const handleThinkificLink = async (url, awsUser, returnTo) => {
  // If user is not authenticated, redirect to Thinkific directly
  if (!awsUser || !awsUser.email) {
    window.location.href = url;
    return;
  }

  // Check if user has completed onboarding (you might want to adjust this condition)
  // For now, we'll run SSO for all authenticated users
  try {
    await runThinkificSSO(awsUser, returnTo);
  } catch (error) {
    console.error('SSO failed, redirecting directly:', error);
    window.location.href = url;
  }
};
