import axios from "axios";
import { URL_API } from "./authValues";
import { Buffer } from 'buffer';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getIcon = async()=>
{
    try {   
        const response = await axios.get(`${URL_API}/icon`);
        return response.data
      } catch (error) {
        return null
      }
}

export const getColors = async()=>
{
    try {   
        const response = await axios.get(`${URL_API}/colors`);
//        return {'error':'error'}
        return response.data
      } catch (error) {
        return null
        throw error;
      }
}

export const saveIconToLocalStorage = async (imageURL) => {
  try {
    const response = await axios.get(imageURL, {
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');

    await AsyncStorage.setItem('icon', base64Image);
  } catch (error) {

  }
};

export const getIconToLocalStorage = async () => {
  try {
    const base64Image = await AsyncStorage.getItem('icon');
    if (base64Image) {
      return `data:image/jpeg;base64,${base64Image}`;
    }
  } catch (error) {
    return null
  }
  return null;
};