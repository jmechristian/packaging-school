const fetchWithRetry = async (
  url,
  headers,
  maxRetries = 3,
  initialDelay = 1000
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, { headers });

      // Check if we hit rate limit (usually 429 status code)
      if (response.status === 429) {
        if (i === maxRetries - 1) {
          throw new Error('Rate limit exceeded after all retries');
        }

        // Get retry-after header or use exponential backoff
        const retryAfter = response.headers.get('retry-after');
        const delay = retryAfter
          ? parseInt(retryAfter) * 1000
          : initialDelay * Math.pow(2, i);

        console.log(`Rate limited. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // If response isn't ok but not rate limited, throw error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }

      // If it's not a rate limit error, still retry but log it
      const delay = initialDelay * Math.pow(2, i);
      console.log(`Error occurred. Retrying after ${delay}ms...`, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const data = await fetchWithRetry(
      `https://api.thinkific.com/api/public/v1/courses/${id}`,
      {
        'X-Auth-API-Key': process.env.NEXT_PUBLIC_API_KEY,
        'X-Auth-Subdomain': process.env.NEXT_THINKIFIC_SUBDOMAIN,
      }
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(error.status || 500).json({
      message: error.message || 'Internal server error',
      isRateLimit: error.message.includes('Rate limit'),
    });
  }
}
