import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';

export async function PUT(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const data = await request.json();
        const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCourse) return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        return NextResponse.json(updatedCourse);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        return NextResponse.json({ message: 'Course removed' });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
