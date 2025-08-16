import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpDataSuccess, signUpDataFailure } from '../../reducers/auth-module/sign-up-screen';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { SIGNUP_API } from '../../../utils/constants';
import { setToken } from '../../reducers/auth-module/sign-in-screen';

function* signUpDataSaga(action) {
  try {
    const response = yield call(apiCall, {
      method: 'POST',
      endpoint: SIGNUP_API,
      data: action.payload,
    });

    // Check if the response indicates success
    if (response.status === true) {
      yield put(signUpDataSuccess(response));
      yield put(setToken(response));
    } else {
      // Handle validation errors or other failures
      yield put(signUpDataFailure({
        message: response.message || 'Sign up failed',
        errors: response.errors || {}
      }));
    }
  } catch (error) {
    // Handle network errors or server errors
    if (error.errors) {
      // Validation errors from server
      yield put(signUpDataFailure({
        message: error.message || 'Validation failed',
        errors: error.errors
      }));
    } else {
      // Network or other errors
      yield put(signUpDataFailure({
        message: error.message || 'Something went wrong!',
        errors: {}
      }));
    }
  }
}

export function* watchSignUpData() {
  yield takeLatest('signUpDataReducer/signUpDataRequest', signUpDataSaga);
}
