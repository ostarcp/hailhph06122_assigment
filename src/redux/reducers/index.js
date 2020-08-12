import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import postReducer from './postReducer';

export default combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  cartReducer,
  postReducer,
})