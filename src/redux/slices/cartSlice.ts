import { createSlice } from '@reduxjs/toolkit'
import { CartSliceState } from '../../@types/slices/CartSliceState'
import { RootState } from '../store'

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const format = action.payload.format
      const formatType = Object.keys(format)[0]
      const price = format[formatType].price

      const findItem = state.items.find(
        (el) =>
          el.id === action.payload.id &&
          el.language === action.payload.language &&
          el.price === action.payload.price
      )
      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          formatType,
          price,
        })
      }

      state.totalPrice = state.items.reduce((ac, el) => {
        ac += el.count * el.price
        return ac
      }, 0)
    },
    removeItem: (state, action) => {
      const [id, price, language] = action.payload
      state.items = state.items.filter((el) => {
        return el.id !== id || el.price !== price || el.language !== language
      })
      state.totalPrice = state.items.reduce((ac, el) => {
        ac += el.count * el.price
        return ac
      }, 0)
    },
    minusItem: (state, action) => {
      const [id, price, language] = action.payload
      const findItem = state.items.find(
        (el) => el.id === id && el.price === price && el.language === language
      )
      if (findItem) {
        findItem.count -= 1
      }

      state.totalPrice = state.items.reduce((ac, el) => {
        ac += el.count * el.price
        return ac
      }, 0)
    },
    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const cartSelector = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
