'use client';

import { useState } from 'react';

export default function CourseEnquiryModal({ isOpen, onClose, selectedCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course: selectedCourse })
      });
      if (res.ok) {
        alert('Enquiry Submitted Successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        onClose();
      } else {
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Enquire About Course</h3>
        <p className="text-muted" style={{ marginBottom: '20px' }}>
          You are enquiring for: <strong>{selectedCourse}</strong>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input 
              type="tel" 
              className="form-input" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message (Optional)</label>
            <textarea 
              className="form-input" 
              rows="3" 
              style={{ resize: 'vertical' }}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
