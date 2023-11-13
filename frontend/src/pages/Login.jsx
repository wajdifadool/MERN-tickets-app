import React from 'react';
import { useState } from 'react';

import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Hooks
// useSelectr: for stuff in the global state
// Dispatch our action such register functionality
import { useSelector, useDispatch } from 'react-redux';

// this funtion will get dispatched
import { login } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  // we can dispatch any function now
  const dispatch = useDispatch();

  // stuff from authSlice
  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // this is update the from data
  const onChange = (e) => {
    // console.log('OnChange');
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // for Submiting user Registar goes here
  const onSubmit = (e) => {
    e.preventDefault();

    // validation

    // create the User  Object from the fromData hook
    const userData = {
      email,
      password,
    };

    // dispapatch user Data
    dispatch(login(userData));
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Log in to get support</p>
      </section>
      <section className="from">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Email:"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password:"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
