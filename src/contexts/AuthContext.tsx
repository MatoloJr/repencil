import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'guest' | 'manufacturer' | 'admin';
  companyName?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, role: 'manufacturer' | 'admin', companyName?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('repencil_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call with mock users
      const mockUsers = [
        { id: '1', email: 'manufacturer@test.com', password: 'password', role: 'manufacturer' as const, companyName: 'ABC Pencils Inc' },
        { id: '2', email: 'admin@repencil.com', password: 'admin123', role: 'admin' as const },
        { id: '3', email: 'demo@company.com', password: 'demo', role: 'manufacturer' as const, companyName: 'Demo Corp' }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData: User = {
          ...foundUser,
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem('repencil_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: 'manufacturer' | 'admin', companyName?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      const userData: User = {
        id: Date.now().toString(),
        email,
        role,
        companyName,
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('repencil_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('repencil_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};