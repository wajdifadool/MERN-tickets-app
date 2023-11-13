import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UseSelector } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');

    // console.log('logoutcleled ');
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">Support Desk</Link>
        </div>
        <ul>
          {/*  */}
          {user ? (
            <li>
              <button
                //
                onClick={logoutUser}
                className="btn">
                <FaSignOutAlt /> Logout
              </button>
            </li>
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
    </div>
  );
}

export default Header;
