import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducer will be run after the job is done
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.isSuccess =false   by default the object param = false
        // state.user = null;
        state.message = action.payload; // the response from the server
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.isSuccess =false   by default the object param = false
        state.user = null;
        state.message = action.payload; // the response from the server
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// this is just fuction so we can use asynchronize data
// will be dispacthed from the register.jsx page
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // console.log(user);
    try {
      return await authService.register(user);
    } catch (error) {
      console.log('authSlice.jsx::register(),error', error);
      // cosnt message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// will be dispacthed from the Login.jsx page
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);

  try {
    return await authService.login(user);
  } catch (error) {
    console.log('authSlice.jsx::login(),error', error);
    // cosnt message
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }

  //
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
