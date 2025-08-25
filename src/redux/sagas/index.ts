import { all } from 'redux-saga/effects';
import { watchForgotPasswordData } from './auth-module/forgot-password-saga';
import { watchSignInData } from './auth-module/sign-in-saga';
import { watchSignUpData } from './auth-module/sign-up-saga';
import { watchCategoriesProductListDataData } from './categories-products-list';
import { watchChangePasswordData } from './change-password';
import { watchGetProductsListData } from './get-products-list';
import { myOrdersSaga } from './my-orders';
import { watchProductCategoriesData } from './product-categories';
import { watchProfileData } from './profile';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchProductCategoriesData(),
    watchCategoriesProductListDataData(),
    watchGetProductsListData(),
    watchSignInData(),
    watchSignUpData(),
    watchForgotPasswordData(),
    watchProfileData(),
    watchChangePasswordData(),
    myOrdersSaga()
  ]);
}
