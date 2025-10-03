import React from 'react'
import { FaSafari, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  // Log out the user
  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    // will call logout and rest in the AuthSlice
    navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support desk</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className="btn" onClick={onLogOut}>
                <FaSignOutAlt /> Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
