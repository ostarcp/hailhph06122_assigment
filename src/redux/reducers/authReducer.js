import types from '../types';


const initialState = {
  isLogin: false,
  loginType: '',
  error: '',
};

export default (state = initialState, actions) => {
  switch(actions.type) {

    		case types.REQUEST_LOGIN:
          return {
            ...state,
            isLogin: false
          };
        case types.REQUEST_LOGIN_SUCCESS:
          return {
            ...state,
            isLogin: true,
            loginType: actions.username,
          };
    
        case types.REQUEST_LOGIN_FAILED:
          return {
            ...state,
            error: actions.error,
            isLogin: false
          };

      default:
        return state;
  }
};
