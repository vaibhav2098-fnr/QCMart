import { combineReducers } from '@reduxjs/toolkit';
import productCategoriesDataReducer from './product-categories'


const rootReducer = combineReducers({
  productCategoriesDataReducer: productCategoriesDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;