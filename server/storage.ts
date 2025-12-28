import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './_core/env';
import { randomUUID } from 'crypto';

const s3Client = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(
  key: string,
  body: Buffer | string,
  contentType: string
): Promise<{ key: string; url: string }> {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Generate public URL (or use CloudFront CDN URL)
  const url = `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${key}`;

  return { key, url };
}

export async function getSignedUrlFromS3(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export function generateFileKey(prefix: string, filename: string): string {
  const uuid = randomUUID();
  const extension = filename.split('.').pop();
  return `${prefix}/${uuid}.${extension}`;
}

