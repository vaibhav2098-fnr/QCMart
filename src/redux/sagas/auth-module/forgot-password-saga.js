import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPasswordDataSuccess, forgotPasswordDataFailure } from '../../reducers/auth-module/forgot-password';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { FORGOT_PASSWORD_API } from '../../../utils/constants';

function* forgotPasswordDataSaga(action) {
  try {
    // Create form data as per the curl request
    const formData = new FormData();
    formData.append('email', action.payload.email);

    const response = yield call(apiCall, {
      method: 'POST',
      endpoint: FORGOT_PASSWORD_API,
      data: formData,
      isMultipart: true,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.success) {
      yield put(forgotPasswordDataSuccess(response));
    } else {
      yield put(forgotPasswordDataFailure({ message: response.message || 'Password reset request failed' }));
    }
  } catch (error) {
    yield put(forgotPasswordDataFailure({ message: error.message || 'Something went wrong!' }));
  }
}

export function* watchForgotPasswordData() {
  yield takeLatest('forgotPasswordDataReducer/forgotPasswordDataRequest', forgotPasswordDataSaga);
}

