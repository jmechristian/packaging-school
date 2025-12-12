export const runThinkificSSO = async (user, returnTo) => {
  // get current url only in browser environment

  if (!user || !user.email || !user.name) {
    console.error('❌ SSO failed: Missing user data');
    return;
  }

  const nameParts = user.name.trim().split(' ').filter(Boolean);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  if (!firstName || !lastName) {
    console.error('❌ SSO failed: Missing first/last name');
    return;
  }

  try {
    const res = await fetch('/api/generateJWT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        first_name: firstName,
        last_name: lastName,
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
