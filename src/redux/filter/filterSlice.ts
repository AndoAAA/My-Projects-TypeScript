import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";


const initialState: FilterSliceState = {
    searchTerm: '',
    category: 0,
    sort: {
      sortProperty: "rating",
    },
  };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort.sortProperty = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
