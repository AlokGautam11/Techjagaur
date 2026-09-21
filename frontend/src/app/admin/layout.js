'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // If it's the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <div style={{ backgroundColor: 'var(--background-light)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>;
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-height))', backgroundColor: 'var(--background-light)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--primary-color)', color: 'white', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '40px', color: 'var(--secondary-color)', textAlign: 'center' }}>Admin Panel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
          <Link href="/admin/dashboard" style={{ padding: '10px', borderRadius: '4px', backgroundColor: pathname === '/admin/dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'white' }}>
            📊 Dashboard
          </Link>
          <Link href="/admin/courses" style={{ padding: '10px', borderRadius: '4px', backgroundColor: pathname.startsWith('/admin/courses') ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'white' }}>
            📚 Manage Courses
          </Link>
          <Link href="/admin/offers" style={{ padding: '10px', borderRadius: '4px', backgroundColor: pathname.startsWith('/admin/offers') ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'white' }}>
            🎁 Manage Offers
          </Link>
          <Link href="/admin/enquiries" style={{ padding: '10px', borderRadius: '4px', backgroundColor: pathname.startsWith('/admin/enquiries') ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'white' }}>
            📩 Enquiries
          </Link>
          <Link href="/admin/settings" style={{ padding: '10px', borderRadius: '4px', backgroundColor: pathname.startsWith('/admin/settings') ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'white' }}>
            ⚙️ Settings
          </Link>
        </nav>
        <button onClick={handleLogout} style={{ padding: '10px', color: 'white', backgroundColor: 'rgba(255,0,0,0.2)', border: '1px solid rgba(255,0,0,0.5)', borderRadius: '4px', marginTop: 'auto' }}>
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
