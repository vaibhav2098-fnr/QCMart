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
    },
    // signUpData Success
    signUpDataSuccess: (state, action) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = true;
      state.isSignUpFailure = false;
      state.errorMsg = null;
      state.signUpData = action?.payload?.data;
    },
    // signUpData Failure
    signUpDataFailure: (state, action) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpFailure = true;
      state.errorMsg = action.payload.message;
    },
    signUpDataReset: (state) => {
      state.isSignUpLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpFailure = false;
      state.signUpData = {};
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { signUpDataRequest, signUpDataSuccess, signUpDataFailure, signUpDataReset } = signUpDataSlice.actions;

// Export reducer
export default signUpDataSlice.reducer;
