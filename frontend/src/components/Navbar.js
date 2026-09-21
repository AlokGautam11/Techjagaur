import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>TECHJAGUAR</h2>
        </Link>
        <ul className="nav-links">
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div>
          <Link href="/contact" className="btn btn-primary">Enquire Now</Link>
        </div>
      </div>
    </nav>
  );
}
