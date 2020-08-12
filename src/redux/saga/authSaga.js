import types from '../types';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';


function* loginAction({ values }) {
  const { username, password } = values;
  
  localStorage.setItem("username", username);

  yield put({ type: types.REQUEST_LOGIN_SUCCESS, username });

}

export default function* () {
  yield takeEvery(types.REQUEST_LOGIN, loginAction);
}
