const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, // URL to the image (realistic professional imagery)
        default: '/images/default-course.jpg'
    },
    syllabus: [{
        type: String
    }],
    price: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
