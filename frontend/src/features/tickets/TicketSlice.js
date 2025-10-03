// Redux stuff
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// just a fuction so we can use asyncronis data
// this function will be dispatched from the NewTicket.jsx
/**
 * @desc Create new Ticket , this is a protect Route
 */
export const createNewTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server

      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      console.log(error.message)

      const message =
        (error.response && error.response.data, error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// just a fuction so we can use asyncronis data
// this function will be dispatched from the NewTicket.jsx
/**
 * @desc get the user Tickets  , this is a protect Route
 */
// tickets/getAll is just  auniqe name
export const getUserTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server
      const userTickets = await ticketService.fetchUserTickets(token)
      //   console.log('ticketSlice.jsx :: getUserTickets() \n response == \n ')
      //   console.log(userTickets)
      return userTickets
    } catch (error) {
      console.log(error.message)

      const message =
        (error.response && error.response.data, error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User Ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server
      const userTicket = await ticketService.getTicket(ticketId, token)

      return userTicket
    } catch (error) {
      console.log(error.message)

      const message =
        (error.response && error.response.data, error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close Ticket by updating the status to "closed"
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server
      const userTicket = await ticketService.closeTicket(ticketId, token)

      return userTicket
    } catch (error) {
      console.log(error.message)

      const message =
        (error.response && error.response.data, error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

/**
 * -------------------------------------
 *              SLICE
 * -------------------------------------
 */

// create my Slice
export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    // so basicly reset fucntion takes the state and
    // changed to initialState so it just reset the state
    reset: (state) => initialState,
    updateTickets(state, action) {
      state.tickets = action.payload
    },
  },
  extraReducers: (builder) => {
    //  handle our cases
    builder
      .addCase(createNewTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createNewTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        /**
         * action.payload comes form the ccreateNewTieckt in the catch block
         * return thunkAPI.rejectWithValue(message) . "action.payload == message"
         */
        state.message = action.payload
      })

      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload.tickets
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false

        /**
         * action.payload comes form the ccreateNewTieckt in the catch block
         * return thunkAPI.rejectWithValue(message) . "action.payload == message"
         */
        state.message = action.payload
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      /// recall if its rejected , rejectWithMessagegget called
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        // Once the ticket closed in the backed,
        // make sure to update the cuurent data in the current session
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        )
      })
  },
})

export const { reset, updateTickets } = ticketSlice.actions
export default ticketSlice.reducer
