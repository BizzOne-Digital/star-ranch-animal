import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, trim: true, default: 'Anonymous' },
    email: { type: String, trim: true, lowercase: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'USD' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    paymentMethod: { type: String, default: 'manual' },
    transactionId: { type: String, default: '' },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
