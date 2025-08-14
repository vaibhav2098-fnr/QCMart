import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpDataSuccess, signUpDataFailure } from '../../reducers/auth-module/sign-up-screen';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { SIGNUP_API } from '../../../utils/constants';

function* signUpDataSaga(action) {
  try {
    const response = yield call(apiCall, {
      method: 'POST',
      endpoint: SIGNUP_API,
      data: action.payload,
    });

    if (response.success) {
      yield put(signUpDataSuccess(response));
    } else {
      yield put(signUpDataFailure({ message: response.message || 'Sign up failed' }));
    }
  } catch (error) {
    yield put(signUpDataFailure({ message: error.message || 'Something went wrong!' }));
  }
}

export function* watchSignUpData() {
  yield takeLatest('signUpDataReducer/signUpDataRequest', signUpDataSaga);
}
