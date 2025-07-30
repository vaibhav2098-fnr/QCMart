import { call, put, takeEvery } from 'redux-saga/effects';
import {
  productCategoriesDataFailure,
  productCategoriesDataRequest,
  productCategoriesDataSuccess,
} from '../../reducers/product-categories';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { isEmptyObj } from '../../../utils/helper';
import { PRODUCT_CATEGORIES } from '../../../utils/constants';

export function fetchProductCategoriesData(action) {
  return apiCall({
    method: 'GET',
    endpoint: PRODUCT_CATEGORIES,
  });
}
export function* handleProductCategoriesData(action) {
  let genericMsg = 'Something went wrong';
  try {
    const response = yield call(fetchProductCategoriesData, action);
    const { message } = response || {};
    const _message = message ? message : genericMsg;

    if (!isEmptyObj(response)) {
      yield put(productCategoriesDataSuccess({ data: response?.data }));
    } else {
      yield put(productCategoriesDataFailure({ message: _message }));
    }
  } catch (error) {
    const _message = error?.message || genericMsg; 
    yield put(productCategoriesDataFailure({ message: _message }));
  }
}

export function* watchProductCategoriesData() {
  yield takeEvery(productCategoriesDataRequest, handleProductCategoriesData);
}
