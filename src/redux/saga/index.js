import { fork, all } from 'redux-saga/effects';
import authSaga from './authSaga';
import productSaga from './productSaga';
import categorySaga from './categorySaga';
import cartSaga from './cartSaga';
import postSaga from './postSaga';


export default function* rootSaga() {
  yield all([
      fork(productSaga),
      fork(categorySaga),
      fork(authSaga),
      fork(cartSaga),
      fork(postSaga),
  ]);
}