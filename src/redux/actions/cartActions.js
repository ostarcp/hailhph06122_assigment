import types from '../types';

export const setTocart = () => {
  return {
    type: types.REQUEST_SET_CART,
  }
}

export const getTocart = () => {
  return {
    type: types.REQUEST_GET_CART,
  }
}


export const addTocart = (data) => {
  return {
    ...data,
    type: types.REQUEST_ADD_CART,
  }
}

export const downTocart = (data) => {
  return {
    ...data,
    type: types.REQUEST_DOWN_CART,
  }
}


export const upTocart = (data) => {
  return {
    ...data,
    type: types.REQUEST_UP_CART,
  }
}




export const editTocart = (data) => {
  return {
    ...data,
    type: types.REQUEST_EDIT_CART,
  }
}

export const deleteTocart = (data) => {
  return {
    ...data,
    type: types.REQUEST_DELETE_CART,
  }
}

export const deleteAllCart = () => {
  return {
    type: types.REQUEST_DELETE_CART_ALL,
  }
}

