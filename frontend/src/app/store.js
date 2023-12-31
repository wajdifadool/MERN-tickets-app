import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/TicketSlice';
import noteReducer from '../features/notes/noteSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    notes: noteReducer,
  },
});
