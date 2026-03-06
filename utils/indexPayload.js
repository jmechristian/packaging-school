const MEDIA_BASE = (
  process.env.NEXT_PUBLIC_MEDIA_PUBLIC_BASE_URL ||
  'https://packmedia54032-staging.s3.amazonaws.com/public'
).replace(/\/+$/, '');

export async function resolveIndexPayload(index) {
  if (!index) return null;

  // New large payload mode where JSON is stored in S3.
  if (index.contentStorage === 'S3' && index.contentKey) {
    const url = `${MEDIA_BASE}/${index.contentKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load index payload: ${url}`);
    }

    return await res.json();
  }

  // Legacy/small payload mode where JSON is inline in content.
  if (index.content) {
    return JSON.parse(index.content);
  }

  return null;
}
