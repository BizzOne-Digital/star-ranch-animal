import Gallery from '../models/Gallery.js';
import mongoose from 'mongoose';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

export const getGallery = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database not ready. Please try again.' });
    }

    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, data: images });
  } catch (error) {
    console.error('Gallery GET error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryMeta = async (req, res) => {
  try {
    const { caption, category, order, isActive } = req.body;
    const updates = {};

    if (caption !== undefined) updates.caption = caption;
    if (category !== undefined) updates.category = category;
    if (order !== undefined) updates.order = Number(order);
    if (isActive !== undefined) {
      updates.isActive = isActive === true || isActive === 'true';
    }

    const item = await Gallery.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Gallery PATCH error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'star-ranch/gallery', req.file.mimetype);
    const { caption, category, order, isActive } = req.body;

    const item = await Gallery.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      caption: caption || '',
      category: category || 'general',
      order: order ? Number(order) : 0,
      isActive: isActive !== 'false',
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error('Gallery POST error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    if (req.file) {
      await deleteFromCloudinary(item.publicId);
      const result = await uploadToCloudinary(req.file.buffer, 'star-ranch/gallery', req.file.mimetype);
      item.imageUrl = result.secure_url;
      item.publicId = result.public_id;
    }

    const { caption, category, order, isActive } = req.body;
    if (caption !== undefined) item.caption = caption;
    if (category !== undefined) item.category = category;
    if (order !== undefined) item.order = Number(order);
    if (isActive !== undefined) item.isActive = isActive === 'true' || isActive === true;

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Gallery PUT error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    await deleteFromCloudinary(item.publicId);
    await item.deleteOne();
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderGallery = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Items array required' });
    }

    const updates = items.map(({ id, order }) =>
      Gallery.findByIdAndUpdate(id, { order }, { new: true })
    );
    await Promise.all(updates);
    const images = await Gallery.find().sort({ order: 1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
