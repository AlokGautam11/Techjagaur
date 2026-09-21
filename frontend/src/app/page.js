import Link from 'next/link';
import CourseList from '@/components/CourseList';
import InternshipBanner from '@/components/InternshipBanner';
import ContactForm from '@/components/ContactForm';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export const metadata = {
  title: 'Techjaguar Academy Rewa | Best IT & Coding Courses',
  description: 'Enroll in Techjaguar Academy in Rewa for hands-on IT courses in Python, Data Science, AI, and Cybersecurity. Start your tech journey today with expert instructors.',
  keywords: 'Coding Rewa, IT Academy Rewa, Best Computer Institute, Python Course Rewa',
};

export default async function Home() {
  await dbConnect();
  const coursesData = await Course.find({}).lean();
  const initialCourses = JSON.parse(JSON.stringify(coursesData));

  return (
    <main>
      {/* Hero Section */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container flex-responsive" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: '20px' }}>
              Master the Future of IT at Techjaguar Academy
            </h1>
            <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '30px', maxWidth: '500px' }}>
              Practical, hands-on training in Coding, Artificial Intelligence, Cybersecurity, and more. Located in the heart of Rewa, preparing you for real-world tech careers.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link href="/courses" className="btn btn-primary">Explore Courses</Link>
              <Link href="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
             {/* Realistic Image Placeholder - we will generate and place a real image here */}
            <div style={{ 
              width: '100%', 
              height: '400px', 
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
              backgroundImage: 'url(/images/hero-realistic.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Values Section */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2>Why Choose Techjaguar?</h2>
            <p className="text-muted">We focus on practical skills that employers actually need.</p>
          </div>
          <div className="responsive-grid">
            {/* Feature 1 */}
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Expert Instructors</h3>
              <p className="text-muted">Learn directly from experienced professionals like Prateek Sir, focusing on industry standards.</p>
            </div>
            {/* Feature 2 */}
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Hands-on Projects</h3>
              <p className="text-muted">Theory is good, but building is better. Every course is packed with practical assignments.</p>
            </div>
            {/* Feature 3 */}
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Career Ready</h3>
              <p className="text-muted">We improve your communication and presentation skills alongside your technical abilities.</p>
            </div>
          </div>
        </div>
      </section>

      <InternshipBanner />

      {/* Trending Courses Section */}
      <section id="courses" className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '20px' }}>
            <h2>Most Trending Courses</h2>
            <p className="text-muted">Master the most in-demand skills in the industry.</p>
          </div>
          
          <CourseList trendingOnly={true} initialCourses={initialCourses} />
          
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link href="/courses" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>See All Courses</Link>
          </div>
        </div>
      </section>

      {/* Rich Information Section */}
      <section id="about" className="section">
        <div className="container text-center">
          <h2 style={{ marginBottom: '20px' }}>The Premier Institute of Technology in Rewa</h2>
          <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            At Techjaguar Academy, we don't just teach code; we build engineers. Located in Azad Nagar, our modern facility is equipped to provide the most immersive, hands-on learning experience in Central India. Whether you are aiming for a career in Artificial Intelligence, Full-Stack Development, or Cybersecurity, our expert-led programs ensure you are industry-ready.
          </p>
        </div>
      </section>

      {/* Quick Enquiry Section */}
      <section id="contact" className="section">
        <div className="container flex-responsive" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Start Your Tech Journey Today</h2>
            <p className="text-muted" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
              Have questions about our syllabus, batches, or fees? Drop your details and our team will get back to you immediately.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }} className="text-muted">
              <li style={{ marginBottom: '10px' }}>📍 Azad Nagar (Opp. Bajrang Nagar Gate), Rewa</li>
              <li style={{ marginBottom: '10px' }}>📞 +91-9630857026</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
