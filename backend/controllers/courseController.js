const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
    try {
        const { title, description, instructor, duration, price } = req.body;
        // Parse syllabus since it comes as a string in FormData
        const syllabus = req.body.syllabus ? JSON.parse(req.body.syllabus) : [];
        
        // Use Cloudinary URL if image was uploaded, otherwise fallback
        const thumbnail = req.file ? req.file.path : '/images/default-course.jpg';
        
        const course = new Course({
            title,
            description,
            instructor,
            duration,
            price,
            thumbnail,
            syllabus
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create course' });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            course.title = req.body.title || course.title;
            course.description = req.body.description || course.description;
            course.instructor = req.body.instructor || course.instructor;
            course.duration = req.body.duration || course.duration;
            course.price = req.body.price || course.price;
            if (req.body.syllabus) {
                course.syllabus = JSON.parse(req.body.syllabus);
            }
            
            // If new image is uploaded, update thumbnail
            if (req.file) {
                course.thumbnail = req.file.path; 
            }
            
            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update course' });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course' });
    }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
