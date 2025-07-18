import AsyncStorage from '@react-native-async-storage/async-storage';

const authTokenKey = "@authToken"
export const saveAuthToken = async(authToken)=>
{
    try {
      await AsyncStorage.setItem("@authToken",authToken)
    } catch (error) {
    }
}

export const getAuthToken = async()=>
{
    try {
        return await AsyncStorage.getItem("@authToken");
      } catch (error) {
        return null
      }
}
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('@authToken');
  } catch (error) {
  }
};