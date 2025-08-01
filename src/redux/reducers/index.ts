import { combineReducers } from '@reduxjs/toolkit';
import productCategoriesDataReducer from './product-categories'
import cartReducer from './cart'
import commonReducer from './common'


const rootReducer = combineReducers({
  productCategoriesDataReducer: productCategoriesDataReducer,
  cartReducer: cartReducer,
  commonReducer: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;