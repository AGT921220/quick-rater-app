import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_API } from "../../Services/authValues";
const LOCAL_STORAGE_KEY = 'miLlaves';


export const saveEvaluationToLocalStorage = async (obj) => {
  // Obtenemos el valor actual del localStorage
  let data = await AsyncStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
  const currentData = JSON.parse(data);

  // Creamos el nuevo arreglo con el objeto
  const newArray = obj;

  // Añadimos el nuevo arreglo al arreglo existente
  currentData.push(newArray);

  // Guardamos el arreglo actualizado en el localStorage
  AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentData));
}

export const getEvaluationToLocalStorage = async () => {
  let data = await AsyncStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
  let test = JSON.parse(data);
  return test
}

export const testLocalStorage = async () => {
  let localStorage = await getEvaluationToLocalStorage()

}
export const sendAllEvaluations = async () => {
  let answers = await getEvaluationToLocalStorage()

  let savedEvaluations = []
  answers.forEach((answer) => {
    savedEvaluations.push(answer)
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(savedEvaluations), // Envía el array como un objeto JSON
  };
  try {
    await fetch(`${URL_API}/quizes-bulk`, requestOptions);
    await AsyncStorage.removeItem(LOCAL_STORAGE_KEY);
    return true
  } catch (error) {
    return null
  }

}