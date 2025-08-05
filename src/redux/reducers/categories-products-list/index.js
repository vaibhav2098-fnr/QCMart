// /*
//  * categoriesProductListDataData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCategoriesProductListDataLoading: false,
  isCategoriesProductListDataSuccess: false,
  isCategoriesProductListDataFailure: false,
  categoriesProductListDataData: {},
  errorMsg: "",
};
// Create the slice
export const categoriesProductListDataDataSlice = createSlice({
  name: 'categoriesProductListDataDataReducer',
  initialState,
  reducers: {
    // categoriesProductListDataData Request
    categoriesProductListDataDataRequest: (state, action) => {
      state.isCategoriesProductListDataLoading = true;
      state.isCategoriesProductListDataSuccess = false;
      state.isCategoriesProductListDataFailure = false;
      state.errorMsg = null;
    },
    // categoriesProductListDataData Success
    categoriesProductListDataDataSuccess: (state, action) => {
      state.isCategoriesProductListDataLoading = false;
      state.isCategoriesProductListDataSuccess = true;
      state.isCategoriesProductListDataFailure = false;
      state.errorMsg = null;
      state.categoriesProductListDataData = action?.payload;
    },
    // categoriesProductListDataData Failure
    categoriesProductListDataDataFailure: (state, action) => {
      state.isCategoriesProductListDataLoading = false;
      state.isCategoriesProductListDataSuccess = false;
      state.isCategoriesProductListDataFailure = true;
      state.errorMsg = action.payload.message;
    },
    categoriesProductListDataDataReset: (state) => {
      state.isCategoriesProductListDataLoading = false;
      state.isCategoriesProductListDataSuccess = false;
      state.isCategoriesProductListDataFailure = false;
      state.categoriesProductListDataData = {};
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { categoriesProductListDataDataRequest, categoriesProductListDataDataSuccess, categoriesProductListDataDataFailure, categoriesProductListDataDataReset } = categoriesProductListDataDataSlice.actions;

// Export reducer
export default categoriesProductListDataDataSlice.reducer;
