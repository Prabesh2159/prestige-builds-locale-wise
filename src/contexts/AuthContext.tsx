import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/**
 * Admin Authentication Context
 * 
 * BACKEND INTEGRATION NOTES:
 * ==========================
 * This is a frontend-only authentication implementation.
 * 
 * TODO: Replace with actual backend authentication:
 * - POST /api/auth/login - Authenticate admin user
 * - POST /api/auth/logout - Invalidate session
 * - GET /api/auth/session - Check current session
 * 
 * Security considerations for production:
 * - Use JWT tokens or session cookies
 * - Implement HTTPS
 * - Add rate limiting
 * - Store credentials securely (never in client code)
 */

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Use sessionStorage for temporary session persistence
  // TODO: Replace with secure token-based auth from backend
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  useEffect(() => {
    // Sync state with sessionStorage
    if (isAuthenticated) {
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      sessionStorage.removeItem('admin_authenticated');
    }
  }, [isAuthenticated]);

  /**
   * Login function - Frontend placeholder
   * TODO: Replace with actual API call
   * 
   * Example backend integration:
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email, password })
   * });
   * const data = await response.json();
   * if (data.success) {
   *   // Store token in httpOnly cookie (done by backend)
   *   setIsAuthenticated(true);
   * }
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Frontend-only validation (placeholder)
    // TODO: Replace with backend authentication
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password' };
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    
    // For demo purposes, accept any valid credentials
    // TODO: Backend will validate credentials
    setIsAuthenticated(true);
    return { success: true };
  };

  /**
   * Logout function
   * TODO: Call backend to invalidate session/token
   */
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    // TODO: Call POST /api/auth/logout to invalidate server session
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
