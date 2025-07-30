import { all } from 'redux-saga/effects';
import { watchProductCategoriesData } from './product-categories'


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchProductCategoriesData(),
  ]);
}
