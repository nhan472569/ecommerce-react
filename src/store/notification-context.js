import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    toasts: [],
  },
  reducers: {
    push(state, detail) {
      state.toasts.push(detail.payload);
    },
    pop(state) {
      state.toasts.shift();
    },
  },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
