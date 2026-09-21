import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Offer from '@/models/Offer';

export async function GET(request) {
    await connectDB();
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        return NextResponse.json(offers);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const data = await request.json();
        const offer = new Offer(data);
        const createdOffer = await offer.save();
        return NextResponse.json(createdOffer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
