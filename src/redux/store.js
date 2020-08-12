import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import createMiddlewareSaga from 'redux-saga';

import rootReducers from './reducers';
import rootSagas from './saga';
import { createLogger } from 'redux-logger';
// export default configureStore({
//   reducer: {
//     product: productReducer,
//   },
// });

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const sagaMiddleware = createMiddlewareSaga();
let middleware = [sagaMiddleware];

if (isDevelopment) {
  middleware = [...middleware, createLogger()];
}

const store = createStore(rootReducers, applyMiddleware(...middleware));
sagaMiddleware.run(rootSagas);


export default store;

