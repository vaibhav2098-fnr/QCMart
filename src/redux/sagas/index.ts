import { all } from 'redux-saga/effects';
import { watchProductCategoriesData } from './product-categories'
import { watchCategoriesProductListDataData } from './categories-products-list';
import { watchGetProductsListData } from './get-products-list';
import { watchSignInData } from './auth-module/sign-in-saga';
import { watchSignUpData } from './auth-module/sign-up-saga';
import { watchForgotPasswordData } from './auth-module/forgot-password-saga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchProductCategoriesData(),
    watchCategoriesProductListDataData(),
    watchGetProductsListData(),
    watchSignInData(),
    watchSignUpData(),
    watchForgotPasswordData()
  ]);
}
