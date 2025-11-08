import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import healthReducer from './slices/healthSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
  },
});