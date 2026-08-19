import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    hero: {
      heading: { type: String, default: 'A Safe Home for Animals Who Need Us Most' },
      subheading: {
        type: String,
        default: 'Providing shelter, food, medical care, and compassion to animals in need since 2012.',
      },
      primaryCta: { type: String, default: 'Get Help for an Animal' },
      secondaryCta: { type: String, default: 'Support Our Mission' },
      imageUrl: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    about: {
      title: { type: String, default: 'Founded with Heart. Built on Compassion.' },
      highlight: { type: String, default: 'Joyce and Keith Robinson' },
      description: {
        type: String,
        default:
          'Joyce and Keith founded Star Ranch Animal Sanctuary in 2012 after spending more than 50 years rescuing, saving, caring for, and advocating for animals across Arizona. What began as a lifelong calling became a permanent ranch home where horses, dogs, cats, farm animals, and wildlife can heal and receive compassionate care. They have also rescued wildlife and successfully released animals such as vultures back into the wild.',
      },
      imageUrl: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    banner: {
      heading: { type: String, default: 'Every Animal Deserves a Second Chance.' },
      subheading: {
        type: String,
        default: 'With your support, we can continue to rescue, heal, protect, and give hope.',
      },
      ctaText: { type: String, default: 'Support Our Mission' },
      imageUrl: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    contact: {
      founders: { type: String, default: 'Joyce & Keith Robinson' },
      address: { type: String, default: '137 CR 8202 N, HC 30 Box 6D' },
      city: { type: String, default: 'Concho, Arizona 85924' },
      phone: { type: String, default: '(602) 318-0260' },
      email: { type: String, default: 'keithsr@starranchanimalsanctuary.com' },
    },
    stats: {
      yearsRescuing: { type: String, default: '50+' },
      established: { type: String, default: '2012' },
      services: { type: String, default: 'Shelter • Food • Medical Care' },
    },
    donation: {
      heading: { type: String, default: 'Help Us Keep Saving Lives' },
      subheading: {
        type: String,
        default:
          'Your support helps provide food, shelter, medical care, and compassion for animals who need a safe place.',
      },
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
