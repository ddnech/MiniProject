import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchBarValue: '',
  selectedCategory: null,
  sortOrder: 'DESC',
};

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchBarValue: (state, action) => {
      state.searchBarValue = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setSearchBarValue, setSelectedCategory, setSortOrder } = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
