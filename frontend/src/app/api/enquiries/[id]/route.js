import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PUT(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const data = await request.json();
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, data, { new: true });
        if (!updatedEnquiry) return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        return NextResponse.json(updatedEnquiry);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        if (!deletedEnquiry) return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        return NextResponse.json({ message: 'Enquiry removed' });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
