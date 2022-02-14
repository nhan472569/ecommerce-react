import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user.payload;
      localStorage.setItem('userID', user.payload._id);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem('userID');
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
