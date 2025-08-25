import { combineReducers } from '@reduxjs/toolkit';
import forgotPasswordDataReducer from './auth-module/forgot-password';
import otpDataReducer from './auth-module/otp-screen';
import signInDataReducer from './auth-module/sign-in-screen';
import signUpDataReducer from './auth-module/sign-up-screen';
import cartReducer from './cart';
import categoriesProductListDataDataReducer from './categories-products-list';
import changePasswordDataReducer from './change-password';
import commonReducer from './common';
import getProductsListDataReducer from './get-products-list';
import popularProductDataReducer from './most-popular-product';
import myOrdersDataReducer from './my-orders';
import productCategoriesDataReducer from './product-categories';
import profileDataReducer from './profile';

const rootReducer = combineReducers({
  signInDataReducer: signInDataReducer,
  signUpDataReducer: signUpDataReducer,
  otpDataReducer: otpDataReducer,
  forgotPasswordDataReducer: forgotPasswordDataReducer,
  productCategoriesDataReducer: productCategoriesDataReducer,
  cartReducer: cartReducer,
  commonReducer: commonReducer,
  popularProductDataReducer: popularProductDataReducer,
  categoriesProductListDataDataReducer:categoriesProductListDataDataReducer,
  getProductsListDataReducer:getProductsListDataReducer,
  profileDataReducer:profileDataReducer,
  changePasswordDataReducer:changePasswordDataReducer,
  myOrdersDataReducer:myOrdersDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;