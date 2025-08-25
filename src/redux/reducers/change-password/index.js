// /*
//  * changePasswordData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isChangePasswordLoading: false,
  isChangePasswordSuccess: false,
  isChangePasswordFailure: false,
  changePasswordData: {
    message: ''
  },
  errorMsg: "",
};

// Create the slice
export const changePasswordDataSlice = createSlice({
  name: 'changePasswordDataReducer',
  initialState,
  reducers: {
    // changePasswordData Request
    changePasswordDataRequest: (state, action) => {
      state.isChangePasswordLoading = true;
      state.isChangePasswordSuccess = false;
      state.isChangePasswordFailure = false;
      state.errorMsg = null;
    },
    // changePasswordData Success
    changePasswordDataSuccess: (state, action) => {
      state.isChangePasswordLoading = false;
      state.isChangePasswordSuccess = true;
      state.isChangePasswordFailure = false;
      state.errorMsg = null;
      state.changePasswordData = action?.payload;
    },
    // changePasswordData Failure
    changePasswordDataFailure: (state, action) => {
      state.isChangePasswordLoading = false;
      state.isChangePasswordSuccess = false;
      state.isChangePasswordFailure = true;
      state.errorMsg = action.payload.message;
    },
    changePasswordDataReset: (state) => {
      state.isChangePasswordLoading = false;
      state.isChangePasswordSuccess = false;
      state.isChangePasswordFailure = false;
      state.changePasswordData = [];
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { changePasswordDataRequest, changePasswordDataSuccess, changePasswordDataFailure, changePasswordDataReset } = changePasswordDataSlice.actions;

// Export reducer
export default changePasswordDataSlice.reducer;
