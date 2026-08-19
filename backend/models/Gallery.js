import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    caption: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    category: {
      type: String,
      enum: ['dogs', 'horses', 'cats', 'farm', 'wildlife', 'sanctuary', 'founders', 'landscape', 'general'],
      default: 'general',
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
