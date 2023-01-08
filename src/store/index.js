import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './auth-context';
import CartReducer from './cart-context';
import notificationReducer from './notification-context';
import productReducer from './product-context';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: CartReducer,
    product: productReducer,
    noti: notificationReducer,
  },
});

export default store;
