import {configureStore, combineReducers, applyMiddlware} from 'redux';
import thunk from 'redux-thunk';
import useReducer from './reducers';

const rootReducer = combineReducers({userReducer});
export const Store = configureStore(rootReducer,applyMiddleware(thunk));
