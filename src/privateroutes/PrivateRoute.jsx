import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but unauthorized
    return <Navigate to={`/${user.role}`} />;
  }

  // Authorized
  return <Outlet />;
};

export default PrivateRoute;
