import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import cloudinary from '@/lib/cloudinary';

export async function GET(request) {
    await connectDB();
    try {
        const courses = await Course.find();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    try {
        const formData = await request.formData();
        
        let thumbnailUrl = formData.get('thumbnail') || '/images/default-course.jpg';
        
        const file = formData.get('image');
        if (file && file.size > 0 && file.name) {
            // Convert file to base64 buffer for Cloudinary
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                folder: 'techjaguar_courses'
            });
            thumbnailUrl = uploadResponse.secure_url;
        }

        const syllabusStr = formData.get('syllabus');
        let syllabusArray = [];
        if (syllabusStr) {
            try {
                syllabusArray = JSON.parse(syllabusStr);
            } catch (e) {
                // Handle if it was comma separated directly instead of stringified json
                syllabusArray = syllabusStr.split(',').map(s => s.trim());
            }
        }

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            instructor: formData.get('instructor'),
            duration: formData.get('duration'),
            price: Number(formData.get('price')) || 0,
            offeredPrice: Number(formData.get('offeredPrice')) || 0,
            syllabus: syllabusArray,
            thumbnail: thumbnailUrl
        };

        const course = new Course(data);
        const createdCourse = await course.save();
        return NextResponse.json(createdCourse, { status: 201 });
    } catch (error) {
        console.error('Create course error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
