const Enquiry = require('../models/Enquiry');

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
// @access  Public
const submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, course, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please provide required fields' });
        }

        const enquiry = new Enquiry({
            name,
            email,
            phone,
            course,
            message
        });

        await enquiry.save();
        res.status(201).json({ message: 'Enquiry submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not submit enquiry' });
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not fetch enquiries' });
    }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        
        if (enquiry) {
            await enquiry.deleteOne();
            res.json({ message: 'Enquiry removed' });
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not delete enquiry' });
    }
};

module.exports = { submitEnquiry, getEnquiries, deleteEnquiry };
