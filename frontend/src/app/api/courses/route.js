import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';

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
        const data = await request.json();
        const course = new Course(data);
        const createdCourse = await course.save();
        return NextResponse.json(createdCourse, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
