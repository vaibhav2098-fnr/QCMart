import { call, put, takeLatest } from 'redux-saga/effects';
import { signInDataSuccess, signInDataFailure } from '../../reducers/auth-module/sign-in-screen';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { LOGIN_API } from '../../../utils/constants';

function* signInDataSaga(action) {
  try {
    const response = yield call(apiCall, {
      method: 'POST',
      endpoint: LOGIN_API,
      data: action.payload,
    });

    if (response.success) {
      yield put(signInDataSuccess(response));
    } else {
      yield put(signInDataFailure({ message: response.message || 'Login failed' }));
    }
  } catch (error) {
    yield put(signInDataFailure({ message: error.message || 'Something went wrong!' }));
  }
}

export function* watchSignInData() {
  yield takeLatest('signInDataReducer/signInDataRequest', signInDataSaga);
}
