import types from '../types';
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import hooks from 'hooks';

const { Notifications } = hooks;

function* getCart() {
  const valueCart = localStorage.getItem("myCart");
  const gottedCart = JSON.parse(valueCart);
  if (!valueCart) {
    console.log('valueCart');
    yield put({ type: types.REQUEST_GET_CART_SUCCESS, data: [] });
  }
  else {
    yield put({ type: types.REQUEST_GET_CART_SUCCESS, data: gottedCart });
  }
}


function* setCart() {
  const cartListOri = yield select(state => state.cartReducer.shoppingCart);
  localStorage.setItem("myCart", JSON.stringify(cartListOri));
}


function* addTocart(data) {

  const cartListOri = yield select(state => state.cartReducer.shoppingCart);

  const { values } = data;
  const { count, productDetail } = values;
  const { id, name, cateId, image, price } = productDetail;

  try {
    if (count.quanity <= 0) {
      return false;
    }
    if (cartListOri.some(x => x.id === productDetail.id)) {
      yield editTocart({ values });
    }
    else {
      yield put({ type: types.REQUEST_ADD_CART_SUCCESS, data: { id, name, cateId, image, price, count: +count.quanity } });
      Notifications('success', 'You just added a dish :)', 'Success', 2000);
      yield setCart();
    }
  } catch (error) {
    yield put({ type: types.REQUEST_ADD_CART_FAILED, error })
  }
}


function* editTocart(data) {
  const cartListOri = yield select(state => state.cartReducer.shoppingCart);

  const { values } = data;
  const { count, productDetail } = values;
  const { id } = productDetail;
  try {
    const newCarlist = [...cartListOri];
    const updateCartItem = newCarlist.find(x => x.id === id);
    const index = newCarlist.indexOf(updateCartItem);

    newCarlist[index].count = newCarlist[index].count + count.quanity;

    if (newCarlist[index].count <= 0) {
      yield deleteTocart({ values: productDetail });
    }
    else {
      yield put({ type: types.REQUEST_EDIT_CART_SUCCESS, data: newCarlist });
      Notifications('info', 'Yeah buy more', 'Cart Update', 2000);
      yield setCart();
    }

  } catch (error) {
    yield put({ type: types.REQUEST_EDIT_CART_FAILED, error })
  }
}

function* upToCart({ values }) {
  const cartListOri = yield select(state => state.cartReducer.shoppingCart);
  try {
    const newCarlist = [...cartListOri];
    const updateCartItem = newCarlist.find(x => x.id === values.id);
    const index = newCarlist.indexOf(updateCartItem);

    newCarlist[index].count = newCarlist[index].count + 1;

    if (newCarlist[index].count <= 0) {
      yield deleteTocart({ values });
    }
    else {
      yield put({ type: types.REQUEST_EDIT_CART_SUCCESS, data: newCarlist });
      yield setCart();
    }
  } catch (error) {
    yield put({ type: types.REQUEST_EDIT_CART_FAILED, error })
  }
}

function* downToCart({ values }) {

  const cartListOri = yield select(state => state.cartReducer.shoppingCart);

  try {
    const newCarlist = [...cartListOri];
    const updateCartItem = newCarlist.find(x => x.id === values.id);
    const index = newCarlist.indexOf(updateCartItem);

    newCarlist[index].count = newCarlist[index].count - 1;

    if (newCarlist[index].count <= 0) {
      yield deleteTocart({ values });
    }
    else {
      yield put({ type: types.REQUEST_EDIT_CART_SUCCESS, data: newCarlist });
      yield setCart();
    }

  } catch (error) {
    yield put({ type: types.REQUEST_EDIT_CART_FAILED, error })
  }

}



function* deleteTocart(data) {
  const cartListOri = yield select(state => state.cartReducer.shoppingCart);
  const { values } = data;
  try {
    const newCarts = cartListOri.filter(x => x.id !== values.id);
    Notifications('warning', 'Dishes remove :(', ':X', 2000);
    yield put({ type: types.REQUEST_DELETE_CART_SUCCESS, data: newCarts });

    yield setCart();
  } catch (error) {
    yield put({ type: types.REQUEST_DELETE_CART_FAILED, error });
  }
}


function* deleteAllCart() {
  try {
    yield put({ type: types.REQUEST_DELETE_CART_ALL_SUCCESS, data: [] });
    Notifications('error', 'Clear All  (ง ͠° ͟ʖ ͡°)ง', 'R.I.P', 2000);
    yield setCart();
  } catch (error) {
    yield put({ type: types.REQUEST_DELETE_CART_ALL_FAILED, error });
  }
}


export default function* () {
  yield takeEvery(types.REQUEST_GET_CART, getCart);
  yield takeEvery(types.REQUEST_SET_CART, setCart);
  yield takeEvery(types.REQUEST_ADD_CART, addTocart);
  yield takeLatest(types.REQUEST_EDIT_CART, editTocart);
  yield takeLatest(types.REQUEST_DELETE_CART, deleteTocart);
  yield takeLatest(types.REQUEST_DELETE_CART_ALL, deleteAllCart);

  yield takeLatest(types.REQUEST_UP_CART, upToCart);
  yield takeLatest(types.REQUEST_DOWN_CART, downToCart);

  // yield takeLatest(types.REQUEST_DELETE_CART, addTocart);
}
