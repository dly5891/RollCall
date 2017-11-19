import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleWare } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';

const initialState = {};
const enhancers = [];
const middleware = [
  thunk
];

if (process.env.NODE_ENV === 'development'){
  const devToolsExtension = window.devToolsExtension;

  if(typeof devToolsExtension === 'function'){
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;