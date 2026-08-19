import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('sr_token');
    localStorage.removeItem('sr_admin');
    setAdmin(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('sr_token');
    const stored = localStorage.getItem('sr_admin');
    if (token && stored) {
      setAdmin(JSON.parse(stored));
      api
        .get('/auth/me')
        .then((res) => {
          setAdmin(res.data.data);
          localStorage.setItem('sr_admin', JSON.stringify(res.data.data));
        })
        .catch(() => logout());
    }
    setLoading(false);
  }, [logout]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, ...adminData } = res.data.data;
    localStorage.setItem('sr_token', token);
    localStorage.setItem('sr_admin', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
