import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Techjaguar Academy Rewa | Professional IT Training & Certification',
  description: 'Techjaguar Academy in Azad Nagar, Rewa provides top-tier IT training, Coding, AI, Robotics, and Certification courses. Get practical, hands-on learning with expert instructors.',
  keywords: 'Techjaguar Academy, IT Training Rewa, Coding Institute Rewa, AI classes, Cyber Security, Prateek Sir',
  openGraph: {
    title: 'Techjaguar Academy Rewa',
    description: 'Expert IT & Computer Training in Rewa, Madhya Pradesh.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
