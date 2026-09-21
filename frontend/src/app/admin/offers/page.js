'use client';

import { useEffect, useState, useRef } from 'react';

export default function OffersManager() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  
  const formRef = useRef(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers');
      const data = await res.json();
      if (res.ok) setOffers(data);
    } catch (error) {
      console.error('Error fetching offers');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      isActive: formData.get('isActive') === 'on'
    };

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingOffer ? `/api/offers/${editingOffer._id}` : '/api/offers';
      const method = editingOffer ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setShowForm(false);
        setEditingOffer(null);
        fetchOffers();
      } else {
        alert('Failed to save offer');
      }
    } catch (error) {
      console.error('Error saving offer');
    }
  };

  const deleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer');
    }
  };

  const openEditForm = (offer) => {
    setEditingOffer(offer);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingOffer(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading offers...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Manage Homepage Offers</h1>
        <button onClick={showForm ? closeForm : () => setShowForm(true)} className="btn btn-primary">
          {showForm ? 'Cancel' : '+ Add New Offer'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
          <form ref={formRef} onSubmit={handleSaveOffer} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Offer Title (Short highlighting text)</label>
              <input type="text" name="title" placeholder="e.g. Diwali Special" defaultValue={editingOffer?.title || ''} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Offer Description (Details shown on banner)</label>
              <input type="text" name="description" placeholder="e.g. Get 50% off on all Full-Stack courses!" defaultValue={editingOffer?.description || ''} className="form-input" required />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="isActive" id="isActive" defaultChecked={editingOffer ? editingOffer.isActive : true} style={{ width: '20px', height: '20px' }} />
              <label htmlFor="isActive" className="form-label" style={{ marginBottom: 0 }}>Set as Active (Will display on homepage immediately)</label>
            </div>
            <div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                {editingOffer ? 'Save Changes' : 'Create Offer'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {offers.map(offer => (
          <div key={offer._id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', padding: '20px', borderLeft: offer.isActive ? '6px solid #10b981' : '6px solid #ccc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {offer.title} 
                  {offer.isActive ? 
                    <span style={{ fontSize: '0.8rem', background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '12px' }}>Active</span> 
                    : <span style={{ fontSize: '0.8rem', background: '#f3f4f6', color: '#4b5563', padding: '2px 8px', borderRadius: '12px' }}>Inactive</span>
                  }
                </h3>
                <p className="text-muted" style={{ marginBottom: '15px' }}>{offer.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => openEditForm(offer)} className="btn btn-secondary" style={{ padding: '8px 15px' }}>Edit</button>
                <button onClick={() => deleteOffer(offer._id)} className="btn" style={{ padding: '8px 15px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {offers.length === 0 && <p>No offers found in the database. Create one to display a banner on the homepage!</p>}
      </div>
    </div>
  );
}
