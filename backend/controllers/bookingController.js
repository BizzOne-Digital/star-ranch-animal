import Booking from '../models/Booking.js';
import sendEmail from '../utils/sendEmail.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

export const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      animalType,
      animalName,
      assistanceType,
      emergencyStatus,
      description,
      preferredContact,
    } = req.body;

    const photos = [];
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, 'star-ranch/bookings');
        photos.push({ imageUrl: result.secure_url, publicId: result.public_id });
      }
    }

    const booking = await Booking.create({
      fullName,
      email,
      phone,
      animalType,
      animalName,
      assistanceType,
      emergencyStatus,
      description,
      preferredContact,
      photos,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `[Star Ranch] New Help Request from ${fullName}`,
        html: `
          <h2>New Animal Help Request</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Animal Type:</strong> ${animalType}</p>
          <p><strong>Animal Name:</strong> ${animalName || 'N/A'}</p>
          <p><strong>Assistance:</strong> ${assistanceType}</p>
          <p><strong>Emergency:</strong> ${emergencyStatus}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
        `,
      });
    }

    await sendEmail({
      to: email,
      subject: 'We Received Your Request — Star Ranch Animal Sanctuary',
      html: `
        <h2>Thank you, ${fullName}</h2>
        <p>We have received your help request and will review it as soon as possible.</p>
        <p>If this is an emergency, please call us at (602) 318-0260.</p>
        <p>With compassion,<br/>Star Ranch Animal Sanctuary</p>
      `,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const newCount = await Booking.countDocuments({ status: 'New' });
    res.json({ success: true, data: { total, new: newCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
