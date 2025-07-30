// /*
//  * productCategoriesData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProductCategoriesLoading: false,
  isProductCategoriesSuccess: false,
  isProductCategoriesFailure: false,
  productCategoriesData: [],
  errorMsg: "",
};
// Create the slice
export const productCategoriesDataSlice = createSlice({
  name: 'productCategoriesDataReducer',
  initialState,
  reducers: {
    // productCategoriesData Request
    productCategoriesDataRequest: (state, action) => {
      state.isProductCategoriesLoading = true;
      state.isProductCategoriesSuccess = false;
      state.isProductCategoriesFailure = false;
      state.errorMsg = null;
    },
    // productCategoriesData Success
    productCategoriesDataSuccess: (state, action) => {
      state.isProductCategoriesLoading = false;
      state.isProductCategoriesSuccess = true;
      state.isProductCategoriesFailure = false;
      state.errorMsg = null;
      state.productCategoriesData = action?.payload?.data;
    },
    // productCategoriesData Failure
    productCategoriesDataFailure: (state, action) => {
      state.isProductCategoriesLoading = false;
      state.isProductCategoriesSuccess = false;
      state.isProductCategoriesFailure = true;
      state.errorMsg = action.payload.message;
    },
    productCategoriesDataReset: (state) => {
      state.isProductCategoriesLoading = false;
      state.isProductCategoriesSuccess = false;
      state.isProductCategoriesFailure = false;
      state.productCategoriesData = [];
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { productCategoriesDataRequest, productCategoriesDataSuccess, productCategoriesDataFailure, productCategoriesDataReset } = productCategoriesDataSlice.actions;

// Export reducer
export default productCategoriesDataSlice.reducer;
