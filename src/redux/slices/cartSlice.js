import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:[],
  totalPrice: 0
 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
 
	addItem: (state, action) => {
		const findItem = state.items.find(el => el.id === action.payload.id);
		console.log(action.payload)
		if (findItem) {
			if((findItem.size === action.payload.size) && (findItem.type === action.payload.type)) {
				findItem.count++
			}
			else {
				state.items.push({...action.payload, count: 1, price: action.payload.price});
			}
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
	const	[id, type, size] = action.payload
	console.log(id, type, size)
			state.items = state.items.filter(el => el.id !== id && el.type !== type && el.size !== size

			

		)
			state.totalPrice = state.items.reduce((ac, el) => {
				ac += el.count * el.price
				return ac
			},0)
	  },
	  minusItem: (state, action) => {
		const [id, price] = action.payload
		const findItem = state.items.find(el => el.id === id);
		console.log(findItem)
			if(findItem) {
				findItem.count--
				if(findItem.count <= 0) {
					findItem.count = 0
				}
			}
			
			state.totalPrice = state.items.reduce((ac, el) => {
				ac += el.count * el.price
				return ac
			},0)
			
	  },
	  clearItems: (state, action) => {
		state.items = [];
		state.totalPrice = 0
	  },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;