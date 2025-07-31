import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const profile = localStorage.getItem('profile');

  if (!profile) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
