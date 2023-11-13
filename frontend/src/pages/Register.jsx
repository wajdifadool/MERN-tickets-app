import React from 'react';
import { useState } from 'react';

import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Hooks
// useSelectr: for stuff in the global state
// Dispatch our action such register functionality
import { useSelector, useDispatch } from 'react-redux';

// this funtion will get dispatched
import { register } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = formData;

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
    // Make sure passwords matchs
    if (passwordConfirm !== password) {
      toast.error('Passwords do not match!');
      return;
    }

    // create the User  Object
    const userData = {
      name,
      email,
      password,
    };

    // dispapatch user Data
    dispatch(register(userData));
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register {user}
        </h1>
        <p>create an account</p>
      </section>
      <section className="from">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter name:"
              required
            />
          </div>

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
            <input
              className="form-control"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
              placeholder="Confirm password:"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
