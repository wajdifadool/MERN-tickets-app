/*import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  // Outlet let us go to our private route depened were we call it, that is in our app.js
  // else redirect
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
*/
/**
 * WILL ADAMS FIX
 */
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

// NOTE: no need for useAuthStatus as it's a duplicate of Redux state and only
// used here in the PrivateRoute
// No need for an outlet as we are not using nested routing

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Spinner />;

  if (user) return children;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
