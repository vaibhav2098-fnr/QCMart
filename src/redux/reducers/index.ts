import { combineReducers } from '@reduxjs/toolkit';
import productCategoriesDataReducer from './product-categories'
import cartReducer from './cart'
import commonReducer from './common'
import popularProductDataReducer from './most-popular-product'
import signInDataReducer from './auth-module/sign-in-screen'
import signUpDataReducer from './auth-module/sign-up-screen'
import otpDataReducer from './auth-module/otp-screen'
import forgotPasswordDataReducer from './auth-module/forgot-password'
import categoriesProductListDataDataReducer from './categories-products-list'
import getProductsListDataReducer from './get-products-list'
import profileDataReducer from './profile'

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
  profileDataReducer:profileDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;