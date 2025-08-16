// /*
//  * signUpData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignUpLoading: false,
  isSignUpSuccess: false,
  isSignUpFailure: false,
  signUpData: {},
  errorMsg: "",
  validationErrors: {},
};
// Create the slice
export const signUpDataSlice = createSlice({
  name: 'signUpDataReducer',
  initialState,
  reducers: {
    // signUpData Request
    signUpDataRequest: (state, action) => {
      state.isSignUpLoading = true;
      state.isSignUpSuccess = false;
      state.isSignUpFailure = false;
      state.errorMsg = null;
      state.validationErrors = {};
    },
    // signUpData Success
    signUpDataSuccess: (state, action) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = true;
      state.isSignUpFailure = false;
      state.errorMsg = null;
      state.validationErrors = {};
      state.signUpData = action?.payload?.data;
    },
    // signUpData Failure
    signUpDataFailure: (state, action) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpFailure = true;
      state.errorMsg = action.payload.message;
      state.validationErrors = action.payload.errors || {};
    },
    signUpDataReset: (state) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpFailure = false;
      state.signUpData = {};
      state.errorMsg = '';
      state.validationErrors = {};
    },
  },
});

// Export actions
export const { signUpDataRequest, signUpDataSuccess, signUpDataFailure, signUpDataReset } = signUpDataSlice.actions;

// Export reducer
export default signUpDataSlice.reducer;
