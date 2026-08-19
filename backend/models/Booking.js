import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    animalType: { type: String, required: true, trim: true },
    animalName: { type: String, trim: true },
    assistanceType: { type: String, required: true, trim: true },
    emergencyStatus: {
      type: String,
      enum: ['Not Urgent', 'Urgent', 'Emergency'],
      default: 'Not Urgent',
    },
    description: { type: String, required: true },
    preferredContact: {
      type: String,
      enum: ['Email', 'Phone', 'Either'],
      default: 'Either',
    },
    photos: [
      {
        imageUrl: String,
        publicId: String,
      },
    ],
    status: {
      type: String,
      enum: ['New', 'Reviewing', 'Contacted', 'Accepted', 'Completed', 'Rejected'],
      default: 'New',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
