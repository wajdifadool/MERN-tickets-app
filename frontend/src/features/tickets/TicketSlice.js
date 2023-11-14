import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './TicketService';

// get user from local storage
// TODO:
const tickets = JSON.parse(localStorage.getItem('tickets'));
// my inital sate
const initialState = {
  tickets: tickets ? tickets : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  ticket: {},
};

export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    // the thunkAPI has on it method called get sate
    // we can get any state from any object usering the thunkAPi
    // this is with redux toolkit feture
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
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

export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    // the thunkAPI has on it method called get sate
    // we can get any state from any object usering the thunkAPi
    // this is with redux toolkit feture
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
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

export const getTicket = createAsyncThunk(
  'ticket/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
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

//   state.ticket = [];
//   state.isLoading = false;
//   state.isError = false;
//   state.isSuccess = false;
//   state.message = '';
export const TicketSlice = createSlice({
  name: 'TicketSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // add to the bulder here
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = TicketSlice.actions;
export default TicketSlice.reducer;
