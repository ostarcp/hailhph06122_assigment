import types from '../types';


const initialState = {

  isGettingPD: false,
  isDeleting: false,
  isUpdating: false,
  isAdding: false,
  isSearching: false,
  isGettingPdByCate: false,
  isGettingPdDetail: false,


  productsList: [],
  productListByCateId: [],
  filterProduct: [],
  productDetail: {},

  error: '',
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    		case types.REQUEST_FILTER_PD:
          return {
            ...state,
            isGettingPD: true
          };
        case types.REQUEST_FILTER_PD_SUCCESS:
          return {
            ...state,
            filterProduct: actions.data,
            isGettingPD: false
          };
    
        case types.REQUEST_FILTER_PD_FAILED:
          return {
            ...state,
            error: actions.error,
            isGettingPD: false
          };

    case types.REQUEST_GET_PD:
      return {
        ...state,
        isGettingPD: true,
        filterProduct: null,
        productListByCateId: null,
      };
    case types.REQUEST_GET_PD_SUCCESS:
      return {
        ...state,
        //  filterProduct: [...state.productsList],
        productsList: actions.data,
        isGettingPD: false,
      };

    case types.REQUEST_GET_PD_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingPD: false,
      };



    case types.REQUEST_DELETE_PD:
      return {
        ...state,
        isDeleting: true,
        filterProduct: null,
      };
    case types.REQUEST_DELETE_PD_SUCCESS:
      return {
        ...state,
        productsList: actions.newFoods,
        //  filterProduct: actions.newFoods,
        isDeleting: false
      };

    case types.REQUEST_DELETE_PD_FAILED:
      return {
        ...state,
        error: actions.error,
        isRestoring: false
      };




    case types.REQUEST_UPDATE_PD:
      return {
        ...state,
        isUpdating: true,
        filterProduct: null,
      };
    case types.REQUEST_UPDATE_PD_SUCCESS:
      return {
        ...state,
        productsList: actions.newFoods,
        filterProduct: actions.newFoods,
        isUpdating: false
      };

    case types.REQUEST_UPDATE_PD_FAILED:
      return {
        ...state,
        error: actions.error,
        isUpdating: false
      };


    case types.REQUEST_ADD_PD:
      return {
        ...state,
        isAdding: true,
        filterProduct: null,
      };
    case types.REQUEST_ADD_PD_SUCCESS:
      return {
        ...state,
        productsList: [...state.productsList, actions.newFoods],
        isAdding: false,
      };

    case types.REQUEST_ADD_PD_FAILED:
      return {
        ...state,
        error: actions.error,
        isAdding: false
      };

    case types.REQUEST_SEARCH_PD:
      return {
        ...state,
        isSearching: true
      };
    case types.REQUEST_SEARCH_PD_SUCCESS:
      return {
        ...state,
        filterProduct: actions.filterFoods,
        isSearching: false
      };

    case types.REQUEST_SEARCH_PD_FAILED:
      return {
        ...state,
        error: actions.error,
        isSearching: false
      };


    case types.REQUEST_GET_PD_BY_CATE:
      return {
        ...state,
        isGettingPdByCate: true
      };
    case types.REQUEST_GET_PD_BY_CATE_SUCCESS:
      return {
        ...state,
        productListByCateId: actions.data,
        isGettingPdByCate: false
      };

    case types.REQUEST_GET_PD_BY_CATE_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingPdByCate: false
      };


    case types.REQUEST_GET_PD_DETAIL:
      return {
        ...state,
        isGettingPdDetail: true
      };
    case types.REQUEST_GET_PD_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: actions.data,
        isGettingPdDetail: false
      };

    case types.REQUEST_GET_PD_DETAIL_FAILED:
      return {
        ...state,
        error: actions.error,
        isGettingPdDetail: false
      };
    default:
      return state;
  }
};
