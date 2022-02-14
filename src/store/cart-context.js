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
    decreaseQuantity(state, action) {
      const { _id } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== _id);
        }
        state.total -= item.price;
      }
    },
    increaseQuantity(state, action) {
      const { _id } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity += 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item._id !== _id);
        }
        state.total += item.price;
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
