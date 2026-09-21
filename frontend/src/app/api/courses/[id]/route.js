import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import cloudinary from '@/lib/cloudinary';

export async function PUT(request, { params }) {
    await connectDB();
    try {
        const { id } = await params;
        const formData = await request.formData();
        
        let updateData = {
            title: formData.get('title'),
            description: formData.get('description'),
            instructor: formData.get('instructor'),
            duration: formData.get('duration'),
            price: Number(formData.get('price')) || 0,
            offeredPrice: Number(formData.get('offeredPrice')) || 0,
        };

        const syllabusStr = formData.get('syllabus');
        if (syllabusStr) {
            try {
                updateData.syllabus = JSON.parse(syllabusStr);
            } catch (e) {
                updateData.syllabus = syllabusStr.split(',').map(s => s.trim());
            }
        }

        const file = formData.get('image');
        if (file && file.size > 0 && file.name) {
            // Upload new image if provided
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                folder: 'techjaguar_courses'
            });
            updateData.thumbnail = uploadResponse.secure_url;
        } else if (formData.get('thumbnail')) {
            updateData.thumbnail = formData.get('thumbnail');
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCourse) return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        return NextResponse.json(updatedCourse);
    } catch (error) {
        console.error('Update course error:', error);
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
