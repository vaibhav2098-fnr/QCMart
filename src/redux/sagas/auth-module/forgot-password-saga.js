import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPasswordDataSuccess, forgotPasswordDataFailure } from '../../reducers/auth-module/forgot-password';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { FORGOT_PASSWORD_API } from '../../../utils/constants';

function* forgotPasswordDataSaga(action) {
  try {
    const response = yield call(apiCall, {
      method: 'POST',
      endpoint: FORGOT_PASSWORD_API,
      data: action?.payload,
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

