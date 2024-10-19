import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, checkUserPermissions } from '../services/api';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  id: string | undefined;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, '_id'> & { password: string }) => Promise<void>;
  logout: () => void;
  checkPermission: (permission: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const response = await apiLogin({ email, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Innlogging mislyktes:', error);
      throw error;
    }
  };

  const registerHandler = async (userData: Omit<User, '_id'> & { password: string }) => {
    try {
      const response = await apiRegister(userData);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registrering mislyktes:', error);
      throw error;
    }
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    apiLogout();
  };

  const checkPermission = async (permission: string) => {
    console.log("user", user?.id);
    console.log("permission", permission);
    if(!user?.id) return false;
    try {
      const hasPermission = await checkUserPermissions(user?.id, permission);
      
      return hasPermission;
    } catch (error) {
      console.error('Feil ved sjekking av tillatelser:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login: loginHandler, 
      register: registerHandler, 
      logout: logoutHandler,
      checkPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth må brukes innenfor en AuthProvider');
  }
  return context;
};