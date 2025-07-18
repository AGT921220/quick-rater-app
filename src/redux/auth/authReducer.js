// authReducer.js

const initialState = {
  isAuthenticated: false, // Inicialmente no autenticado
  user:
  {
    id: null,
    name: null,
    paternal_surname: null,
    maternal_surname: null,
    client_id: null,
    email: null,
    client:null
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OBTENER_ESTADO_USUARIO':
      return {
        ...state,
      };
    case 'AUTENTICAR_USUARIO':
      let payload = action.payload
      // console.log('action')
      // console.log(payload)
      return {
        ...state,
        isAuthenticated: true,
        user:{
          id: payload.id,
          name: payload.name,
          paternal_surname: payload.paternal_surname,
          maternal_surname: payload.maternal_surname,
          client_id: payload.client_,
          email: payload.ema,
          client:payload.client
        }
      };
    case 'DESAUTENTICAR_USUARIO':
      return {
        ...state,
        isAuthenticated: false,
        user:{
          id: null,
          name: null,
          paternal_surname: null,
          maternal_surname: null,
          client_id: null,
          email: null,
        }
      };
    default:
      return state;
  }
};

export default authReducer;
