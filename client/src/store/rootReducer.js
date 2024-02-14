import { combineReducers } from 'redux';
import { authSlice } from './auth/authSlice';

const rootReducer = combineReducers({
  roles:authSlice.reducer
});

export default rootReducer;
