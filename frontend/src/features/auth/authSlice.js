import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// this is just fuction so we can use asynchronize data
// will be dispacthed from the register.jsx page
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log(user);
  }
);

// will be dispacthed from the Login.jsx page
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);
});

export default authSlice.reducer;
