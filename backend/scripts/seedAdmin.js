import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne();
    if (!adminExists) {
      await Admin.create({
        name: 'Star Ranch Admin',
        email: process.env.ADMIN_SEED_EMAIL || 'admin@starranchanimalsanctuary.com',
        password: process.env.ADMIN_SEED_PASSWORD || 'admin123',
      });
      console.log('Admin user created');
    }

    const settingsExists = await SiteSettings.findOne();
    if (!settingsExists) {
      await SiteSettings.create({});
      console.log('Site settings initialized');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Safe Shelter',
          description:
            'Provide animals with a secure, comfortable, and caring environment where they can heal and feel safe.',
          icon: 'shelter',
          order: 1,
        },
        {
          title: 'Food & Daily Care',
          description:
            'Provide food, fresh water, monitoring, and everyday care to ensure every animal thrives.',
          icon: 'food',
          order: 2,
        },
        {
          title: 'Medical Care',
          description:
            'Help animals access appropriate treatment, medications, and ongoing support for their health needs.',
          icon: 'medical',
          order: 3,
        },
      ]);
      console.log('Default services created');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
