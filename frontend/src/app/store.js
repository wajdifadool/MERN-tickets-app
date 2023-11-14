import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import TicketReducer from '../features/tickets/TicketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: TicketReducer,
  },
});
