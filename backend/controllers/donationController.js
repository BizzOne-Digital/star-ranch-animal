import Donation from '../models/Donation.js';
import sendEmail from '../utils/sendEmail.js';

export const createDonation = async (req, res) => {
  try {
    const { donorName, email, amount, message } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    const donation = await Donation.create({
      donorName: donorName || 'Anonymous',
      email,
      amount: Number(amount),
      message: message || '',
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      data: donation,
      message: 'Donation recorded. Payment integration can be connected to complete the transaction.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (req.body.status === 'Completed' && donation.email) {
      await sendEmail({
        to: donation.email,
        subject: 'Thank You for Your Donation — Star Ranch Animal Sanctuary',
        html: `
          <h2>Thank You, ${donation.donorName}!</h2>
          <p>Your generous donation of $${donation.amount} helps us continue rescuing and caring for animals in need.</p>
          <p>With gratitude,<br/>Joyce & Keith Robinson<br/>Star Ranch Animal Sanctuary</p>
        `,
      });
    }

    res.json({ success: true, data: donation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    res.json({ success: true, message: 'Donation deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
