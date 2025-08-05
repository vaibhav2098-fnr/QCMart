import { combineReducers } from '@reduxjs/toolkit';
import productCategoriesDataReducer from './product-categories'
import cartReducer from './cart'
import commonReducer from './common'
import popularProductDataReducer from './most-popular-product'
import signInDataReducer from './auth-module/sign-in-screen'
import signUpDataReducer from './auth-module/sign-up-screen'
import otpDataReducer from './auth-module/otp-screen'
import categoriesProductListDataDataReducer from './categories-products-list'
import getProductsListDataReducer from './get-products-list'

const rootReducer = combineReducers({
  signInDataReducer: signInDataReducer,
  signUpDataReducer: signUpDataReducer,
  otpDataReducer: otpDataReducer,
  productCategoriesDataReducer: productCategoriesDataReducer,
  cartReducer: cartReducer,
  commonReducer: commonReducer,
  popularProductDataReducer: popularProductDataReducer,
  categoriesProductListDataDataReducer:categoriesProductListDataDataReducer,
  getProductsListDataReducer:getProductsListDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;