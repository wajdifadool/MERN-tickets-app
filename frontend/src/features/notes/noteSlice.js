import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server
      const ticketNotes = await noteService.getNotes(ticketId, token)

      return ticketNotes
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

// Create A . ticket Note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    // TODO: we will call the backend from here
    try {
      // we nned the user JWT
      // we fetched it using the thunkAPI
      const token = thunkAPI.getState().auth.user.token

      // paas it along with the data to the server
      const ticketNote = await noteService.createNote(noteText, ticketId, token)
      return ticketNote
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

// SLICE

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      /// rcall if its rejected , rejectWithMessagegget called
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
  },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer //this is what we broght to store.js file
