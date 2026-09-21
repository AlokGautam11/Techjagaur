'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const InternshipModal = dynamic(() => import('./InternshipModal'), { ssr: false });

export default function InternshipBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(236, 72, 153, 0.9))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '50px 30px',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 40px rgba(236, 72, 153, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative background circle */}
            <div style={{
              position: 'absolute',
              top: '-50%', left: '-10%',
              width: '300px', height: '300px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}></div>

            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '15px', position: 'relative', zIndex: 1 }}>
              Are you searching for an Internship?
            </h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 30px', opacity: 0.9, position: 'relative', zIndex: 1 }}>
              Kickstart your career with our hands-on, live-project based internship program. Get mentored by industry experts and build a stunning portfolio without needing any prior experience.
            </p>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <button 
                onClick={() => setIsOpen(true)}
                className="btn" 
                style={{ 
                  background: 'white', 
                  color: 'var(--primary-color)', 
                  padding: '15px 40px', 
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                Grab Training Cum Internship
              </button>
              <a 
                href="tel:+919630857026"
                className="btn" 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  border: '2px solid white',
                  padding: '13px 40px', 
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <InternshipModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
