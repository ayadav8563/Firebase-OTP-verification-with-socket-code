import {utilsReducer} from './utils.slice';
import {authReducer} from './auth.slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
