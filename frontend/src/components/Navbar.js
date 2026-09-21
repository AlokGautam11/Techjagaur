'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand-group">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            ☰
          </button>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h2 className="nav-logo" style={{ margin: 0, color: 'var(--primary-color)' }}>TECHJAGUAR</h2>
          </Link>
        </div>
        
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/#about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        
        <div className="nav-actions">
          <a href="tel:+919630857026" className="btn btn-secondary nav-call-btn">📞 Call</a>
          <Link href="/contact" className="btn btn-primary nav-enquire-btn">Enquire</Link>
        </div>
      </div>
    </nav>

    {/* Mobile Side Menu */}
    <div className={`mobile-side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="mobile-menu-header">
        <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Menu</h2>
        <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>&times;</button>
      </div>
      <ul className="mobile-nav-links">
        <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
        <li><Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>All Courses</Link></li>
        <li><Link href="/#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
        <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact & Admissions</Link></li>
      </ul>
      <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #eee' }}>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Call us directly:</p>
        <a href="tel:+919630857026" className="btn btn-primary" style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
          📞 +91-9630857026
        </a>
      </div>
    </div>
    
    {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </>
  );
}
