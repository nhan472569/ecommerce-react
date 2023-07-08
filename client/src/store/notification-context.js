import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    push(state, data) {
      state.notifications.push(data.payload);

      if (Array.isArray(data.payload)) {
        state.notifications = state.notifications.flatMap(
          notification => notification
        );
      }
    },
    remove(state, id) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== id.payload
      );
    },
  },
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
