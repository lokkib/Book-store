import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from './api/itemsApi'
import cartReducer from './slices/cartSlice'
import filteringReducer from './slices/filterSlice'
import payingFormReducer from './slices/payingFormSlice'

const rootReducer = combineReducers({
  filterInput: filteringReducer,
  cart: cartReducer,
  productReducer,
  payingFormReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filterInput', 'productReducer', 'payingFormReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
