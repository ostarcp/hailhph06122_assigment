import types from '../types';

const initialState = {
  isGettingCate: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isGettingDetail: false,

  cateList: [],

  cateDetail: {},

  errorMesg: '',

};

export default (state = initialState, actions) => {
  switch (actions.type) {

    case types.REQUEST_GET_CATE:
      return {
        ...state,
        isGettingCate: true
      };
    case types.REQUEST_GET_CATE_SUCCESS:
      return {
        ...state,
        cateList: actions.data,
        isGettingCate: false
      };

    case types.REQUEST_GET_CATE_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingCate: false
      };

    case types.REQUEST_ADD_CATE:
      return {
        ...state,
        isAdding: true
      };
    case types.REQUEST_ADD_CATE_SUCCESS:
      return {
        ...state,
        cateList: [...state.cateList, actions.data],
        isAdding: false
      };

    case types.REQUEST_ADD_CATE_FAILED:
      return {
        ...state,
        error: actions.error,
        isAdding: false
      };


    case types.REQUEST_DELETE_CATE:
      return {
        ...state,
        isDeleting: true
      };
    case types.REQUEST_DELETE_CATE_SUCCESS:
      return {
        ...state,
        cateList: actions.data,
        isDeleting: false
      };

    case types.REQUEST_DELETE_CATE_FAILED:
      return {
        ...state,
        error: actions.error,
        isDeleting: false
      };

    case types.REQUEST_UPDATE_CATE:
      return {
        ...state,
        isUpdating: true
      };
    case types.REQUEST_UPDATE_CATE_SUCCESS:
      return {
        ...state,
        cateList: actions.data,
        isUpdating: false
      };

    case types.REQUEST_UPDATE_CATE_FAILED:
      return {
        ...state,
        error: actions.error,
        isUpdating: false
      };



    case types.REQUEST_GET_CATE_DETAIL:
      return {
        ...state,
        isGettingDetail: true
      };
    case types.REQUEST_GET_CATE_DETAIL_SUCCESS:
      return {
        ...state,
        cateDetail: actions.data,
        isGettingDetail: false
      };

    case types.REQUEST_GET_CATE_DETAIL_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingDetail: false
      };


    default:
      return state;
  }
};
