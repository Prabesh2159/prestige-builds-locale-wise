import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// TODO: Replace with backend authentication API
// This is a frontend-only implementation for demonstration
// Authentication state is stored in sessionStorage for persistence across page refreshes

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'admin_authenticated';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // TODO: Replace with backend API call for actual authentication
  const login = (username: string, password: string): { success: boolean; error?: string } => {
    // Validate username
    if (!username.trim()) {
      return { success: false, error: 'Username is required' };
    }
    
    // Validate password
    if (!password.trim()) {
      return { success: false, error: 'Password is required' };
    }

    // TODO: Backend Integration - Replace with actual API authentication
    // For now, use hardcoded credentials
    // In production, this should verify against a secure backend
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return { success: true };
    }
    
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
