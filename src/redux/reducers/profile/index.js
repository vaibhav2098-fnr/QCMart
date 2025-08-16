// /*
//  * profileData Reducer
//  */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProfileLoading: false,
  isProfileSuccess: false,
  isProfileFailure: false,
  profileData: {
    profile: {
      name: "",
      dob: "",
      email: "",
      phone: "",
    }
  },
  errorMsg: "",
};

// Create the slice
export const profileDataSlice = createSlice({
  name: 'profileDataReducer',
  initialState,
  reducers: {
    // profileData Request
    profileDataRequest: (state, action) => {
      state.isProfileLoading = true;
      state.isProfileSuccess = false;
      state.isProfileFailure = false;
      state.errorMsg = null;
    },
    // profileData Success
    profileDataSuccess: (state, action) => {
      state.isProfileLoading = false;
      state.isProfileSuccess = true;
      state.isProfileFailure = false;
      state.errorMsg = null;
      state.profileData = action?.payload;
    },
    // profileData Failure
    profileDataFailure: (state, action) => {
      state.isProfileLoading = false;
      state.isProfileSuccess = false;
      state.isProfileFailure = true;
      state.errorMsg = action.payload.message;
    },
    profileDataReset: (state) => {
      state.isProfileLoading = false;
      state.isProfileSuccess = false;
      state.isProfileFailure = false;
      state.profileData = [];
      state.errorMsg = '';
    },
  },
});

// Export actions
export const { profileDataRequest, profileDataSuccess, profileDataFailure, profileDataReset } = profileDataSlice.actions;

// Export reducer
export default profileDataSlice.reducer;
