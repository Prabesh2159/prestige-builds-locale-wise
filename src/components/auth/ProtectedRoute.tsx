import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Auth Guard Component
 * Protects the admin panel from unauthorized access
 * Redirects to /admin/login if user is not authenticated
 * Clears authentication when navigating away from admin pages
 * Works on page refresh and direct URL access
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, logout } = useAdminAuth();
  const location = useLocation();

  // Clear authentication when navigating away from admin pages
  useEffect(() => {
    const handleBeforeUnload = () => {
      // This handles page refresh/close - session storage is cleared
    };

    // Listen for visibility change to detect tab switching
    const handleVisibilityChange = () => {
      // Don't logout on visibility change as user might be switching apps
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Effect to logout when navigating away from admin routes
  useEffect(() => {
    // If we're on a non-admin route and authenticated, log out
    if (!location.pathname.startsWith('/admin') && isAuthenticated) {
      logout();
    }
  }, [location.pathname, isAuthenticated, logout]);

  if (!isAuthenticated) {
    // Redirect to login page, preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
