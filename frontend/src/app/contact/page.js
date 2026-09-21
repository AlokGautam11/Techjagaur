export const metadata = {
  title: 'Contact Us | Techjaguar Academy Rewa',
  description: 'Get in touch with Techjaguar Academy. Submit an enquiry for courses, batch timings, and fees. Located in Azad Nagar, Rewa.',
  keywords: 'Contact Techjaguar, Techjaguar Address, Techjaguar Phone Number, Enquire IT Course',
};

import ContactForm from '../../components/ContactForm';

export default function ContactPage() {

  return (
    <main>
      <section className="section" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Contact & Enquiry</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            We are here to help you start your tech journey. Reach out to us anytime!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container flex-responsive" style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Visit Our Campus</h2>
            <p className="text-muted" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
              We'd love to discuss your career goals in person. Stop by our office to see our facilities and meet our instructors.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Address:</h3>
              <p className="text-muted">Azad Nagar, Opposite Bajrang Nagar Gate,<br/>Rewa, Madhya Pradesh 486001</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Phone:</h3>
              <p className="text-muted">+91-XXXXXXXXXX</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Email:</h3>
              <p className="text-muted">info@techjaguar.com</p>
            </div>
          </div>

          <ContactForm />

        </div>
      </section>
    </main>
  );
}
