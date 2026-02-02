import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authStorage, initializeData, studentStorage, otpStorage } from '../utils/storage';
import type { Student } from '../types';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'principal' | 'teacher' | 'parent';
  studentIds?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  sendParentOTP: (email: string) => { success: boolean; otp?: string; error?: string };
  verifyParentOTP: (email: string, otp: string) => { success: boolean; students?: Student[]; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize data on first load
    initializeData();
    
    // Check for existing session
    const currentUser = authStorage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const result = authStorage.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Only registered staff can login.' };
  };

  const sendParentOTP = (email: string) => {
    // Check if email exists in any student record
    const students = studentStorage.getByParentEmail(email);
    if (students.length === 0) {
      return { success: false, error: 'This email is not registered as a parent email in our system.' };
    }
    
    // Generate and "send" OTP (in real app, this would send an email)
    const otp = otpStorage.generate(email);
    
    // For demo purposes, we return the OTP (in production, this would be sent via email)
    console.log(`OTP for ${email}: ${otp}`);
    
    return { success: true, otp }; // Remove otp from return in production
  };

  const verifyParentOTP = (email: string, otp: string) => {
    const isValid = otpStorage.verify(email, otp);
    if (!isValid) {
      return { success: false, error: 'Invalid or expired OTP. Please try again.' };
    }
    
    const result = authStorage.parentLogin(email);
    if (result.success && result.students) {
      const parentUser: User = {
        id: email,
        email,
        name: 'Parent',
        role: 'parent',
        studentIds: result.students.map(s => s.id),
      };
      setUser(parentUser);
      return { success: true, students: result.students };
    }
    
    return { success: false, error: 'Unable to verify. Please try again.' };
  };

  const logout = () => {
    authStorage.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, sendParentOTP, verifyParentOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
