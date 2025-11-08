import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null;
      localStorage.removeItem('token');
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload;
      }
    );
  },
});

export const { logout, setCurrentUser } = userSlice.actions;

// Export selectors
export const selectCurrentUser = state => state.user.currentUser;

export default userSlice.reducer;
