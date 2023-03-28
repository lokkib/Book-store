import { configureStore } from '@reduxjs/toolkit'
import filteringReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './api/itemsApi'
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: {filterInput: filteringReducer, cart: cartReducer, productReducer},
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch