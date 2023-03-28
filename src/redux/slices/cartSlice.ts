import { createSlice } from "@reduxjs/toolkit";
import { CartSliceState } from "../../@types/slices/CartSliceState";
import { RootState } from "../store";

const initialState: CartSliceState = {
  items:[],
  totalPrice: 0
 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
 
	addItem: (state, action) => {
		const findItem = state.items.find(el => el.id === action.payload.id);

		if (findItem) {
			findItem.count++
		}
		else {
			state.items.push({...action.payload, count: 1, price: action.payload.price});
		}
		state.totalPrice = state.items.reduce((ac, el) => {
				ac += el.count * el.price
				return ac
			},0)
	  },
	removeItem: (state, action) => {
		
			state.items = state.items.filter(el => el.id !== action.payload)
			state.totalPrice = state.items.reduce((ac, el) => {
				ac += el.count * el.price
				return ac
			},0)
	  },
	  minusItem: (state, action) => {
		const [id] = action.payload
		const findItem = state.items.find(el => el.id === id);
		console.log(findItem)
			if(findItem) {
				findItem.count--
			}
			
			state.totalPrice = state.items.reduce((ac, el) => {
				ac += el.count * el.price
				return ac
			},0)
			
	  },
	  clearItems: (state) => {
		state.items = [];
		state.totalPrice = 0
	  },
  },
});

export const cartSelector = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;