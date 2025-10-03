import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

// UI

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }
  // Outlet will let us go to our private Route (  what  is ever is nested in the App.js under the private Route )
  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
