import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { API_TASTY_DISHES, API_TASTY_DISHES_DELETE, API_TASTY_DISHES_UPDATE, API_TASTY_DISHES_CATE } from 'const/api';
import Services from 'services';
import types from '../types';
import hooks from 'hooks';


const { UseUploadImg, Notifications } = hooks;

function* getAllProduct() {
  //const foods = yield select(state => state.productReducer.productsList);
  try {
    const response = yield Services.get(API_TASTY_DISHES);
    if (response.statusText === "OK") {
      yield put({ type: types.REQUEST_GET_PD_SUCCESS, data: response.data });
    }
  } catch (error) {
    yield put({ type: types.REQUEST_GET_PD_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}

function* getProductDetail({ id }) {
  try {
    const response = yield Services.get(API_TASTY_DISHES + id);
    if (response.statusText === "OK") {
      yield put({ type: types.REQUEST_GET_PD_DETAIL_SUCCESS, data: response.data })
    }
  } catch (error) {
    yield put({ type: types.REQUEST_GET_PD_DETAIL_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}

function* deleteProduct({ food }) {
  const foods = yield select(state => state.productReducer.productsList);
  const { id } = food;
  try {
    // console.log(API_TASTY_DISHES_DELETE + id);
    const response = yield Services.delete(API_TASTY_DISHES_DELETE + id);
    console.log(response);

    if (response.statusText === "OK") {
      const newFoods = foods.filter(x => x.id !== id);
      yield put({ type: types.REQUEST_DELETE_PD_SUCCESS, newFoods })
    }
  }
  catch (error) {
    yield put({ type: types.REQUEST_DELETE_PD_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}

function* editProduct({ food }) {
  const { id, name, image } = food;

  const foods = yield select(state => state.productReducer.productsList);
  const cates = yield select(state => state.categoryReducer.cateList);

  try {

    const uploadImg = yield UseUploadImg(image);
    const response = yield Services.patch(API_TASTY_DISHES_UPDATE + id, { ...food, updated_at: new Date(), image: uploadImg });


    if (response.statusText === "OK") {
      const newFoods = [...foods];
      const updatingFood = newFoods.find(x => x.id === food.id);

      const index = newFoods.indexOf(updatingFood);
      newFoods[index] = { ...food, image: uploadImg };

      yield put({ type: types.REQUEST_UPDATE_PD_SUCCESS, newFoods });
      Notifications('success', 'Update Successfully', 'Update', 2000);
    }

  } catch (error) {
    yield put({ type: types.REQUEST_UPDATE_PD_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}

function* addProduct({ food }) {
  try {
    const uploadImg = yield UseUploadImg(food.image);
    const response = yield Services.post(API_TASTY_DISHES, { ...food, created_at: new Date(), image: uploadImg });
    console.log(response);
    if (response.statusText === "Created") {
      const newFoods = { ...response.data };
      yield put({ type: types.REQUEST_ADD_PD_SUCCESS, newFoods });
      Notifications('success', 'Adding Successfully', 'Add', 2000);
    }

  } catch (error) {
    yield put({ type: types.REQUEST_ADD_PD_FAILED, error });
    Notifications('error', error.toString(), '', 5000);
  }

}

function* searchPD({ value }) {
  //console.log('search_Query: ', value);
  const foods = yield select(state => state.productReducer.productsList);
  const filterFoods = foods.filter(x => x.name.toLowerCase().includes(value.toLowerCase().trim()));
  // console.log(filterFoods);
  yield getAllProduct();
  yield put({ type: types.REQUEST_SEARCH_PD_SUCCESS, filterFoods });
}

function* getProductByCateId({ values }) {
  try {
    const productList = yield select(state => state.productReducer.productsList);

    const response = yield Services.get(API_TASTY_DISHES_CATE + values.id);

    if (response.statusText === "OK") {
      const newProductList = productList.filter(x => x.cateId === values.id);
      yield put({ type: types.REQUEST_GET_PD_BY_CATE_SUCCESS, data: newProductList });
    }

  } catch (error) {
    yield put({ type: types.REQUEST_GET_PD_BY_CATE_FAILED, error });
    Notifications('error', error.toString(), '', 5000);
  }
}


function* filterProduct(data) {

  const { action, name } = data;
  const foods = yield select(state => state.productReducer.productsList);
  // const newFoods = [...foods];

  let sortStudents;
  try {
    //console.log(action);
    if (name === "pricefilter") {
      switch (action) {
        case "desc":
          sortStudents = foods.sort((a, b) => ( b.price - a.price ));
          yield put({ type: types.REQUEST_FILTER_PD_SUCCESS, data: sortStudents });
          break;

        case "asc":
          sortStudents = foods.sort((a, b) => a.price - b.price )
          yield put({ type: types.REQUEST_FILTER_PD_SUCCESS, data: sortStudents });
          break
        default:
          yield getAllProduct();
          break;
      }
    }
    if (name === "namefilter") {
      switch (action) {
        case "desc":
          sortStudents = foods.sort((a, b) => (a.name > b.name) ? 1 : -1);
          yield put({ type: types.REQUEST_FILTER_PD_SUCCESS, data: sortStudents });
          break;

        case "asc":
          sortStudents = foods.sort((a, b) => (a.name > b.name) ? -1 : 1)
          yield put({ type: types.REQUEST_FILTER_PD_SUCCESS, data: sortStudents });
          break
        default:
          yield getAllProduct();
          break;
      }
    }

  } catch (error) {
    put({ type: types.REQUEST_FILTER_PD_FAILED,error});
    Notifications('error', error.toString(), '', 5000);
  }
}

export default function* () {
  yield takeEvery(types.REQUEST_GET_PD, getAllProduct);
  yield takeLatest(types.REQUEST_DELETE_PD, deleteProduct)
  yield takeLatest(types.REQUEST_UPDATE_PD, editProduct)
  yield takeLatest(types.REQUEST_ADD_PD, addProduct);
  yield takeLatest(types.REQUEST_SEARCH_PD, searchPD);

  yield takeLatest(types.REQUEST_GET_PD_BY_CATE, getProductByCateId);
  yield takeLatest(types.REQUEST_GET_PD_DETAIL, getProductDetail);

  yield takeLatest(types.REQUEST_FILTER_PD, filterProduct);
}
