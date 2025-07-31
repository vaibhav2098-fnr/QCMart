import { combineReducers } from '@reduxjs/toolkit';
import productCategoriesDataReducer from './product-categories'
import cartReducer from './cart'


const rootReducer = combineReducers({
  productCategoriesDataReducer: productCategoriesDataReducer,
  cartReducer: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;