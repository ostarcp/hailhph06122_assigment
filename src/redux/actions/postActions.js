import types from '../types';


export const getAllPost = () => {
  return {
    type: types.REQUEST_GET_POST
  }
}

export const getPostDetail = () => {
  return {
    type: types.REQUEST_GET_DETAIL_POST
  }
}

export const deletePost = (data) => {
  return {
    ...data,
    type: types.REQUEST_DELETE_POST,
  }
}

export const editPost = (data) => {
  return {
    ...data,
    type: types.REQUEST_EDIT_POST,
  }
}

export const addPost = (data) => {
  return {
    ...data,
    type: types.REQUEST_ADD_POST,
  }
}

