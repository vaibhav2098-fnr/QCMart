import { call, put, takeEvery } from 'redux-saga/effects';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { isEmptyObj } from '../../../utils/helper';
import { PROFILE_API } from '../../../utils/constants';
import { profileDataFailure, profileDataRequest, profileDataSuccess } from '../../reducers/profile';

export function fetchProfileData(action) {
  const formData = new FormData();
  formData.append("name", action?.payload?.name);
  formData.append("dob", action?.payload?.dob);
  formData.append("phone", action?.payload?.phone);

  return apiCall({
    method: 'POST',
    endpoint: PROFILE_API,
    token: action?.payload?.token,
    body: formData
  });
}
export function* handleProfileData(action) {
  let genericMsg = 'Something went wrong';
  try {
    const response = yield call(fetchProfileData, action);
    console.log("🚀 ~ handleProfileData ~ response:", response)
    const { message } = response || {};
    const _message = message ? message : genericMsg;

    if (!isEmptyObj(response)) {
      yield put(profileDataSuccess(response));
    } else {
      yield put(profileDataFailure({ message: _message }));
    }
  } catch (error) {
    const _message = error?.message || genericMsg;
    yield put(profileDataFailure({ message: _message }));
  }
}

export function* watchProfileData() {
  yield takeEvery(profileDataRequest, handleProfileData);
}
