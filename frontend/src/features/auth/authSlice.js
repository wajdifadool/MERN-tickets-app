import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './autService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  // Builder in the extraReducers will allow us to add cases
  extraReducers: (builder) => {
    // @TODO:
    // handle the actions for each case
    builder
      .addCase(register.pending, (state) => {
        // so basicly when the register function is pending
        // we can minipulate  the state objecct ,
        // in our case we we set isloadingt true
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        // we get the payload in the fulfilled state
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // we get the payload in the fulfilled state
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.user = null
        // we get the payload in the rejected state
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(login.pending, (state) => {
        // so basicly when the login function is pending
        // we can minipulate  the state objecct ,
        // in our case we we set isloadingt true
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        // we get the payload in the fulfilled state
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // we get the payload in the fulfilled state
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        // we get the payload in the rejected state
        state.message = action.payload
      })
  },
})

// just a fuction so we can use asyncronis data
// this function will be dispatched from the Register.jsx
/**
 * @desc Register a user and it will be dispatched from Register.jsx
 */
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // console.log(user)
    // TODO: we will call the backend from here
    try {
      return await authService.register(user)
    } catch (error) {
      console.log('authSlice.jsx::register(),error', error.message)

      const message =
        (error.response && error.response.data, error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// createAsyncThunk is just a fuction so we can use asyncronis data
// this function will be dispatched from the Login.jsx
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
  // TODO: we will call the backend from here

  // TODO: we will call the backend from here
  try {
    return await authService.login(user)
  } catch (error) {
    console.log('authSlice.jsx::register(),error', error.message)

    const message =
      (error.response && error.response.data, error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// logout USer
export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('logout has been called')
  await authService.logout()

  //
})

// each time we create an action in  the reducers we have to export it
export const { reset } = authSlice.actions
export default authSlice.reducer
