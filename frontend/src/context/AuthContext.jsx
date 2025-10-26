import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../api';
import { useToast } from './ToastContext'; // Use the Toast context

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const showToast = useToast();
  const navigate = useNavigate();

  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false); // Add loading state

  // Update localStorage whenever token or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(data.user);
      setToken(data.token);
      showToast('Login successful! 🎉', 'success');
      navigate('/'); // Redirect to home after login
    } catch (error) {
      showToast(error.message || 'Login failed 😥', 'error');
      throw error; // Re-throw error for component handling if needed
    } finally {
      setLoading(false);
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    setLoading(true);
    try {
      const data = await apiCall('/auth/create-account', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      setUser(data.user);
      setToken(data.token);
      showToast('Account created successfully! Welcome ✨', 'success');
      navigate('/'); // Redirect to home after signup
    } catch (error) {
      showToast(error.message || 'Signup failed 😥', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Note: CartContext will clear itself via its useEffect dependency on isAuthenticated
    showToast('Logged out successfully 👋', 'info');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);