import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProductSliceState } from '../../@types/slices/ProductSliceState'
import { FetchProductArgs } from '../../@types/types/FetchProductArgs'
import { Product } from '../../@types/types/Product'

export const fetchProducts = createAsyncThunk(
  'product/fetchProductsStatus',
  async (params: FetchProductArgs) => {
    const { currentPage, categoryQuery, sorting, order } = params
    const { data } = await axios.get<Product[]>(
      `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sorting}&order=${order}`
    )
    return data as Product[]
  }
)

const initialState: ProductSliceState = {
  items: [],
  status: 'loading',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'access'
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error'
        state.items = []
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.items = []
      })
  },
})

export const { setItems } = productSlice.actions

export default productSlice.reducer
