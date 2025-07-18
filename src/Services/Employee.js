import axios from "axios";
import { URL_API } from "./authValues";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const findEmployeeByCode = async(code)=>
{
  console.log('findEmployeeByCode')
    try {   
        const response = await axios.get(`${URL_API}/employees-by-code/${code}`);
        return response.data
      } catch (error) {
        return error
      }
}


export const saveEmployeeToLocalStorage = async(employee)=>
{
  try {
    const dataString = JSON.stringify(employee);
    await AsyncStorage.setItem('employee', dataString);
    console.log('Data saved to AsyncStorage');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}
export const removeEmployeeFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('employee');
    console.log('Data removed from AsyncStorage');
  } catch (error) {
    console.error('Error removing data:', error);
  }
}

export const getEmployeeToLocalStorage = async () => {
  try {
    const dataString = await AsyncStorage.getItem('employee');
    if (dataString) {
      return JSON.parse(dataString);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null
  }
  return null; // Retorna null si no se encuentra el objeto o hay un error.
}
