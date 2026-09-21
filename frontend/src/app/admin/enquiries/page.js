'use client';

import { useEffect, useState } from 'react';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('All Time');

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

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Contacted' : 'Pending';
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating status');
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  // Extract unique courses from existing enquiries to populate the filter dropdown dynamically
  const uniqueCourses = ['All', ...new Set(enquiries.map(enq => enq.courseInterested || enq.course || 'General Enquiry'))];

  const filteredEnquiries = enquiries.filter(enq => {
    // Course Filter
    const matchesCourse = filterCourse === 'All' || (enq.courseInterested || enq.course || 'General Enquiry') === filterCourse;
    
    // Status Filter (Need to Contact = Pending)
    const matchesStatus = filterStatus === 'All' 
      || (filterStatus === 'Contacted' && enq.status === 'Contacted')
      || (filterStatus === 'Need to Contact' && enq.status === 'Pending');

    // Date Filter
    let matchesDate = true;
    if (filterDate !== 'All Time') {
      const enqDate = new Date(enq.createdAt);
      const now = new Date();
      if (filterDate === 'Today') {
        matchesDate = enqDate.toDateString() === now.toDateString();
      } else if (filterDate === 'Last 7 Days') {
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        matchesDate = enqDate >= sevenDaysAgo;
      }
    }

    return matchesCourse && matchesStatus && matchesDate;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ color: 'var(--primary-color)', margin: 0 }}>Manage Enquiries</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Course:</label>
            <select 
              value={filterCourse} 
              onChange={(e) => setFilterCourse(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}
            >
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}
            >
              <option value="All">All</option>
              <option value="Need to Contact">Need to Contact</option>
              <option value="Contacted">Contacted</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Date:</label>
            <select 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--background-light)', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Contact</th>
              <th style={{ padding: '15px' }}>Interested Course</th>
              <th style={{ padding: '15px' }}>Status</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>No enquiries found.</td>
              </tr>
            ) : (
              filteredEnquiries.map((enq) => (
                <tr 
                  key={enq._id} 
                  style={{ 
                    borderBottom: '1px solid var(--border-light)',
                    backgroundColor: enq.status === 'Contacted' ? '#f0fdf4' : 'transparent',
                    transition: 'background-color 0.3s ease'
                  }}
                >
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="checkbox" 
                        checked={enq.status === 'Contacted'}
                        onChange={() => toggleStatus(enq._id, enq.status)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#16a34a' }}
                      />
                      <span style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '500',
                        color: enq.status === 'Contacted' ? '#16a34a' : '#d97706'
                      }}>
                        {enq.status === 'Contacted' ? 'Contacted' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <button onClick={() => deleteEnquiry(enq._id)} style={{ color: 'red', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Delete</button>
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
