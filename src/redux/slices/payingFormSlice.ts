import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

const initialState = {
  payingForm: false,
  successNotification: false,
}

export const payingFormSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openPayingForm: (state, action) => {
      state.payingForm = action.payload
    },
    closePayingForm: (state, action) => {
      state.payingForm = action.payload
    },
    showSuccessNotification: (state, action) => {
      state.successNotification = action.payload
    },
    hideSuccessNotification: (state, action) => {
      state.successNotification = action.payload
    },
  },
})

export const cartSelector = (state: RootState) => state.cart

export const {
  openPayingForm,
  closePayingForm,
  showSuccessNotification,
  hideSuccessNotification,
} = payingFormSlice.actions

export default payingFormSlice.reducer
