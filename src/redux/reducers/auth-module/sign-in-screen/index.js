// /*
//  * signInData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignInLoading: false,
  isSignInSuccess: false,
  isSignInFailure: false,
  signInData: {},
  errorMsg: "",
  token: "",
};
// Create the slice
export const signInDataSlice = createSlice({
  name: 'signInDataReducer',
  initialState,
  reducers: {
    // signInData Request
    signInDataRequest: (state, action) => {
      state.isSignInLoading = true;
      state.isSignInSuccess = false;
      state.isSignInFailure = false;
      state.errorMsg = null;
    },
    // signInData Success
    signInDataSuccess: (state, action) => {
      state.isSignInLoading = false;
      state.isSignInSuccess = true;
      state.isSignInFailure = false;
      state.errorMsg = null;
      state.signInData = action?.payload?.data;
      state.token = action?.payload?.token;
    },
    // signInData Failure
    signInDataFailure: (state, action) => {
      state.isSignInLoading = false;
      state.isSignInSuccess = false;
      state.isSignInFailure = true;
      state.errorMsg = action.payload.message;
    },
    signInDataReset: (state) => {
      state.isSignInLoading = false;
      state.isSignInSuccess = false;
      state.isSignInFailure = false;
      state.signInData = {};
      state.errorMsg = '';
      state.token = '';
    },

    setToken: (state, action) => {
      state.token = action?.payload?.token;
    },
  },
});

// Export actions
export const {setToken, signInDataRequest, signInDataSuccess, signInDataFailure, signInDataReset } = signInDataSlice.actions;

// Export reducer
export default signInDataSlice.reducer;
