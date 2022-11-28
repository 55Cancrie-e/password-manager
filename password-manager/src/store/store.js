import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import login from '../reducer/login.reducer';
import thunk from 'redux-thunk';
import list from '../reducer/list.reducer';

const rootReducer = combineReducers({
   login,
   list
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
