import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService, User as DataUser } from '../utils/dataService';
import { useNotification } from './NotificationContext';

export interface User extends Omit<DataUser, 'password'> {
  // Extends DataUser but excludes password for security
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
  const { addNotification } = useNotification();

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
      
      // Authenticate user using data service
      const authenticatedUser = await dataService.authenticateUser(email, password);
      
      if (authenticatedUser) {
        // Remove password from user object for security
        const { password: _, ...userData } = authenticatedUser;
        setUser(userData);
        localStorage.setItem('repencil_user', JSON.stringify(userData));
        
        addNotification({
          type: 'success',
          title: 'Login Successful',
          message: `Welcome back, ${userData.companyName || userData.email}!`,
          duration: 3000
        });
        
        return true;
      }
      
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        duration: 5000
      });
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      
      addNotification({
        type: 'error',
        title: 'Login Error',
        message: 'An error occurred during login. Please try again.',
        duration: 5000
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: 'manufacturer' | 'admin', companyName?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Create user using data service
      const newUser = await dataService.createUser({
        email,
        password,
        role,
        companyName
      });
      
      if (newUser) {
        // Remove password from user object for security
        const { password: _, ...userData } = newUser;
        setUser(userData);
        localStorage.setItem('repencil_user', JSON.stringify(userData));
        
        addNotification({
          type: 'success',
          title: 'Account Created',
          message: `Welcome to RePencil, ${userData.companyName || userData.email}! Your account has been created successfully.`,
          duration: 5000
        });
        
        return true;
      }
      
      addNotification({
        type: 'error',
        title: 'Signup Failed',
        message: 'Failed to create account. Please try again.',
        duration: 5000
      });
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      
      addNotification({
        type: 'error',
        title: 'Signup Error',
        message: error instanceof Error ? error.message : 'An error occurred during signup. Please try again.',
        duration: 5000
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    const currentUser = user;
    setUser(null);
    localStorage.removeItem('repencil_user');
    
    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: `Goodbye, ${currentUser?.companyName || currentUser?.email}! You have been logged out successfully.`,
      duration: 3000
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};