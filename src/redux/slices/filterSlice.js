import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryID: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryID: (state, action) => {
      state.categoryID = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSorting: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryID = Number(action.payload.categoryID)
    }
  },
});

export const { setCategoryID, setSorting, setPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
