// /*
//  * forgotPasswordData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isForgotPasswordLoading: false,
  isForgotPasswordSuccess: false,
  isForgotPasswordFailure: false,
  forgotPasswordData: {},
  errorMsg: "",
};

// Create the slice
export const forgotPasswordDataSlice = createSlice({
  name: 'forgotPasswordDataReducer',
  initialState,
  reducers: {
    // forgotPasswordData Request
    forgotPasswordDataRequest: (state, action) => {
      state.isForgotPasswordLoading = true;
      state.isForgotPasswordSuccess = false;
      state.isForgotPasswordFailure = false;
      state.errorMsg = null;
    },
    // forgotPasswordData Success
    forgotPasswordDataSuccess: (state, action) => {
      state.isForgotPasswordLoading = false;
      state.isForgotPasswordSuccess = true;
      state.isForgotPasswordFailure = false;
      state.errorMsg = null;
      state.forgotPasswordData = action?.payload?.data;
    },
    // forgotPasswordData Failure
    forgotPasswordDataFailure: (state, action) => {
      state.isForgotPasswordLoading = false;
      state.isForgotPasswordSuccess = false;
      state.isForgotPasswordFailure = true;
      state.errorMsg = action.payload.message;
    },
    forgotPasswordDataReset: (state) => {
      state.isForgotPasswordLoading = false;
      state.isForgotPasswordSuccess = false;
      state.isForgotPasswordFailure = false;
      state.forgotPasswordData = {};
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { 
  forgotPasswordDataRequest, 
  forgotPasswordDataSuccess, 
  forgotPasswordDataFailure, 
  forgotPasswordDataReset 
} = forgotPasswordDataSlice.actions;

// Export reducer
export default forgotPasswordDataSlice.reducer;

