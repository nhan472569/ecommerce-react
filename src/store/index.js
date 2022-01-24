import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

const store = configureStore({ reducer: authSlice.reducer });

export const authAction = authSlice.actions;
export default store;
