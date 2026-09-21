import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OfferBanner from '@/components/OfferBanner';

export const metadata = {
  title: 'Techjaguar Academy Rewa | Professional IT Training & Certification',
  description: 'Techjaguar Academy in Azad Nagar, Rewa provides top-tier IT training, Coding, AI, Robotics, and Certification courses. Get practical, hands-on learning with expert instructors.',
  keywords: 'Techjaguar Academy, IT Training Rewa, Coding Institute Rewa, AI classes, Cyber Security, Prateek Sir',
  openGraph: {
    title: 'Techjaguar Academy Rewa',
    description: 'Expert IT & Computer Training in Rewa, Madhya Pradesh.',
    type: 'website',
  },
  verification: {
    google: 'v9dU-_F75FPN1LE26uLKhPm8dRHY9UlqZLphQoMUGSw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <OfferBanner />
        <Navbar />
        <div style={{ flex: '1' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
