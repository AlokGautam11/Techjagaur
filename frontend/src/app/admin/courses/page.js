'use client';

import { useEffect, useState, useRef } from 'react';

export default function CoursesManager() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
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

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    // Convert comma separated syllabus string to JSON array
    const syllabusString = formData.get('syllabus');
    if (syllabusString) {
      const syllabusArray = syllabusString.split(',').map(item => item.trim());
      formData.set('syllabus', JSON.stringify(syllabusArray));
    }

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData, // Sending as FormData because it contains a file
      });
      
      if (res.ok) {
        setShowAddForm(false);
        fetchCourses();
      } else {
        alert('Failed to add course');
      }
    } catch (error) {
      console.error('Error uploading course');
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

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Manage Courses</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">
          {showAddForm ? 'Cancel' : '+ Add New Course'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Add New Course</h2>
          <form ref={formRef} onSubmit={handleAddCourse} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Course Title</label>
              <input type="text" name="title" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Instructor</label>
              <input type="text" name="instructor" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="text" name="duration" placeholder="e.g. 6 Months" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input type="number" name="price" className="form-input" defaultValue="0" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Syllabus (Comma separated)</label>
              <input type="text" name="syllabus" placeholder="HTML, CSS, React..." className="form-input" />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Course Description</label>
              <textarea name="description" className="form-input" rows="3" required></textarea>
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Course Thumbnail (Image)</label>
              <input type="file" name="image" accept="image/*" className="form-input" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Course (Uploads to Cloudinary)</button>
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
              <p className="text-muted" style={{ marginBottom: '15px' }}>{course.instructor} • {course.duration}</p>
              <button onClick={() => deleteCourse(course._id)} style={{ color: 'red', textDecoration: 'underline' }}>Delete Course</button>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p>No courses found in the database.</p>}
      </div>
    </div>
  );
}
