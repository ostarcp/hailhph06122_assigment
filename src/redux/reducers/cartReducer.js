import types from '../types';



const initialState = {
  isGettingCart: false,
  isAddingCart: false,
  isDeletingCart: false,


  shoppingCart: [],

  error: ''
};

export default (state = initialState, actions) => {
  switch (actions.type) {


    case types.REQUEST_SET_CART:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_SET_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: actions.data,
        isRestoring: false
      };

    case types.REQUEST_SET_CART_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };


    case types.REQUEST_GET_CART:
      return {
        ...state,
        isGettingCart: true
      };
    case types.REQUEST_GET_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: actions.data,
        isGettingCart: false
      };

    case types.REQUEST_GET_CART_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingCart: false
      };

    case types.REQUEST_ADD_CART:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_ADD_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, actions.data],
        isRestoring: false
      };

    case types.REQUEST_ADD_CART_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };

    case types.REQUEST_EDIT_CART:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_EDIT_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: actions.data,
        isRestoring: false
      };

    case types.REQUEST_EDIT_CART_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };

    case types.REQUEST_DELETE_CART:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_DELETE_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: actions.data,
        isRestoring: false
      };

    case types.REQUEST_DELETE_CART_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };


    case types.REQUEST_DELETE_CART_ALL:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_DELETE_CART_ALL_SUCCESS:
      return {
        ...state,
        shoppingCart: actions.data,
        isRestoring: false
      };

    case types.REQUEST_DELETE_CART_ALL_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };
    default:
      return state;
  }
};
