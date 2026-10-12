import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const BUCKET = 'autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev';
const PREFIX = 'public/2026/';
const PUBLIC_BASE = `https://${BUCKET}.s3.us-east-1.amazonaws.com/`;

// "SC-6-1280.jpg" must sort before "SC-10-1280.jpg". S3 lists names as text,
// so the number has to be pulled out and compared as an integer.
const photoNumber = (key) => {
  const file = key.slice(PREFIX.length);
  const match = file.match(/-(\d+)-1280\.jpe?g$/i);
  return match ? Number(match[1]) : 0;
};

const publicUrl = (key) =>
  PUBLIC_BASE + key.split('/').map(encodeURIComponent).join('/');

export async function listAps2026Photos() {
  const client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWSACCESSKEYID,
      secretAccessKey: process.env.AWSSECRETACCESSKEY,
    },
  });

  const keys = [];
  let ContinuationToken;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: PREFIX,
        ContinuationToken,
      }),
    );

    for (const item of response.Contents || []) {
      if (!item.Key || !item.Size || !/\.jpe?g$/i.test(item.Key)) continue;
      keys.push(item.Key);
    }

    ContinuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (ContinuationToken);

  return keys
    .map((key) => ({ key, number: photoNumber(key) }))
    .sort((a, b) => a.number - b.number || a.key.localeCompare(b.key))
    .map(({ key }) => ({
      id: key,
      src: publicUrl(key),
    }));
}
