'use client';

import { useState } from 'react';

export default function InternshipModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'Internship', message: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Your Internship Application has been submitted successfully!');
        setFormData({ name: '', email: '', phone: '', course: 'Internship', message: '' });
        onClose();
      } else {
        alert('Failed to submit application. Please check the fields.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="modal-content" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.4)',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'var(--primary-color)' }}>Apply for Internship</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>&times;</button>
        </div>
        
        <p className="text-muted" style={{ marginBottom: '20px' }}>Fill out the details below. No resume required!</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label className="form-label">Full Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" required />
          </div>
          <div>
            <label className="form-label">Email Address *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input" required />
          </div>
          <div>
            <label className="form-label">Phone Number *</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="form-input" required />
          </div>
          <div>
            <label className="form-label">College / Degree *</label>
            <input type="text" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="e.g. B.Tech from XYZ College" className="form-input" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit Application</button>
        </form>
      </div>
    </div>
  );
}
