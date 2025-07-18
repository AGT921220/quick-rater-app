import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from "react-native";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from 'react-native-elements';
import Loading from '../Components/Utils/Loading';
import { getQuestions, getQuestionsToLocalStorage } from '../Services/QuestionService';
import { clearAnswers, getAnswers, getQuestionValue, sendEvaluation } from '../Components/Utils/Question';
import MultipleQuestion from '../Components/Evaluation/MultipleQuestion';
import OpenQuestion from '../Components/Evaluation/OpenQuestion';
import BooleanQuestion from '../Components/Evaluation/BooleanQuestion';
import EvaluationQuestion from '../Components/Evaluation/EvaluationQuestion';
import StepIndicator from 'react-native-step-indicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getPrimaryColor, getSecondaryColor, getTextColor } from '../Utils/Colors';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { checkInternetConnection } from '../Services/connection';
import { getEvaluationToLocalStorage, saveEvaluationToLocalStorage, testLocalStorage } from '../Components/Utils/Evaluation';
import { getEmployeeToLocalStorage } from '../Services/Employee';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;

export default function Evaluation() {

  const toastRef = useRef();
  const [questions, setQuestions] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(false);
  const navigation = useNavigation();
  const [loading, setloading] = useState(true);
  const [currentPosition, setPosition] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const nextStep = async () => {

    await testLocalStorage()
    let next = currentPosition + 1
    setPosition(next)
  }

  const backStep = async () => {
    await testLocalStorage()

    let next = currentPosition - 1
    setPosition(next)
  }

  const evaluate = async () => {
    if (isEvaluating) {
      return
    }
    setIsEvaluating(true)
    let connection = await checkInternetConnection()
    let savedEmployee = await getEmployeeToLocalStorage()

    let answers = { 'answers': await getAnswers(), 'employee_id': savedEmployee.id ?? null }
    if (answers.length == 0) {
      toastRef.current.show('Debes responder al menos 1 pregunta')
      setIsEvaluating(false)
      return
    }

    if (!connection) {
      await saveEvaluationToLocalStorage(answers)
      toastRef.current.show('No hay conexión, la encuesta se guardó en el dispositivo')
      goToHome(2000)
      return
    }
    let response = await sendEvaluation(answers)

    if (!response) {
      await saveEvaluationToLocalStorage(answers)
      toastRef.current.show('Hubo un problema en el servidor, la encuesta se guardó en el dispositivo')
      goToHome(2000)
      return
    }


    toastRef.current.show(response.success)
    goToHome(1000)

  }
  let labels = [];

  const goToHome = (time) => {
    setTimeout(() => {
      navigation.navigate('Home', { redirectedFromEvaluation: true });
    }, time);

  }

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: getSecondaryColor(),
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: getSecondaryColor(),
    stepStrokeUnFinishedColor: getPrimaryColor(),
    separatorFinishedColor: getSecondaryColor(),
    separatorUnFinishedColor: getPrimaryColor(),
    stepIndicatorFinishedColor: getSecondaryColor(),
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: getSecondaryColor(),
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: getPrimaryColor(),
    labelColor: getTextColor(),
    labelSize: 15,
    currentStepLabelColor: getSecondaryColor(),
    marginTop: 40
  }


  useEffect(() => {
    (async () => {
      // 1. Limpia respuestas previas
      console.log('🔄 clearAnswers');
      await clearAnswers();

      // 2. Intento desde API
      console.log('🔄 getQuestions');
      let questions = await getQuestions();
      console.log('› getQuestions devolvió', questions);

      // 3. Fallback a localStorage si no vino nada
      if (!questions) {
        console.log('⚠️ Sin preguntas de la API, pruebo getQuestionsToLocalStorage');
        questions = await getQuestionsToLocalStorage();
        console.log('› getQuestionsToLocalStorage devolvió', questions);
      }

      // 4. Validación final: ¿tengo preguntas con data no vacía?
      const hasData =
        questions &&
        Array.isArray(questions.data) &&
        questions.data.length > 0;
      console.log('🔍 Validación de contenido:', hasData ? '✅ OK' : '🚫 VACÍO');

      if (!hasData) {
        alert('No se encontraron preguntas.');
        goToHome(2000);
        return;
      }

      // 5. Si hay preguntas, actualizo estado
      console.log(`🎉 Cargando ${questions.data.length} preguntas`);
      setQuestions(questions.data);
      console.log(`🎉 Total preguntas: ${questions.total}`);
      setTotalQuestions(questions.total);

      loadingFalse()
    })();
  }, []);


  const loadingFalse = () => {
    setTimeout(() => {
      setloading(false)
    }, 1000);

  }
  let allScreens = [];
  if (totalQuestions >= 1) {
    allScreens = questions.map((element, index) => (
      <View style={{ height: windowHeight * 0.8 }}>
        <QuestionScreen key={index} question={element} />
      </View>

    ));
    for (let index = 1; index <= totalQuestions; index++) {
      labels.push(index)
    }
    console.log(labels)
  }

  return (
    // <BackgroundImage
    //   source={require('../../assets/wood_background.jpg')}
    //   blurRadius={2} // Ajusta el valor según tu preferencia
    //   opacity={0.8}
    //   style={{ flex: 1, height: windowHeight }}
    // >
    <LinearGradient
      colors={['#0077CC', '#606060']}
      style={{
        flex: 1,
        // backgroundColor:'pink'
        // backgroundColor: backgroundColor
      }}
    >
      <KeyboardAwareScrollView>

        <View style={styles.container}>
          <StatusBar></StatusBar>


          {totalQuestions >= 1 ? (
            <View style={{
              flex: 1
              , backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>


              {allScreens[currentPosition]}


              <View style={{ height: windowHeight * 0.2 }}>

                <View style={styles.containerBtn}>
                  {(currentPosition >= 1) ?
                    <Button
                      title="Anterior"
                      containerStyle={styles.btnEntrar}
                      buttonStyle={{ backgroundColor: getPrimaryColor() }}
                      onPress={() => backStep()}
                    ></Button> : null
                  }


                  {(currentPosition + 1 < totalQuestions) ?
                    <Button
                      title="Siguiente"
                      containerStyle={styles.btnEntrar}
                      buttonStyle={{ backgroundColor: getPrimaryColor() }}
                      onPress={() => nextStep()}
                    ></Button> : null
                  }
                  {(currentPosition + 1 == totalQuestions) ?
                    <Button
                      title="Enviar Evaluación"
                      containerStyle={styles.btnEntrar}
                      buttonStyle={{ backgroundColor: getPrimaryColor() }}
                      onPress={() => evaluate()}
                    ></Button>
                    : null
                  }

                </View>


                {totalQuestions >= 1 ?
                  (
                    < StepIndicator
                      customStyles={customStyles}
                      currentPosition={currentPosition}
                      labels={labels}
                      stepCount={totalQuestions}
                    />) : null}
              </View>




              <Loading isVisible={loading} text="Cargando Preguntas" />
              <Toast ref={toastRef} position="center" opacity={0.8}></Toast>


            </View>
          ) : null}

        </View>

      </KeyboardAwareScrollView>
      {/* </BackgroundImage> */}
    </LinearGradient>

  );
}



export function QuestionScreen(props) {

  const { question } = props;

  const [response, setResponse] = useState(false);
  let renderedComponent;
  useEffect(() => {

    (async () => {
      setResponse(await getQuestionValue(question.id))
    })();
  }, []);


  switch (question.type) {
    case 'open':
      renderedComponent = (<OpenQuestion value={response} question={question}></OpenQuestion>);
      break;
    case 'multiple':
      renderedComponent = (
        <MultipleQuestion value={response} question={question}></MultipleQuestion>);
      break;
    case 'boolean':
      renderedComponent = (<BooleanQuestion value={response} question={question}></BooleanQuestion>);
      break;
    case 'evaluation':
      renderedComponent = (<EvaluationQuestion value={response} question={question}></EvaluationQuestion>);
      break;
  }


  return (

    response != false ?
      (
        <View style={{
          flex: 1,
          // backgroundColor: 'transparent',
          justifyContent: 'center'
        }}>

          <Text style={{ marginTop: 50, color: getTextColor(), textAlign: 'center', justifyContent: 'center', width: '100%', margin: 'auto', fontSize: 40 }}>{question.body}</Text>
          {renderedComponent}

        </View>
      ) : null
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  btnEntrar: {
    width: "40%",
    marginTop: 20,
    marginBottom: 10,
    margin: 10
  },
  containerBtn: {
    flex: 1,
    marginTop: 0,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    alignItems: "center",
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'center'
  }
})