import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function GET(request) {
    await connectDB();
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        return NextResponse.json(enquiries);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const data = await request.json();
        const enquiry = new Enquiry(data);
        const createdEnquiry = await enquiry.save();
        return NextResponse.json(createdEnquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
