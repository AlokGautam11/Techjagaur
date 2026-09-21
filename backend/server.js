const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors()); // Allow cross-origin requests from our Next.js frontend
app.use(express.json()); // Parse incoming JSON payloads

// Basic API route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Techjaguar Academy API' });
});

// Import and Use Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));


// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
