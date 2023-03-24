import { configureStore } from '@reduxjs/toolkit'
import filteringReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './api/itemsApi'

export const store = configureStore({
  reducer: {filterInput: filteringReducer, cart: cartReducer, productReducer},
})