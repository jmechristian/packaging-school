export const runThinkificSSO = async (user, returnTo) => {
  // get current url only in browser environment

  if (!user || !user.email || !user.name) {
    console.error('❌ SSO failed: Missing user data');
    return;
  }

  try {
    const res = await fetch('/api/generateJWT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        first_name: user.name.split(' ')[0],
        last_name: user.name.split(' ')[1],
        return_to: returnTo, // This will now be the final destination directly
      }),
    });

    const data = await res.json();
    if (data.url) {
      // Only run in browser environment
      if (typeof window !== 'undefined') {
        // Simple redirect to Thinkific with direct return_to
        window.location.href = data.url;
      }
    }
  } catch (error) {
    console.error('❌ Thinkific SSO failed:', error);
  }
};
