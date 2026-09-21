'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load modals for performance
const CourseEnquiryModal = dynamic(() => import('./CourseEnquiryModal'), { ssr: false });
const SyllabusModal = dynamic(() => import('./SyllabusModal'), { ssr: false });

export default function CourseList({ trendingOnly = false }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        if (res.ok) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // For the homepage "trending", we'll just slice the first 3 courses
  const displayCourses = trendingOnly ? courses.slice(0, 3) : courses;

  const openEnquiry = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const openSyllabus = (course) => {
    setSelectedCourse(course.title);
    setSelectedSyllabus(course.syllabus);
    setIsSyllabusModalOpen(true);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading courses...</div>;
  }

  if (courses.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--background-light)', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>New Courses Coming Soon!</h3>
        <p className="text-muted">We are currently updating our syllabus. Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="course-grid">
        {displayCourses.map((course) => (
          <div key={course._id} className="course-card">
            <Image 
              src={course.thumbnail} 
              alt={course.title} 
              width={400} 
              height={200}
              className="course-img" 
              style={{ height: '200px', objectFit: 'cover', width: '100%' }} 
            />
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <div className="course-meta">
                <span>⏱ {course.duration}</span>
                <span>👨‍🏫 {course.instructor}</span>
              </div>
              <div className="course-syllabus">
                <strong>Key Syllabus:</strong>
                <ul>
                  {course.syllabus && course.syllabus.slice(0, 4).map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
                {course.syllabus && course.syllabus.length > 4 && (
                  <button 
                    onClick={() => openSyllabus(course)} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold', padding: '5px 0', fontSize: '0.9rem' }}
                  >
                    + Read All
                  </button>
                )}
              </div>
              <button onClick={() => openEnquiry(course.title)} className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <CourseEnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedCourse={selectedCourse} 
      />

      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        courseTitle={selectedCourse}
        syllabus={selectedSyllabus}
      />
    </>
  );
}
