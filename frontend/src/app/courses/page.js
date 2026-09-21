import CourseList from '@/components/CourseList';

export const metadata = {
  title: 'All Courses | Techjaguar Academy Rewa',
  description: 'Browse all available IT, Coding, and Certification courses at Techjaguar Academy Rewa. Master skills in Web Development, AI, Data Science, and Cybersecurity.',
  keywords: 'IT Courses Rewa, Coding Classes, Learn Python, Learn AI, Full Stack Course',
};

export default function CoursesPage() {
  return (
    <main>
      {/* Courses Header */}
      <section className="section" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Our Comprehensive Course Catalog</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Choose from a wide variety of industry-relevant courses designed to make you a job-ready professional.
          </p>
        </div>
      </section>

      {/* Course List */}
      <section className="section">
        <div className="container">
          <CourseList />
        </div>
      </section>
    </main>
  );
}
