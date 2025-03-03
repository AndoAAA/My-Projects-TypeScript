import { createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
    searchTerm: '',
    category: 0,
    sort: {
      name: 'популярности',
      sortProperty: SortPropertyEnum.RATING_DESC,
    },
  };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
