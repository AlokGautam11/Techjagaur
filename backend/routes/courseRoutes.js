const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/cloudinary');

router.route('/')
    .get(getCourses)
    .post(protectAdmin, upload.single('image'), createCourse);

router.route('/:id')
    .get(getCourseById)
    .put(protectAdmin, upload.single('image'), updateCourse)
    .delete(protectAdmin, deleteCourse);

module.exports = router;
