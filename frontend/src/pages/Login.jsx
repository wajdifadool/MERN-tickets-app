import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// for redux
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'

// UI
import Spinner from '../components/Spinner'

function Login() {
  // this is the part for redux

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // we can bring any state to our component using
  // the selector useSelector() Hook
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
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

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Sign in
          <p>Please Login to get Support</p>
        </h1>
      </section>

      <form onSubmit={onSubmit}>
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
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Login
