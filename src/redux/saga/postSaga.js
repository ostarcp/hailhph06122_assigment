import types from '../types';
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import Services from 'services';
import { API_TASTY_POST } from 'const/api';
import hooks from 'hooks';

const { Notifications, UseUploadImg } = hooks;

function* getAllPost() {
  try {
    const respone = yield Services.get(API_TASTY_POST);
    yield put({ type: types.REQUEST_GET_POST_SUCCESS, data: respone.data });
  } catch (error) {
    yield put({ type: types.REQUEST_GET_POST_FAILED, error });
  }
}

function* getPostDetail(data) {

}

function* addPost({ post }) {
  try {
    const uploadImg = yield UseUploadImg(post.image);
    const respone = yield Services.post(API_TASTY_POST, { ...post, image: uploadImg, created_at: new Date() });
    yield put({ type: types.REQUEST_ADD_POST_SUCCESS, data: respone.data });
    Notifications('success', 'Adding Successfully', 'Add', 2000);
  } catch (error) {
    yield put({ type: types.REQUEST_ADD_POST_FAILED, error });
  }
}

function* editPost({ post }) {
  const posts = yield select(state => state.postReducer.postList);

  try {
    const uploadImg = yield UseUploadImg(post.image);
    const response = yield Services.patch(API_TASTY_POST + post.id, { ...post, updated_at: new Date(), image: uploadImg });


    if (response.statusText === "OK") {
      const newPosts = [...posts];
      const updatingPost = newPosts.find(x => x.id === post.id);

      const index = newPosts.indexOf(updatingPost);
      newPosts[index] = { ...post, image: uploadImg };

      yield put({ type: types.REQUEST_EDIT_POST_SUCCESS, data: newPosts });

      Notifications('success', 'Update Successfully', 'Update', 2000);

      yield getAllPost();
    }

  } catch (error) {
    yield put({ type: types.REQUEST_EDIT_POST_FAILED, error })
    Notifications('error', error.toString(), '', 5000);
  }
}


function* deletePost({ post }) {
  const posts = yield select(state => state.postReducer.postList);
  try {
    // console.log(API_TASTY_DISHES_DELETE + id);
    const response = yield Services.delete(API_TASTY_POST + post.id);
    // console.log(response);
    if (response.statusText === "OK") {
      const newPost = posts.filter(x => x.id !== post.id);
      yield put({ type: types.REQUEST_DELETE_POST_SUCCESS, data: newPost })
      Notifications('warning', 'Deleted Successfully', 'Delete', 2000);
    }
  }
  catch (error) {
    yield put({ type: types.REQUEST_DELETE_POST_FAILED, error })
  }
}


export default function* () {
  yield takeEvery(types.REQUEST_GET_POST, getAllPost);
  yield takeLatest(types.REQUEST_GET_DETAIL_POST, getPostDetail);
  yield takeLatest(types.REQUEST_ADD_POST, addPost);
  yield takeLatest(types.REQUEST_EDIT_POST, editPost);
  yield takeLatest(types.REQUEST_DELETE_POST, deletePost);
}
