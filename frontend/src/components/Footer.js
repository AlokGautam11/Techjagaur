'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'transparent',
      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      padding: '25px 0 10px 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '15px' }}>
        
        {/* Brand Section */}
        <div>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>Techjaguar Academy</h3>
          <p className="text-muted" style={{ lineHeight: '1.4', marginBottom: '10px', fontSize: '0.9rem' }}>
            Empowering students with practical, hands-on IT training and live-project internships to build the engineers of tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: '10px', fontWeight: '600', fontSize: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
            <li><Link href="/" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
            <li><Link href="/about" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</Link></li>
            <li><Link href="/courses" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>All Courses</Link></li>
            <li><Link href="/contact" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact & Admissions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ marginBottom: '10px', fontWeight: '600', fontSize: '1rem' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <li className="text-muted" style={{ display: 'flex', gap: '8px' }}>
              <span>📍</span> 
              <span>Azad Nagar (Opp. Bajrang Nagar Gate), Rewa, MP 486001</span>
            </li>
            <li className="text-muted" style={{ display: 'flex', gap: '10px' }}>
              <span>📞</span> 
              <a href="tel:+919630857026" style={{ color: 'inherit', textDecoration: 'none' }}>+91-9630857026</a>
            </li>
            <li className="text-muted" style={{ display: 'flex', gap: '10px' }}>
              <span>📧</span> 
              <a href="mailto:admin@techjagaur.in" style={{ color: 'inherit', textDecoration: 'none' }}>admin@techjagaur.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '10px', textAlign: 'center' }}>
        <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Techjaguar Academy Rewa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
