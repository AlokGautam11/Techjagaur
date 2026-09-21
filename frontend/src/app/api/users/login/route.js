import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

export async function POST(request) {
    await connectDB();
    try {
        const { email, password } = await request.json();
        
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return NextResponse.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
