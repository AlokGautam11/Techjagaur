'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load modals for performance
const CourseEnquiryModal = dynamic(() => import('./CourseEnquiryModal'), { ssr: false });
const SyllabusModal = dynamic(() => import('./SyllabusModal'), { ssr: false });

export default function CourseList({ trendingOnly = false, initialCourses = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState([]);

  // For the homepage "trending", we'll just slice the first 3 courses
  const displayCourses = trendingOnly ? initialCourses.slice(0, 3) : initialCourses;

  const openEnquiry = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const openSyllabus = (course) => {
    setSelectedCourse(course.title);
    setSelectedSyllabus(course.syllabus);
    setIsSyllabusModalOpen(true);
  };

  if (initialCourses.length === 0) {
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
              height={150}
              className="course-img" 
              style={{ height: '150px', objectFit: 'cover', width: '100%' }} 
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
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={() => openEnquiry(course.title)} className="btn btn-primary" style={{ flex: 1, padding: '10px 0' }}>
                  Enquire
                </button>
                <a href="tel:+919630857026" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', padding: '10px 0', textDecoration: 'none' }}>
                  Call
                </a>
              </div>
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
