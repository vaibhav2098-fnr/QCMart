import { apiCall } from '@/src/utils/helper/apiHelper/apiCall';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ORDERS_API } from '../../../utils/constants';
import {
  loadMoreOrdersRequest,
  loadMoreOrdersSuccess,
  myOrdersDataFailure,
  myOrdersDataRequest,
  myOrdersDataSuccess
} from '../../reducers/my-orders';

function* fetchOrdersData(action) {
  try {
    const { token, page = 1 } = action.payload;
    const url = `${ORDERS_API}?page=${page}`;

    const response = yield call(apiCall, {
      endpoint: url,
      method: 'GET',
      token: token,
    });

    if (response.data && !response.data.error) {
      yield put(myOrdersDataSuccess(response.data));
    } else {
      yield put(myOrdersDataFailure(response.data?.message || 'Failed to fetch orders'));
    }
  } catch (error) {
    yield put(myOrdersDataFailure(error.message || 'Network error'));
  }
}

function* loadMoreOrdersData(action) {
  try {
    const { token, page } = action.payload;
    const url = `${ORDERS_API}?page=${page}`;

    const response = yield call(apiCall, {
      endpoint: url,
      method: 'GET',
      token: token,
    });

    if (response.data && !response.data.error) {
      yield put(loadMoreOrdersSuccess(response.data));
    } else {
      yield put(myOrdersDataFailure(response.data?.message || 'Failed to load more orders'));
    }
  } catch (error) {
    yield put(myOrdersDataFailure(error.message || 'Network error'));
  }
}

export function* myOrdersSaga() {
  yield takeLatest(myOrdersDataRequest.type, fetchOrdersData);
  yield takeLatest(loadMoreOrdersRequest.type, loadMoreOrdersData);
}
