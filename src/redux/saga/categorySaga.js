import types from '../types';
import { channel } from 'redux-saga';
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import Services from '../../services';
import { API_TASTY_CATEGORIES, API_TASTY_CATEGORIES_DELETE, API_TASTY_DISHES } from 'const/api';
import hooks from 'hooks';
import services from '../../services';

const { UseUploadImg, Notifications } = hooks;

function* getAllCategory() {
  try {
    const response = yield Services.get(API_TASTY_CATEGORIES);
    //console.log(response);
    yield put({ type: types.REQUEST_GET_CATE_SUCCESS, data: response.data })

  } catch (error) {
    yield put({ type: types.REQUEST_GET_CATE_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}



function* addCategory({ values }) {
  const { image } = values;
  try {

    const upload = yield UseUploadImg(image);
    const response = yield Services.post(API_TASTY_CATEGORIES, { ...values, image: upload });

    yield put({ type: types.REQUEST_ADD_CATE_SUCCESS, data: response.data })
    Notifications('success', 'Create successfully!', 'Success', 5000);
  } catch (error) {
    Notifications('error', error.toString(), '', 5000);
    yield put({ type: types.REQUEST_ADD_CATE_FAILED, error });
  }
}

function* editCategory({ values }) {
  const { id, name, image } = values;
  const cates = yield select(state => state.categoryReducer.cateList);

  try {
    const uploadImg = yield UseUploadImg(image);
    const response = yield Services.patch(API_TASTY_CATEGORIES + '/' + id, { ...values, updated_at: new Date(), image: uploadImg });
    console.log(response);

    if (response.statusText === "OK") {
      const newCate = [...cates];
      const updatingCate = newCate.find(x => x.id === id);

      const index = newCate.indexOf(updatingCate);
      newCate[index] = { ...values, image: uploadImg };
      yield getCateDetail({ values });
      yield put({ type: types.REQUEST_UPDATE_CATE_SUCCESS, data: newCate })
      Notifications('success', 'Update successfully!', 'Success', 5000);
    }

  } catch (error) {
    yield put({ type: types.REQUEST_UPDATE_CATE_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}


function* deleteCategory({ values }) {

  const { id } = values;
  const cates = yield select(state => state.categoryReducer.cateList);
  const foods = yield select(state => state.productReducer.productsList);

  const findProductsMatchCateId = foods.filter(x => x.cateId === id);
  //console.log('findProductsMatchCateId',findProductsMatchCateId);
  try {
    const response = yield Services.delete(API_TASTY_CATEGORIES_DELETE + id);

    if (findProductsMatchCateId) {
      findProductsMatchCateId.forEach(el => {
         Services.patch(API_TASTY_DISHES + el.id, { ...el, cateId: 4 });
      });
    }

    if (response.statusText === "OK") {
      const newCate = cates.filter(x => x.id !== id);
      yield put({ type: types.REQUEST_DELETE_CATE_SUCCESS, data: newCate })
      Notifications('success', 'Delete successfully!', 'Delete', 5000);
    }

  } catch (error) {
    yield put({ type: types.REQUEST_DELETE_CATE_FAILED, error });
    Notifications('error', error.toString(), '', 5000);
  }
}


function* getCateDetail({ values }) {
  const { id } = values;
  try {
    const respone = yield Services.get(API_TASTY_CATEGORIES + '/' + id);
    console.log(respone);
    if (respone.statusText === "OK") {
      yield put({ type: types.REQUEST_GET_CATE_DETAIL_SUCCESS, data: respone.data })
      Notifications('info', 'Getting successfully!', `Cate: ${id}`, 1000);
    }

  } catch (error) {
    yield put({ type: types.REQUEST_GET_CATE_DETAIL_FAILED, error });
    Notifications('error', error.toString(), '', 5000);
  }

}


export default function* () {
  yield takeEvery(types.REQUEST_GET_CATE, getAllCategory);
  yield takeLatest(types.REQUEST_ADD_CATE, addCategory);
  yield takeLatest(types.REQUEST_UPDATE_CATE, editCategory);
  yield takeLatest(types.REQUEST_DELETE_CATE, deleteCategory);
  yield takeLatest(types.REQUEST_GET_CATE_DETAIL, getCateDetail);
}
