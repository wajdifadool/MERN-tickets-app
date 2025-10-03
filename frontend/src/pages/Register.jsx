import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
// for redux
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { name, email, password, passwordConfirm } = formData

  // we can dispatch any function now
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // we can bring any state to our component using
  // the selector useSelector() Hook
  // so basiclly  the data from authSLice.js will be fetched to here
  // Make Sure this is called before the useEffect
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // Redirect when Registerd
    else if (isSuccess || user) {
      // just go tho home page
      navigate('/')
    }
    // reset the auth state from the auth slice
    // we dont need the data any more
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    /**
     * We use the same onChange handler for name, email and password.
     * Using square bracket notation we can use a dynamic value [e.target.name] to set an object property,
     * so if the user changes email then e.target.name is 'email' and so we will set email: 'some@email.com'
     * If they change the password then e.target.name is 'password' and so we set password: '123456'
     * It may be worth you reading up on Object property accessors in JS, in particular square bracket
     * notation.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
     */
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      toast.error('Password do not match')
      return
    }
    const userData = {
      name,
      email,
      password,
    }

    /**
     * this will dispatch (call) the  imported register
     * function  from ../features/auth/authSlice'
     */
    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
          <p>Please create an account</p>
        </h1>
      </section>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            //
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            //
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            //
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            required
            placeholder="Confirm the password."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Register
