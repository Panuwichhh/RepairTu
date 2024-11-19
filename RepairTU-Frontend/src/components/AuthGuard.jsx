// src/components/AuthGuard.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('accessToken'); // Check for token
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }
  
  return children; // Render the children (protected component) if token exists
};

export default AuthGuard;
