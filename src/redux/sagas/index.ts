import { all } from 'redux-saga/effects';
import { watchProductCategoriesData } from './product-categories'
import { watchCategoriesProductListDataData } from './categories-products-list';
import { watchGetProductsListData } from './get-products-list';


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchProductCategoriesData(),
    watchCategoriesProductListDataData(),
    watchGetProductsListData()
  ]);
}
