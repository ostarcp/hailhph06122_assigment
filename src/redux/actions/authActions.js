import types from '../types';



export const loginAction = (data) => {
  return {
    ...data,
    type:types.REQUEST_LOGIN
  }
}