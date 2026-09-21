import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h2 className="nav-logo" style={{ margin: 0, color: 'var(--primary-color)' }}>TECHJAGUAR</h2>
        </Link>
        <ul className="nav-links">
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <a href="tel:+919630857026" className="btn btn-secondary nav-call-btn">📞 Call</a>
          <Link href="/contact" className="btn btn-primary nav-enquire-btn">Enquire</Link>
        </div>
      </div>
    </nav>
  );
}
