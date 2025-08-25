import { CHANGE_PASSWORD_API } from '@/src/utils/constants';
import { isEmptyObj } from '@/src/utils/helper';
import { apiCall } from '@/src/utils/helper/apiHelper/apiCall';
import { call, put, takeEvery } from 'redux-saga/effects';
import { changePasswordDataFailure, changePasswordDataRequest, changePasswordDataSuccess } from '../../reducers/change-password';

export function fetchChangePasswordData(action) {
  console.log("🚀 ~ fetchChangePasswordData ~ action:", action)
  const formData = new FormData();
  formData.append("old_password", action?.payload?.old_password);
  formData.append("new_password", action?.payload?.new_password);

  return apiCall({
    method: 'POST',
    endpoint: CHANGE_PASSWORD_API,
    token: action?.payload?.token,
    data: formData
  });
}
export function* handleChangePasswordData(action) {
  let genericMsg = 'Something went wrong';
  try {
    const response = yield call(fetchChangePasswordData, action);
    const { message,status } = response || {};
    const _message = message ? message : genericMsg;

    if (!isEmptyObj(response) && status === true) {
      yield put(changePasswordDataSuccess(response));
    } else {
      yield put(changePasswordDataFailure({ message: _message }));
    }
  } catch (error) {
    const _message = error?.message || genericMsg;
    yield put(changePasswordDataFailure({ message: _message }));
  }
}

export function* watchChangePasswordData() {
  yield takeEvery(changePasswordDataRequest, handleChangePasswordData);
}
