import SiteSettings from '../models/SiteSettings.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

const getOrCreateSettings = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
};

export const getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await getOrCreateSettings();
    const { section, data } = req.body;

    if (section && data) {
      settings[section] = { ...settings[section]?.toObject?.() || settings[section], ...data };
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadSettingsImage = async (req, res) => {
  try {
    const { section, field } = req.body;
    if (!req.file || !section || !field) {
      return res.status(400).json({ success: false, message: 'Section, field, and image required' });
    }

    const settings = await getOrCreateSettings();
    const oldPublicId = settings[section]?.[field === 'image' ? 'publicId' : `${field}PublicId`]
      || settings[section]?.publicId;

    if (oldPublicId) await deleteFromCloudinary(oldPublicId);

    const result = await uploadToCloudinary(req.file.buffer, `star-ranch/${section}`);
    const imageField = field === 'image' ? 'imageUrl' : `${field}Url`;
    const publicIdField = field === 'image' ? 'publicId' : `${field}PublicId`;

    if (!settings[section]) settings[section] = {};
    settings[section][imageField.includes('Url') ? imageField : 'imageUrl'] = result.secure_url;
    settings[section][publicIdField.includes('publicId') ? publicIdField : 'publicId'] = result.public_id;
    settings[section].imageUrl = result.secure_url;
    settings[section].publicId = result.public_id;

    settings.markModified(section);
    await settings.save();

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const Booking = (await import('../models/Booking.js')).default;
    const Contact = (await import('../models/Contact.js')).default;
    const Gallery = (await import('../models/Gallery.js')).default;
    const Service = (await import('../models/Service.js')).default;
    const Donation = (await import('../models/Donation.js')).default;

    const [bookings, newBookings, messages, unreadMessages, gallery, services, donations] =
      await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'New' }),
        Contact.countDocuments(),
        Contact.countDocuments({ isRead: false }),
        Gallery.countDocuments(),
        Service.countDocuments({ isActive: true }),
        Donation.countDocuments(),
      ]);

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        bookings,
        newBookings,
        messages,
        unreadMessages,
        gallery,
        services,
        donations,
        recentBookings,
        recentContacts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
