import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
	'product/fetchProductsStatus',
	async (params) => {
		const {currentPage,
			categoryQuery,
			sorting,
			order} = params;
		const {data} = await axios
		.get(
		  `https://63a5a154f8f3f6d4abfb73b9.mockapi.io/items?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sorting}&order=${order}`
		)
	  return data
	}
  )


const initialState = {
  items:[],
  status: 'loading'

};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
 
	setItems: (state, action) => {
		state.items = action.payload
	  },
	
  },
  extraReducers: (builder) => {
	builder
	.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'access'
		})
	.addCase(fetchProducts.rejected, (state, action) => {
			state.status = 'error';
			state.items = []
		
		})
		.addCase(fetchProducts.pending, (state, action) => {
			state.status = 'loading';
			state.items = []
		})
	
}});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;