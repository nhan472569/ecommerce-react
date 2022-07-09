import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './auth-context';
import CartReducer from './cart-context';
import productReducer from './product-context';

const store = configureStore({
  reducer: { auth: AuthReducer, cart: CartReducer, product: productReducer },
});

export default store;
