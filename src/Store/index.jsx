import { configureStore } from '@reduxjs/toolkit';
import tokenAuthReducer from './Reducer';
import searchFilterReducer from './ReducerFilter';

const store = configureStore({
  reducer: {
    tokenAuth: tokenAuthReducer,
    searchFilter: searchFilterReducer,
  },
});

export default store;