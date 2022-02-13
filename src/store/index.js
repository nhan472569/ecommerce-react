import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './auth-context';
import CartReducer from './cart-context';

const store = configureStore({
  reducer: { auth: AuthReducer, cart: CartReducer },
});

export default store;
