// /*
//  * popularProductData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopularProductLoading: false,
  isPopularProductSuccess: false,
  isPopularProductFailure: false,
  popularProductData: [],
  errorMsg: "",
};
// Create the slice
export const popularProductDataSlice = createSlice({
  name: 'popularProductDataReducer',
  initialState,
  reducers: {
    // popularProductData Request
    popularProductDataRequest: (state, action) => {
      state.isPopularProductLoading = true;
      state.isPopularProductSuccess = false;
      state.isPopularProductFailure = false;
      state.errorMsg = null;
    },
    // popularProductData Success
    popularProductDataSuccess: (state, action) => {
      state.isPopularProductLoading = false;
      state.isPopularProductSuccess = true;
      state.isPopularProductFailure = false;
      state.errorMsg = null;
      state.popularProductData = action?.payload?.data;
    },
    // popularProductData Failure
    popularProductDataFailure: (state, action) => {
      state.isPopularProductLoading = false;
      state.isPopularProductSuccess = false;
      state.isPopularProductFailure = true;
      state.errorMsg = action.payload.message;
    },
    popularProductDataReset: (state) => {
      state.isPopularProductLoading = false;
      state.isPopularProductSuccess = false;
      state.isPopularProductFailure = false;
      state.popularProductData = [];
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { popularProductDataRequest, popularProductDataSuccess, popularProductDataFailure, popularProductDataReset } = popularProductDataSlice.actions;

// Export reducer
export default popularProductDataSlice.reducer;
