// store.js

import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'; // Opcional: Importa middleware si lo necesitas
import rootReducer from './index'; // Importa el archivo index.js de reducers

// Combina el middleware si es necesario
// const middleware = [thunk]; // Puedes agregar otros middleware aquí

// Crea el store de Redux
const store = createStore(
  rootReducer,
//   applyMiddleware(...middleware)
);

export default store;
