'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'General Enquiry', message: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Your enquiry has been submitted successfully!');
        setFormData({ name: '', email: '', phone: '', course: 'General Enquiry', message: '' });
      } else {
        alert('Failed to submit enquiry. Please check the fields.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Send an Enquiry</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name *</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter your name" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email Address *</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter your email" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone Number *</label>
          <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Enter your mobile number" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Interested Course</label>
          <select value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="General Enquiry">Select a Course / General Enquiry</option>
            <option value="Full Stack Web Development">Full Stack Web Development</option>
            <option value="Python & Data Science">Python & Data Science</option>
            <option value="Cybersecurity Basics">Cybersecurity Basics</option>
            <option value="C & C++ Programming">C & C++ Programming</option>
            <option value="Java Masterclass">Java Masterclass</option>
            <option value="Robotics & IoT">Robotics & IoT</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Message (Optional)</label>
          <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Any specific questions?" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Submit Details</button>
      </form>
    </div>
  );
}
