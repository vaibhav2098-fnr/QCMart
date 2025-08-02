// /*
//  * otpData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOtpLoading: false,
  isOtpSuccess: false,
  isOtpFailure: false,
  otpData: {},
  errorMsg: "",
};
// Create the slice
export const otpDataSlice = createSlice({
  name: 'otpDataReducer',
  initialState,
  reducers: {
    // otpData Request
    otpDataRequest: (state, action) => {
      state.isOtpLoading = true;
      state.isOtpSuccess = false;
      state.isOtpFailure = false;
      state.errorMsg = null;
    },
    // otpData Success
    otpDataSuccess: (state, action) => {
      state.isOtpLoading = false;
      state.isOtpSuccess = true;
      state.isOtpFailure = false;
      state.errorMsg = null;
      state.otpData = action?.payload?.data;
    },
    // otpData Failure
    otpDataFailure: (state, action) => {
      state.isOtpLoading = false;
      state.isOtpSuccess = false;
      state.isOtpFailure = true;
      state.errorMsg = action.payload.message;
    },
    otpDataReset: (state) => {
      state.isOtpLoading = false;
      state.isOtpSuccess = false;
      state.isOtpFailure = false;
      state.otpData = {};
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { otpDataRequest, otpDataSuccess, otpDataFailure, otpDataReset } = otpDataSlice.actions;

// Export reducer
export default otpDataSlice.reducer;
