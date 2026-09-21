# Architecture of Techjaguar Academy Project

## 1. Tech Stack Overview
- **Frontend**: Next.js (React) for server-side rendering, SEO, and fast performance. Vanilla CSS for highly customized, premium aesthetics.
- **Backend**: Express.js (Node.js) built with a strict modular architecture (MVC pattern).
- **Database**: MongoDB (using Mongoose ODM) for flexible, document-based storage.

## 2. Directory Structure (Modularity)
To ensure code is clean and scalable, we will strictly follow this structure. All related files will be grouped in their specific folders.

```text
/techjaguar
  /frontend (Next.js app)
    /components (Reusable UI components)
    /app (Pages and routing)
    /styles (Vanilla CSS files, design system)
    /utils (Helper functions)
  /backend (Express API)
    /controllers (Business logic)
    /models (Database schemas)
    /routes (API endpoints)
    /middlewares (Auth, Error handling)
    /config (DB connection, env variables)
```

## 3. Database Schema Models

### A. User Model (Students/Admins)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `role` (Enum: 'Student', 'Admin')
- `enrolledCourses` (Array of ObjectIds referencing Course Model)

### B. Course Model
- `title` (String)
- `description` (String)
- `instructor` (String)
- `duration` (String)
- `thumbnail` (String/URL)
- `syllabus` (Array of Strings)

### C. Inquiry/Contact Model
- `studentName` (String)
- `email` (String)
- `phone` (String)
- `message` (String)
- `status` (Enum: 'Pending', 'Resolved')

## 4. Complete Workflow
1. **Visitor Flow**: A user visits the landing page -> Browses courses -> Submits an inquiry or signs up.
2. **Student Flow**: Logs in -> Views enrolled courses -> Accesses study materials.
3. **Admin Flow**: Logs in -> Accesses Admin Dashboard -> Adds new courses -> Views inquiries -> Manages students.

## 5. Integration
The frontend will communicate with the backend via RESTful APIs. We will use JWT (JSON Web Tokens) for secure authentication and authorization.
