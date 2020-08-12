import types from '../types';


export const getAllCategory = () => {
  return {
    type: types.REQUEST_GET_CATE
  }
}

export const deleteCategory = (data) => {
  return {
    ...data,
    type: types.REQUEST_DELETE_CATE,
  }
}

export const editCategory = (data) => {
  return {
    ...data,
    type: types.REQUEST_UPDATE_CATE,
  }
}

export const addCategory = (data) => {
  return {
    ...data,
    type: types.REQUEST_ADD_CATE,
  }
}

export const getCateDetail = (data) => {
  return {
    ...data,
    type: types.REQUEST_GET_CATE_DETAIL
  }
}

