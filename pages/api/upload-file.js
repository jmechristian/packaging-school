import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for required environment variables
  if (!process.env.AWS_S3_BUCKET_NAME) {
    console.error('AWS_S3_BUCKET_NAME environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!process.env.AWSACCESSKEYID || !process.env.AWSSECRETACCESSKEY) {
    console.error('AWS credentials are not properly configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = path.extname(file.originalFilename).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return res.status(400).json({
        error:
          'Invalid file type. Only PDF, JPG, JPEG, PNG, and GIF files are allowed.',
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `transcripts/${timestamp}-${randomString}${fileExtension}`;

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath);

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.mimetype,
    };

    console.log('Uploading to S3 with params:', {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: file.mimetype,
      fileSize: fileBuffer.length,
    });

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    // Return the file URL
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${
      process.env.AWS_REGION || 'us-east-1'
    }.amazonaws.com/${fileName}`;

    res.status(200).json({
      fileUrl,
      fileName: file.originalFilename,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Failed to upload file. Please try again.',
    });
  }
}
