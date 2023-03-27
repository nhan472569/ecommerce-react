import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    error: [],
    success: [],
  },
  reducers: {
    push(state, detail) {
      state[detail.payload.type].push(detail.payload.message);
      if (Array.isArray(detail.payload.message)) {
        state[detail.payload.type] = state[detail.payload.type].flatMap(
          message => message
        );
      }
    },
    remove(state, detail) {
      setTimeout(() => {
        state[detail.payload.type].splice(detail.payload.index, 1);
      }, 0);
    },
    // pushSuccess(state, detail) {
    //   state.successes.push(detail.payload);
    //   if (Array.isArray(detail.payload)) {
    //     state.successes = state.successes.flatMap(success => success);
    //   }
    // },
    // removeSuccess(state, index) {
    //   setTimeout(() => {
    //     state.successes.splice(index.payload, 1);
    //   }, 0);
    // },
  },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
