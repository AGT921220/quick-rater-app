export const saveUserData = (payload) => {
    return {
      type: 'SAVE_USER_DATA',
      payload:payload
    };
  };

  export const getUserData = () => {
    return {
      type: 'GET_USER_DATA'
    };
  };

  export const deleteUserData = () => {
    return {
      type: 'DELETE_USER_DATA'
    };
  };
  
  