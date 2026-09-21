'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, enquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        // We fetch the full arrays to get the counts
        const [coursesRes, enquiriesRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/enquiries', { headers })
        ]);

        const courses = await coursesRes.json();
        const enquiries = await enquiriesRes.json();

        setStats({
          courses: courses.length || 0,
          enquiries: enquiries.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '10px' }}>Total Courses</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.courses}</p>
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '10px' }}>Total Enquiries</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{stats.enquiries}</p>
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 className="text-muted" style={{ fontSize: '1rem', marginBottom: '10px' }}>Active Offers</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50' }}>0</p>
        </div>

      </div>
    </div>
  );
}
