import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Offer from '@/models/Offer';

export async function PUT(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const data = await request.json();
        const updatedOffer = await Offer.findByIdAndUpdate(id, data, { new: true });
        if (!updatedOffer) return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
        return NextResponse.json(updatedOffer);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const deletedOffer = await Offer.findByIdAndDelete(id);
        if (!deletedOffer) return NextResponse.json({ message: 'Offer not found' }, { status: 404 });
        return NextResponse.json({ message: 'Offer removed' });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
