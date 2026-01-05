import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

/**
 * Admin Route Guard Component
 * Monitors route changes and logs out admin when navigating away from admin pages
 * This ensures login is required each time admin is accessed
 */
const AdminRouteGuard = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const location = useLocation();
  const wasOnAdminRoute = useRef(false);

  useEffect(() => {
    const isOnAdminRoute = location.pathname.startsWith('/admin');
    
    // If we were on an admin route and now we're not, logout
    if (wasOnAdminRoute.current && !isOnAdminRoute && isAuthenticated) {
      logout();
    }
    
    // Update the ref for next comparison
    wasOnAdminRoute.current = isOnAdminRoute;
  }, [location.pathname, isAuthenticated, logout]);

  return null;
};

export default AdminRouteGuard;
