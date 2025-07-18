// index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Importa tu reducer de autenticación aquí
import userReducer from '../user/userReducer';

const rootReducer = combineReducers({
  auth: authReducer, // Agrega otros reducers si es necesario
  user:userReducer
});

export default rootReducer;
