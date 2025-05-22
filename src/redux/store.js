import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
//import rootReducer from './reducers';
import authReducer from './reducers/authReducers';
import resultReducers from './reducers/resultReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    results: resultReducers
  });

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
