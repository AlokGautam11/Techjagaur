'use client';

import { useEffect, useState, useRef } from 'react';

export default function CoursesManager() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const formRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (res.ok) setCourses(data);
    } catch (error) {
      console.error('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    // Convert comma separated syllabus string to JSON array
    const syllabusString = formData.get('syllabus');
    let syllabusArray = [];
    if (syllabusString) {
      syllabusArray = syllabusString.split(',').map(item => item.trim());
    }

    const payload = {
      title: formData.get('title'),
      instructor: formData.get('instructor'),
      duration: formData.get('duration'),
      price: Number(formData.get('price')) || 0,
      offeredPrice: Number(formData.get('offeredPrice')) || 0,
      syllabus: syllabusArray,
      description: formData.get('description'),
      thumbnail: formData.get('thumbnail') || '/images/default-course.jpg'
    };

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingCourse ? `/api/courses/${editingCourse._id}` : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';
      
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
        setEditingCourse(null);
        fetchCourses();
      } else {
        alert('Failed to save course');
      }
    } catch (error) {
      console.error('Error saving course');
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course');
    }
  };

  const openEditForm = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingCourse(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Manage Courses</h1>
        <button onClick={showForm ? closeForm : () => setShowForm(true)} className="btn btn-primary">
          {showForm ? 'Cancel' : '+ Add New Course'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
          <form ref={formRef} onSubmit={handleSaveCourse} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input type="text" name="title" defaultValue={editingCourse?.title || ''} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Instructor</label>
              <input type="text" name="instructor" defaultValue={editingCourse?.instructor || ''} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="text" name="duration" placeholder="e.g. 6 Months" defaultValue={editingCourse?.duration || ''} className="form-input" required />
            </div>
            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Real Price (₹)</label>
                <input type="number" name="price" defaultValue={editingCourse?.price || 0} className="form-input" />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Offered Price (₹)</label>
                <input type="number" name="offeredPrice" defaultValue={editingCourse?.offeredPrice || 0} className="form-input" />
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Syllabus (Comma separated)</label>
              <input type="text" name="syllabus" placeholder="HTML, CSS, React..." defaultValue={editingCourse?.syllabus?.join(', ') || ''} className="form-input" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Course Description</label>
              <textarea name="description" defaultValue={editingCourse?.description || ''} className="form-input" rows="3" required></textarea>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Course Thumbnail URL</label>
              <input type="text" name="thumbnail" defaultValue={editingCourse?.thumbnail || '/images/default-course.jpg'} placeholder="https://example.com/image.jpg" className="form-input" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {courses.map(course => (
          <div key={course._id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{course.title}</h3>
              <p className="text-muted" style={{ marginBottom: '10px' }}>{course.instructor} • {course.duration}</p>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '10px' }}>₹{course.price}</span>
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₹{course.offeredPrice}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => openEditForm(course)} className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>Edit</button>
                <button onClick={() => deleteCourse(course._id)} className="btn" style={{ flex: 1, padding: '8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p>No courses found in the database.</p>}
      </div>
    </div>
  );
}
