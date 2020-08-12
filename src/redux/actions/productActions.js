import types from '../types';


export const getAllProduct = () => {
  return {
    type: types.REQUEST_GET_PD
  }
}

export const deleteProduct = (data) => {
  return {
    ...data,
    type: types.REQUEST_DELETE_PD,
  }
}

export const editProduct = (data) => {
  return {
    ...data,
    type: types.REQUEST_UPDATE_PD,
  }
}

export const addProduct = (data) => {
  return {
    ...data,
    type: types.REQUEST_ADD_PD,
  }
}

export const searchPD = (data) => {
  return {
    ...data,
    type: types.REQUEST_SEARCH_PD,
  }
}

export const getProductByCateId = (data) => {
  return {
    ...data,
    type: types.REQUEST_GET_PD_BY_CATE,
  }
}

export const getProductDetail = (data) => {
  return {
    ...data,
    type: types.REQUEST_GET_PD_DETAIL,
  }
}

export const filterProductAction = (data) => {
  return {
    ...data,
    type: types.REQUEST_FILTER_PD,
  }
}