const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    courseInterested: {
        type: String,
        default: 'General' // Could be 'Python', 'AI', etc.
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Resolved'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
