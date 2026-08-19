import Service from '../models/Service.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

export const getServices = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, icon, order, isActive } = req.body;
    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'star-ranch/services');
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const service = await Service.create({
      title,
      description,
      icon: icon || 'shelter',
      imageUrl,
      publicId,
      order: order ? Number(order) : 0,
      isActive: isActive !== 'false',
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (req.file) {
      if (service.publicId) await deleteFromCloudinary(service.publicId);
      const result = await uploadToCloudinary(req.file.buffer, 'star-ranch/services');
      service.imageUrl = result.secure_url;
      service.publicId = result.public_id;
    }

    const { title, description, icon, order, isActive } = req.body;
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (order !== undefined) service.order = Number(order);
    if (isActive !== undefined) service.isActive = isActive === 'true' || isActive === true;

    await service.save();
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (service.publicId) await deleteFromCloudinary(service.publicId);
    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
