import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getProductsListDataFailure,
  getProductsListDataRequest,
  getProductsListDataSuccess,
} from '../../reducers/get-products-list';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { isEmptyObj } from '../../../utils/helper';
import { GET_PRODUCTS_LIST } from '../../../utils/constants';

export function fetchGetProductsListData(action) {
  return apiCall({
    method: 'GET',
    endpoint: GET_PRODUCTS_LIST,
  });
}
export function* handleGetProductsListData(action) {
  let genericMsg = 'Something went wrong';
  try {
    const response = yield call(fetchGetProductsListData, action);
    const { message } = response || {};
    const _message = message ? message : genericMsg;

    if (!isEmptyObj(response)) {
      yield put(getProductsListDataSuccess(response));
    } else {
      yield put(getProductsListDataFailure({ message: _message }));
    }
  } catch (error) {
    const _message = error?.message || genericMsg; 
    yield put(getProductsListDataFailure({ message: _message }));
  }
}

export function* watchGetProductsListData() {
  yield takeEvery(getProductsListDataRequest, handleGetProductsListData);
}
