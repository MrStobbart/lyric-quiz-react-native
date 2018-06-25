import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer.js';


const middlewares = [
  reduxThunk
]

// Create store
export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
