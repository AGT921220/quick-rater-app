// userReducer.js

const initialState = {
  id: null,
  name: null,
  paternal_surname: null,
  maternal_surname: null,
  client_id: null,
  email: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DATA':
      return {
        ...state,
      };
    case 'SAVE_USER_DATA':
      let payload = action.payload
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        paternal_surname: payload.paternal_surname,
        maternal_surname: payload.maternal_surname,
        client_id: payload.client_,
        email: payload.ema,
      };
      case 'DELETE_USER_DATA':
        return {
          ...state,
          id: null,
          name: null,
          paternal_surname: null,
          maternal_surname: null,
          client_id: null,
          email: null,
        };
  
    default:
      return state;
  }
};

export default userReducer;
