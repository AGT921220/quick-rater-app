import axios from "axios";
import { URL_API } from "./authValues";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { questionsJson } from "../mockJson/questions";


export const getQuestions = async()=>
{
    try {   
        const response = await axios.get(`${URL_API}/questions`);
        await saveQuestionsToLocalStorage(response.data)
        // const response = questionsJson
        return response.data
      } catch (error) {
        return null
      }
}

const saveQuestionsToLocalStorage = async(questions)=>
{
  try {
    const dataString = JSON.stringify(questions);
    await AsyncStorage.setItem('questions', dataString);
    console.log('Data saved to AsyncStorage');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export const getQuestionsToLocalStorage = async () => {
  try {
    const dataString = await AsyncStorage.getItem('questions');
    if (dataString) {
      return JSON.parse(dataString);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null
  }
  return null; // Retorna null si no se encuentra el objeto o hay un error.
}
