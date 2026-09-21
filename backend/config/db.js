const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We will define MONGO_URI in our .env file.
        // It connects our application to the MongoDB database.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure if DB connection fails
    }
};

module.exports = connectDB;
