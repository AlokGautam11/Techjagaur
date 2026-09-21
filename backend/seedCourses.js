const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Course = require('./models/Course');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Check if courses already exist to prevent duplicate seeding
        const count = await Course.countDocuments();
        if (count > 0) {
            console.log('Courses already seeded. Exiting.');
            process.exit(0);
        }

        console.log('Uploading thumbnail to Cloudinary...');
        // Upload the local artifact image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(
            'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\4e24057b-cab1-48f1-839f-7bfc9851b0bb\\course_thumbnail_1789970633090.jpg',
            { folder: 'techjagaur_assets' }
        );
        
        const imageUrl = uploadResult.secure_url;
        console.log('Uploaded successfully! URL:', imageUrl);

        const courses = [
            {
                title: 'Full Stack Web Development',
                description: 'Master MERN stack development and build production-ready applications from scratch.',
                duration: '6 Months',
                instructor: 'Prateek Sir',
                price: 15000,
                thumbnail: imageUrl,
                syllabus: ['HTML, CSS, JavaScript', 'React.js & Next.js', 'Node.js & Express', 'MongoDB Integration', 'REST APIs', 'Authentication', 'Deployment to Vercel']
            },
            {
                title: 'Python & Data Science',
                description: 'Dive into data analysis, visualization, and machine learning with Python.',
                duration: '4 Months',
                instructor: 'Prateek Sir',
                price: 12000,
                thumbnail: imageUrl,
                syllabus: ['Core Python & OOPs', 'Pandas, NumPy, Matplotlib', 'Machine Learning Basics', 'Real-world Data Projects', 'Web Scraping', 'Data Visualization']
            },
            {
                title: 'Cybersecurity Basics',
                description: 'Learn the fundamentals of ethical hacking and secure network administration.',
                duration: '3 Months',
                instructor: 'Expert Faculty',
                price: 10000,
                thumbnail: imageUrl,
                syllabus: ['Networking Fundamentals', 'Linux Administration', 'Vulnerability Assessment', 'Web Security (OWASP)', 'Ethical Hacking Intro']
            },
            {
                title: 'C & C++ Programming',
                description: 'Build a strong foundation in programming logic and data structures.',
                duration: '2 Months',
                instructor: 'Prateek Sir',
                price: 5000,
                thumbnail: imageUrl,
                syllabus: ['Syntax & Logic Building', 'Pointers & Memory Management', 'Object-Oriented Programming', 'Data Structures Intro', 'File Handling']
            },
            {
                title: 'Java Masterclass',
                description: 'Become a proficient Java backend developer with Spring Boot and Hibernate.',
                duration: '4 Months',
                instructor: 'Expert Faculty',
                price: 11000,
                thumbnail: imageUrl,
                syllabus: ['Core Java', 'Advanced Java (J2EE)', 'Spring Boot', 'Hibernate & JPA', 'Multithreading', 'API Development']
            },
            {
                title: 'Robotics & IoT',
                description: 'Build smart devices and autonomous bots with Arduino and Raspberry Pi.',
                duration: '3 Months',
                instructor: 'Expert Faculty',
                price: 14000,
                thumbnail: imageUrl,
                syllabus: ['Arduino Programming', 'Sensors & Actuators', 'Raspberry Pi Basics', 'Building Autonomous Bots', 'IoT Protocols (MQTT)']
            }
        ];

        await Course.insertMany(courses);
        console.log('Courses seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedCourses();
