import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem(state, action) {
      const { _id, name, price, quantity, image } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({
          _id,
          name,
          price,
          image,
          quantity,
        });
      }
      state.total += price * quantity;
    },
    removeItem(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== _id);
        }
        state.total -= item.price * quantity;
      }
    },
    deleteItem(state, action) {
      const { _id } = action.payload;
      state.items = state.items.filter(item => item._id !== _id);
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
