// actions.js

export const obtenerEstadoUsuario = () => {
    return {
      type: 'OBTENER_ESTADO_USUARIO',
    };
  };
  
  export const autenticarUsuario = (payload) => {
    return {
      type: 'AUTENTICAR_USUARIO',
      payload:payload
    };
  };
  
  export const desautenticarUsuario = () => {
    return {
      type: 'DESAUTENTICAR_USUARIO',
    };
  };

