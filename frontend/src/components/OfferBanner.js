'use client';

import { useEffect, useState } from 'react';

export default function OfferBanner() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/offers');
        if (res.ok) {
          const data = await res.json();
          // Find the first active offer
          const activeOffer = data.find(o => o.isActive);
          if (activeOffer) setOffer(activeOffer);
        }
      } catch (error) {
        console.error('Failed to fetch offers');
      }
    };
    fetchOffers();
  }, []);

  if (!offer) return null;

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--primary-color)',
      backgroundImage: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      fontSize: '0.95rem',
      fontWeight: '500',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      flexWrap: 'wrap'
    }}>
      <span style={{ 
        background: '#fff', 
        color: 'var(--primary-color)', 
        padding: '2px 8px', 
        borderRadius: '12px', 
        fontWeight: 'bold', 
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {offer.title}
      </span>
      <span>{offer.description}</span>
      <button 
        onClick={() => setOffer(null)} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'white', 
          cursor: 'pointer', 
          fontSize: '1.2rem', 
          position: 'absolute', 
          right: '15px' 
        }}
        aria-label="Close offer banner"
      >
        &times;
      </button>
    </div>
  );
}
