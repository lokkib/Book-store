import { configureStore } from '@reduxjs/toolkit'
import filteringReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {filterInput: filteringReducer},
})