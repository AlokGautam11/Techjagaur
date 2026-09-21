'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.role === 'Admin') {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid Admin Credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '400px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--primary-color)' }}>Admin Login</h2>
      <p className="text-muted" style={{ textAlign: 'center', marginBottom: '30px' }}>Secure access for Techjaguar Academy</p>
      
      {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Admin Email</label>
          <input 
            type="email" 
            className="form-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
}
