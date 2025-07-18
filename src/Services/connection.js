import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected;
    } catch (error) {
      console.error('Error al verificar la conexión:', error);
      return false;
    }
  };
  