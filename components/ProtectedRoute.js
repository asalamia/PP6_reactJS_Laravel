import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, user }) => {
  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the passed component
  return <Component />;
};

export default ProtectedRoute;
