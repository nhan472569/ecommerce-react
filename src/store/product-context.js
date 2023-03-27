import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    books: [],
    currentCategory: null,
    itemsPerPage: 8,
    count: 0,
  },
  reducers: {
    fill(state, books) {
      state.books = books.payload;
    },
    setCategory(state, category) {
      state.currentCategory = category.payload;
    },
    setCount(state, count) {
      state.count = count.payload;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
