import Link from 'next/link';
import CourseList from '@/components/CourseList';
import InternshipBanner from '@/components/InternshipBanner';

export const metadata = {
  title: 'Techjaguar Academy Rewa | Best IT & Coding Courses',
  description: 'Enroll in Techjaguar Academy in Rewa for hands-on IT courses in Python, Data Science, AI, and Cybersecurity. Start your tech journey today with expert instructors.',
  keywords: 'Coding Rewa, IT Academy Rewa, Best Computer Institute, Python Course Rewa',
};

export default function Home() {
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
          
          <CourseList trendingOnly={true} />
          
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
          <div style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)', padding: '40px', borderRadius: '12px', color: 'var(--text-main)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Quick Enquiry</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Your Name" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
              <input type="email" placeholder="Your Email" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
              <input type="tel" placeholder="Phone Number" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
              <select style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option>Interested in (Course)</option>
                <option>Full Stack Web Development</option>
                <option>Python & Data Science</option>
                <option>Cybersecurity</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Submit Enquiry</button>
              <div style={{ textAlign: 'center', marginTop: '5px' }}>
                <p className="text-muted" style={{ marginBottom: '10px', fontSize: '0.9rem' }}>Or skip the form and call us directly:</p>
                <a href="tel:+919630857026" className="btn btn-secondary" style={{ display: 'block', textDecoration: 'none' }}>
                  📞 +91-9630857026
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
