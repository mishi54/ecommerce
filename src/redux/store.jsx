import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import adminReducer from '../features/adminSlice'

export const store= configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
});
