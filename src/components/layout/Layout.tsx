import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NewsTicker from './NewsTicker';
import FloatingCallButton from './FloatingCallButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + Alt + R to open admin panel
      if (e.shiftKey && e.altKey && (e.key === 'r' || e.key === 'R' || e.code === 'KeyR')) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [navigate]);

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="h-16 md:h-20" /> {/* Spacer for fixed navbar */}
      <NewsTicker />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Layout;
