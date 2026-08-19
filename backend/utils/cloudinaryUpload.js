import cloudinary, { configureCloudinary } from '../config/cloudinary.js';

export const uploadToCloudinary = async (fileBuffer, folder = 'star-ranch', mimetype = 'image/jpeg') => {
  configureCloudinary();

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Add CLOUDINARY credentials to backend .env');
  }

  const dataUri = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'auto',
  });

  return result;
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  configureCloudinary();
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
  }
};
