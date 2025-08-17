import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../Services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { userId, type, name, email }
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Set the user state with details from the token
        setUser({ 
          userId: decoded.userId, 
          type: decoded.type, 
          name: decoded.name, 
          email: decoded.email 
        });
        localStorage.setItem('token', token);
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res?.token) setToken(res.token);
    return res;
  };

  const register = async (payload) => {
    return await authService.register(payload);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};