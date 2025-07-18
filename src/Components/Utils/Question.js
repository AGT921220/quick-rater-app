import AsyncStorage from "@react-native-async-storage/async-storage"
import { URL_API } from "../../Services/authValues"
const key = '@answersQuestions'
export const saveQuestionResponse = async (questionId, questionType, response) => {
    let answer = { 'question_id': questionId, 'response': response, 'type': questionType }
    let answers = await getAnswers()

    switch (questionType) {
        case 'open':
            saveOpenQuestionResponse(answers, answer)
            break;
        case 'multiple':
            saveOpenQuestionResponse(answers, answer)
            break;
        case 'boolean':
            saveOpenQuestionResponse(answers, answer)
            break;
        case 'evaluation':
            saveOpenQuestionResponse(answers, answer)
            break;

        default:
            break;
    }
}


const saveOpenQuestionResponse = async (answers, answer) => {

    if (answers.length === 0) {
        answers.push(answer)
        saveAnswers(answers)
        return;
    }

    answers.map((element, index) => {
        if (element.question_id == answer.question_id) {
            answers.splice(index, 1);
        }
    });
    answers.push(answer)
    saveAnswers(answers)
}


const saveAnswers = async (answers) => {
    await AsyncStorage.setItem(key, JSON.stringify(answers))
}
export const getAnswers = async () => {
    let answers = await AsyncStorage.getItem(key)
    if (!answers) {
        return []
    }
    return JSON.parse(answers)
}

export const clearAnswers = async () => {
    await AsyncStorage.removeItem(key);

    // await AsyncStorage.clear()
}

export const sendEvaluation = async (answers) => {
//    let answers = await getAnswers()
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      };
      
      try {
        await fetch(`${URL_API}/quizes`, requestOptions);
        return {'success':'Gracias por responder la encuesta'}
      } catch (error) {
        return null
      }
}
export const getQuestionValue = async (id) => {
    let answers = await getAnswers()
    let response = null
    answers.forEach((answer) => {

        if (answer.question_id === id) {
            response = answer.response;
        }
    });
    return response
}