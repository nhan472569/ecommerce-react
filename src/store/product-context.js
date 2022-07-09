import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: {},
    currentCategory: null,
  },
  reducers: {
    fillProduct(state, products) {
      const category = state.currentCategory;
      state.items[category] = products.payload.items;
    },
    setCategory(state, category) {
      state.currentCategory = category.payload;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
