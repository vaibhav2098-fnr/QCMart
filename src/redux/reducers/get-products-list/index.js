// /*
//  * getProductsListData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGetProductsListLoading: false,
  isGetProductsListSuccess: false,
  isGetProductsListFailure: false,
  getProductsListData: {},
  errorMsg: "",
};
// Create the slice
export const getProductsListDataSlice = createSlice({
  name: 'getProductsListDataReducer',
  initialState,
  reducers: {
    // getProductsListData Request
    getProductsListDataRequest: (state, action) => {
      state.isGetProductsListLoading = true;
      state.isGetProductsListSuccess = false;
      state.isGetProductsListFailure = false;
      state.errorMsg = null;
    },
    // getProductsListData Success
    getProductsListDataSuccess: (state, action) => {
      state.isGetProductsListLoading = false;
      state.isGetProductsListSuccess = true;
      state.isGetProductsListFailure = false;
      state.errorMsg = null;
      state.getProductsListData = action?.payload;
    },
    // getProductsListData Failure
    getProductsListDataFailure: (state, action) => {
      state.isGetProductsListLoading = false;
      state.isGetProductsListSuccess = false;
      state.isGetProductsListFailure = true;
      state.errorMsg = action.payload.message;
    },
    getProductsListDataReset: (state) => {
      state.isGetProductsListLoading = false;
      state.isGetProductsListSuccess = false;
      state.isGetProductsListFailure = false;
      state.getProductsListData = {};
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { getProductsListDataRequest, getProductsListDataSuccess, getProductsListDataFailure, getProductsListDataReset } = getProductsListDataSlice.actions;

// Export reducer
export default getProductsListDataSlice.reducer;
