const express = require('express');
const router = express.Router();
const { submitEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiryController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route to submit an enquiry, Admin route to view all
router.route('/')
    .post(submitEnquiry)
    .get(protectAdmin, getEnquiries);

// Admin route to delete an enquiry
router.route('/:id')
    .delete(protectAdmin, deleteEnquiry);

module.exports = router;
