import types from '../types';

const initialState = {
  isGettingPost: false,
  isAdding: false,
  isDeleting: false,
  isUpdating: false,

  postList: [],

  error: ''
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case types.REQUEST_GET_POST:
      return {
        ...state,
        isGettingPost: true
      };
    case types.REQUEST_GET_POST_SUCCESS:
      return {
        ...state,
        postList: actions.data,
        isGettingPost: false
      };

    case types.REQUEST_GET_POST_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingPost: false
      };


    case types.REQUEST_GET_DETAIL_POST:
      return {
        ...state,
        isRestoring: true
      };
    case types.REQUEST_GET_DETAIL_POST_SUCCESS:
      return {
        ...state,
        isRestoring: false
      };

    case types.REQUEST_GET_DETAIL_POST_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };

      
    case types.REQUEST_ADD_POST:
      return {
        ...state,
        isAdding: true
      };
    case types.REQUEST_ADD_POST_SUCCESS:
      return {
        ...state,
        postList: [...state.postList, actions.data],
        isAdding: false
      };

    case types.REQUEST_ADD_POST_FAILED:
      return {
        ...state,
        error: actions.error,
        isAdding: false
      };

    case types.REQUEST_EDIT_POST:
      return {
        ...state,
        isUpdating: true
      };
    case types.REQUEST_EDIT_POST_SUCCESS:
      return {
        ...state,
        postList: actions.data,
        isUpdating: false
      };

    case types.REQUEST_EDIT_POST_FAILED:
      return {
        ...state,
        error: actions.error,
        isUpdating: false
      };

    case types.REQUEST_DELETE_POST:
      return {
        ...state,
        isDeleting: true
      };
    case types.REQUEST_DELETE_POST_SUCCESS:
      return {
        ...state,
        postList: actions.data,
        isDeleting: false
      };

    case types.REQUEST_DELETE_POST_FAILED:
      return {
        ...state,
        error: actions.error,
        isDeleting: false
      };
    default:
      return state;
  }
};
