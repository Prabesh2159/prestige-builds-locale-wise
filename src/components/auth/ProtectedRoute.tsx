import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Auth Guard Component
 * Protects the admin panel from unauthorized access
 * Redirects to /admin/login if user is not authenticated
 * Works on page refresh and direct URL access
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
