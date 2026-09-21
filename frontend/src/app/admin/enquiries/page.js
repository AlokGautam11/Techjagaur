'use client';

import { useEffect, useState } from 'react';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/enquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Error fetching enquiries');
    } finally {
      setLoading(false);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEnquiries(); // Refresh list
    } catch (error) {
      console.error('Error deleting enquiry');
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Manage Enquiries</h1>
      
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-light)', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Contact</th>
              <th style={{ padding: '15px' }}>Interested Course</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No enquiries found.</td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '15px' }}>{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{enq.name}</td>
                  <td style={{ padding: '15px' }}>
                    <div>{enq.phone}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{enq.email}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    {enq.courseInterested || enq.course || 'General Enquiry'}
                    {enq.message && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>Msg: {enq.message}</div>}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button onClick={() => deleteEnquiry(enq._id)} style={{ color: 'red', textDecoration: 'underline' }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
