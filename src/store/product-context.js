import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    books: [],
    itemsPerPage: 8,
    currentPage: 1,
    count: 0,
  },
  reducers: {
    fill(state, books) {
      state.books = books.payload;
    },
    setCount(state, count) {
      state.count = count.payload;
    },
    setPage(state, page) {
      state.currentPage = page.payload;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
