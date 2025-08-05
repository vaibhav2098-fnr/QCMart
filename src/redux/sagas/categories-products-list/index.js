import { call, put, takeEvery } from 'redux-saga/effects';
import { apiCall } from '../../../utils/helper/apiHelper/apiCall';
import { isEmptyObj } from '../../../utils/helper';
import { CATEGORIES_PRODUCTS_LIST } from '../../../utils/constants';
import { categoriesProductListDataDataFailure, categoriesProductListDataDataRequest, categoriesProductListDataDataSuccess } from '../../reducers/categories-products-list';

export function fetchCategoriesProductListDataData(action) {
  const endPoints = CATEGORIES_PRODUCTS_LIST.replace('ID', action?.payload?.id);
  return apiCall({
    method: 'GET',
    endpoint: endPoints,
  });
}
export function* handleCategoriesProductListDataData(action) {
  let genericMsg = 'Something went wrong';
  try {
    const response = yield call(fetchCategoriesProductListDataData, action);
    const { message } = response || {};
    const _message = message ? message : genericMsg;

    if (!isEmptyObj(response)) {
      yield put(categoriesProductListDataDataSuccess(response));
    } else {
      yield put(ProductListDataFailure({ message: _message }));
    }
  } catch (error) {
    const _message = error?.message || genericMsg; 
    yield put(categoriesProductListDataDataFailure({ message: _message }));
  }
}

export function* watchCategoriesProductListDataData() {
  yield takeEvery(categoriesProductListDataDataRequest, handleCategoriesProductListDataData);
}
