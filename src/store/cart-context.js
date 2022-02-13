import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem(state, action) {
      const { id, name, price, quantity, imageUrl } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          price,
          imageUrl,
          quantity: 1,
        });
      }
      state.total += price * quantity;
    },
    removeItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
        state.total -= item.price * quantity;
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
