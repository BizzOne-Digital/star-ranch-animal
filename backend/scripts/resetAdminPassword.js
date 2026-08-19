import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const resetPassword = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_SEED_EMAIL || 'admin@starranchanimalsanctuary.com';
    const password = process.env.ADMIN_SEED_PASSWORD || 'admin123';

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      admin = await Admin.create({
        name: 'Star Ranch Admin',
        email,
        password,
      });
      console.log('Admin user created');
    } else {
      admin.password = password;
      await admin.save();
      console.log('Admin password updated');
    }

    console.log(`Email: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Reset error:', error);
    process.exit(1);
  }
};

resetPassword();
