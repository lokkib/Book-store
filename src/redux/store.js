import { configureStore } from '@reduxjs/toolkit'
import filteringReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {filterInput: filteringReducer, cart: cartReducer},
})