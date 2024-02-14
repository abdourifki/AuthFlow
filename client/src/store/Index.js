import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import rootReducer from './rootReducer';

export const store = configureStore({
    reducer: rootReducer
   
})