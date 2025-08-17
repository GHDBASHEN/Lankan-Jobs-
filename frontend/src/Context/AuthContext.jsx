import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../Services/AuthService';
import resumeService from '../Services/ResumeService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { userId, type, name, email }
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const updateUser = async (decodedToken) => {
      let hasResume = false;
      if (decodedToken.type === 'Job Seeker') {
        try {
          const resumeStatus = await resumeService.checkResume();
          hasResume = resumeStatus.hasResume;
        } catch (error) {
          console.error("Failed to check resume status", error);
        }
      }
      setUser({
        userId: decodedToken.userId,
        type: decodedToken.type,
        name: decodedToken.name,
        email: decodedToken.email,
        hasResume
      });
    };

    if (token) {
      try {
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        updateUser(decoded);
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
    if (res?.token) {
      setToken(res.token);
    }
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