import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      backdropFilter: 'blur(10px)', 
      borderTop: '1px solid rgba(255, 255, 255, 0.5)',
      padding: '50px 0 20px 0',
      marginTop: 'auto',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.05)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        
        {/* Brand Section */}
        <div>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.5rem' }}>Techjaguar Academy</h3>
          <p className="text-muted" style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            Empowering students with practical, hands-on IT training and live-project internships to build the engineers of tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: '20px', fontWeight: '600' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/" className="footer-link">Home</Link></li>
            <li><Link href="/courses" className="footer-link">All Courses</Link></li>
            <li><Link href="/contact" className="footer-link">Contact & Admissions</Link></li>
            <li><Link href="/admin/login" className="footer-link">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ marginBottom: '20px', fontWeight: '600' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li className="text-muted" style={{ display: 'flex', gap: '10px' }}>
              <span>📍</span> 
              <span>Azad Nagar (Opp. Bajrang Nagar Gate), Rewa, Madhya Pradesh 486001</span>
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

      <div className="container" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px', textAlign: 'center' }}>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Techjaguar Academy Rewa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
