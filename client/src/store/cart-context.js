import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    putItems(state, { payload: cartData }) {
      state.items = cartData.data;
      state.total = cartData.totalAmount;
    },
    addItem(state, { payload: cartItem }) {
      state.items.push(cartItem);
      state.total += cartItem.book.price * cartItem.quantity;
    },
    updateQuantity(state, { payload: cartItem }) {
      const index = state.items.findIndex(item => item._id === cartItem._id);
      if (index >= 0) {
        state.items[index] = cartItem;
        state.total = state.items.reduce((total, current) => {
          return total + current.book.price * current.quantity;
        }, 0);
      }
    },
    deleteItem(state, { payload: cartItemId }) {
      state.items = state.items.filter(item => item._id !== cartItemId);
      state.total = state.items.reduce((total, current) => {
        return total + current.book.price * current.quantity;
      }, 0);
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
