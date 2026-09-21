const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Delete old test admins
        await User.deleteMany({ email: { $in: ['admin@techjaguar.com', 'admin@jaguar.in'] } });

        const adminExists = await User.findOne({ email: 'admin@techjaguar.in' });
        
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            
            await User.create({
                name: 'Super Admin',
                email: 'admin@techjaguar.in',
                password: hashedPassword,
                role: 'Admin'
            });
            console.log('New admin seeded successfully: admin@techjaguar.in');
        } else {
            console.log('Admin user already exists');
        }
        process.exit(0);
    } catch (error) {
        console.error('Failed to seed admin:', error);
        process.exit(1);
    }
};

seedAdmin();
