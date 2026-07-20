import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
  },
});

const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.m4v', '.webm', '.avi'];
const DOCUMENT_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.AWS_S3_BUCKET_NAME) {
    console.error('AWS_S3_BUCKET_NAME environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!process.env.AWSACCESSKEYID || !process.env.AWSSECRETACCESSKEY) {
    console.error('AWS credentials are not properly configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { fileName, fileType, fileSize, fieldName } = req.body || {};

    if (!fileName || !fileType || typeof fileSize !== 'number') {
      return res.status(400).json({
        error: 'fileName, fileType, and fileSize are required',
      });
    }

    const isVideoUpload = fieldName === 'videoLink';
    const allowedTypes = isVideoUpload ? VIDEO_EXTENSIONS : DOCUMENT_EXTENSIONS;
    const fileExtension = path.extname(fileName).toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      return res.status(400).json({
        error: isVideoUpload
          ? 'Invalid file type. Only MP4, MOV, M4V, WEBM, and AVI files are allowed.'
          : 'Invalid file type. Only PDF, JPG, JPEG, PNG, and GIF files are allowed.',
      });
    }

    const maxAllowedSize = isVideoUpload
      ? 250 * 1024 * 1024
      : 10 * 1024 * 1024;

    if (fileSize > maxAllowedSize) {
      return res.status(400).json({
        error: isVideoUpload
          ? 'Video file too large. Maximum size is 250MB.'
          : 'File too large. Maximum size is 10MB.',
      });
    }

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const uploadFolder = isVideoUpload ? 'application-videos' : 'transcripts';
    const key = `${uploadFolder}/${timestamp}-${randomString}${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 15, // 15 minutes
    });

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${
      process.env.AWS_REGION || 'us-east-1'
    }.amazonaws.com/${key}`;

    return res.status(200).json({
      uploadUrl,
      fileUrl,
      key,
    });
  } catch (error) {
    console.error('Presign error:', error);
    return res.status(500).json({
      error: 'Failed to prepare upload. Please try again.',
    });
  }
}
