import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const id = localStorage.getItem('_id');
    if (!id) {
        return <Navigate to={'/login'} replace />;
      }
    
      return children;
  };

export default ProtectedRoute;