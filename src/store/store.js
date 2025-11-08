import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import healthReducer from './slices/healthSlice';
import { api } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});