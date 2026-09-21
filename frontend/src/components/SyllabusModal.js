'use client';

export default function SyllabusModal({ isOpen, onClose, courseTitle, syllabus }) {
  if (!isOpen) return null;

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
        backgroundColor: 'var(--background-white)',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'var(--primary-color)' }}>{courseTitle} - Full Syllabus</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>&times;</button>
        </div>
        
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          {syllabus && syllabus.map((topic, i) => (
            <li key={i} style={{ marginBottom: '10px' }}>{topic}</li>
          ))}
        </ul>

        <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          Close
        </button>
      </div>
    </div>
  );
}
