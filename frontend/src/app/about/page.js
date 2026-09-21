export const metadata = {
  title: 'About Techjaguar Academy | IT Institute in Rewa',
  description: 'Learn about Techjaguar Academy, the premier IT and Computer training institute in Azad Nagar, Rewa. Discover our mission to build industry-ready engineers.',
  keywords: 'About Techjaguar, IT Institute Rewa, Prateek Sir Rewa, Computer Classes',
};

export default function AboutPage() {
  return (
    <main>
      <section className="section" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--background-white)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--background-white)', marginBottom: '15px' }}>About Techjaguar Academy</h1>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Building the next generation of engineers in Rewa through practical, hands-on learning.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--background-white)' }}>
        <div className="container flex-responsive" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Our Mission & Vision</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              At Techjaguar Academy, our mission is to bridge the gap between academic theory and real-world industry requirements. Located in the heart of Rewa at Azad Nagar, we provide students with an immersive environment to master the latest technologies.
            </p>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
              Led by expert instructors like Prateek Sir, we believe in hands-on projects, intensive coding sessions, and continuous mentorship. Our vision is to make Rewa a hub of high-quality IT talent.
            </p>
          </div>
          <div style={{ flex: 1 }}>
             <div style={{ 
              width: '100%', 
              height: '350px', 
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

      <section className="section" style={{ backgroundColor: 'var(--background-light)' }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: '40px' }}>Why We Stand Out</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Expert Mentorship</h3>
              <p className="text-muted">Learn directly from professionals who have worked in the tech industry.</p>
            </div>
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Project-Based Learning</h3>
              <p className="text-muted">Build real applications, websites, and systems instead of just reading books.</p>
            </div>
            <div style={{ backgroundColor: 'var(--background-white)', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>Career Guidance</h3>
              <p className="text-muted">We help you build your resume, optimize your LinkedIn, and prepare for interviews.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
