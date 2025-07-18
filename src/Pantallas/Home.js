import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Icon, colors } from 'react-native-elements';
import Loading from '../Components/Utils/Loading';
import { getColors, getIcon, getIconToLocalStorage, saveIconToLocalStorage } from '../Services/Icon';
import { BASE_URL } from '../Services/authValues';
import { getPrimaryColor, setColors } from '../Utils/Colors';
import * as Font from 'expo-font'; // Importa el módulo de fuentes
import { getEvaluationToLocalStorage, sendAllEvaluations, testLocalStorage } from '../Components/Utils/Evaluation';
import ChangeUserModal from '../Components/ChangeUserModal';
import { getEmployeeToLocalStorage, removeEmployeeFromLocalStorage } from '../Services/Employee';
import { LinearGradient } from 'expo-linear-gradient';
// import ChangeUserModal from "../Components/ChangeUserModal"

export default function Home({ route }) {

  const toastRef = useRef();
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const [loading, setloading] = useState(true);
  const [icon, setIcon] = useState(require("../../assets/logo.png"))
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const [savedEvaluations, setSavedEvaluations] = useState(null);
  const [changeUserModalVisibility, setChangeUserModalVisibility] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState(null);


  const sendSavedEvaluations = async () => {
    console.log('savedEvaluations')
    console.log(savedEvaluations)
    if (savedEvaluations && savedEvaluations != []) {
      let sended = await sendAllEvaluations()
      if (!sended) {
        toastRef.current.show('No se pudieron enviar las encuestas!')
        return
      }
      setSavedEvaluations(null)
      toastRef.current.show('Encuestas enviadas correctamente!')
    }
  }

  useEffect(() => {
    (async () => {
      if (route.params) {
        let evaluations = await getEvaluationToLocalStorage()
        setSavedEvaluations(evaluations)
        return
      }
      await Font.loadAsync({
        'IndieFlower-Regular': require('../../assets/fonts/IndieFlower-Regular.ttf'), // Ruta correcta a la fuente
      });

      let iconUrl = await getIcon()
      let personalizedIcon = null
      if (iconUrl) {
        await saveIconToLocalStorage(BASE_URL + '/' + iconUrl.success)
        personalizedIcon = BASE_URL + '/' + iconUrl.success
      }
      personalizedIcon = await getIconToLocalStorage()
      if (personalizedIcon) {
        setIcon({ uri: personalizedIcon })
      }

      let savedEmployee = await getEmployeeToLocalStorage()
      if (savedEmployee) {
        setActiveEmployee(savedEmployee)
      }
      let colors = await getColors()
      if (colors && colors.success && colors.success.apply) {
        await setColors(colors.success);
        setBackgroundColor(colors.success.background)
      }

      let evaluations = await getEvaluationToLocalStorage()
      console.log(evaluations)
      if (evaluations && Array.isArray(evaluations) && evaluations.length > 0) {
        setSavedEvaluations(evaluations)
      }


    })();
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, [route]);


  const startEvaluation = async () => {
    await testLocalStorage()
    navigation.navigate('Evaluation')
  }

  const showChangeUserModal = () => {
    setChangeUserModalVisibility(true)
  }
  const hideChangeUserModal = () => {
    console.log('hideChangeUserModal')
    setChangeUserModalVisibility(false)
  }
  const closeEmployeeSession = () => {
    removeEmployeeFromLocalStorage()
    setActiveEmployee(null)
  }
    const showErrorMessage = (message) => {
      console.log('showErrorMessage')
    toastRef.current.show(message)
    hideChangeUserModal()
  }


  return (
    <LinearGradient
      colors={['#0077CC', '#606060']}
      style={{
        flex: 1,
        // backgroundColor:'pink'
        backgroundColor: backgroundColor
      }}
    >
      <StatusBar backgroundColor="#000000"></StatusBar>


      {changeUserModalVisibility == true ? <ChangeUserModal
        setLoading={setloading}
        hideChangeUserModal={hideChangeUserModal}
        setActiveEmployee={setActiveEmployee}
        showErrorMessage={showErrorMessage}       
       ></ChangeUserModal> : null}


      {loading == false && activeEmployee ?
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
        >

          <TouchableOpacity
            onPress={() => showChangeUserModal()}
            style={styles.floatingChangeUserButton}
          >
            <Icon
              name="account-switch"
              type="material-community"
              color={getPrimaryColor()}
              size={40}
            />
          </TouchableOpacity>

          {activeEmployee ?
            <TouchableOpacity
              onPress={() => closeEmployeeSession()}
              style={styles.floatingChangeUserButton}
            >

              <Icon
                name="logout"
                type="material-community"
                color='red'
                size={40}
              />
            </TouchableOpacity> : null}

        </View>

        : null}


      {activeEmployee ?
        <View>
          <Image
            source={{ uri: `${BASE_URL}${activeEmployee.image}` }}
            style={{
              width: windowWidth * 0.3,
              height: windowWidth * 0.3,
              marginTop: 20,
              alignSelf: "center",
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
          <Text style={{ textAlign: 'center', color:'#ffffff', fontFamily: 'IndieFlower-Regular', fontSize: 20 }}>{activeEmployee.full_name}</Text>

        </View> : null}


      {loading == false ? (
        <Image
          source={icon}
          style={{
            width: windowWidth * 0.8,
            height: windowWidth * 0.5,
            marginTop: 50,
            alignSelf: "center",
            resizeMode: 'contain',
          }}
        />) : null
      }
          <Text style={{ textAlign: 'center', color:'#ffffff', fontFamily: 'IndieFlower-Regular', fontSize: 20 }}>EVALUACION DE SATISFACCION</Text>

      {loading == false && activeEmployee ? (
        <Button
          title="Iniciar Evaluación"
          containerStyle={styles.btnEntrar}
          buttonStyle={{
            backgroundColor: getPrimaryColor(),
            padding: 10,
            paddingHorizontal: 25,
            borderRadius: 15,

          }}
          titleStyle={{
            fontSize: 30,
            fontFamily: 'IndieFlower-Regular',
            fontWeight: '400',
          }}

          onPress={() => startEvaluation()}
        ></Button>
      ) : null}



      {activeEmployee == null ?
        <Button
          title="Seleccionar Empleado"
          containerStyle={styles.btnSelectEmployee}
          buttonStyle={{
            backgroundColor: getPrimaryColor(),
            padding: 10,
            paddingHorizontal: 25,
            borderRadius: 35,
            fontSize: 8

          }}
          titleStyle={{
            fontSize: 30,
            fontFamily: 'IndieFlower-Regular',
            fontWeight: '400',
          }}

          onPress={() => showChangeUserModal()}
        ></Button>
        : null}

      {savedEvaluations !== null && savedEvaluations != [] && savedEvaluations.length > 0
        // && savedEvaluations >= 1 
        ? (
          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity
              onPress={() => sendSavedEvaluations()}

              style={styles.floatingButton}
            // onPress={handleFloatingButtonPress}
            >

              <Text style={styles.floatingButtonText}>{savedEvaluations.length}</Text>
              {/* <Text style={styles.floatingButtonText}>SI HAY</Text> */}

            </TouchableOpacity>
          </View>
        ) : null}



      <Loading isVisible={loading} text="Cargando
       Configuración" />

      <Toast ref={toastRef} position="center" opacity={0.8}></Toast>
      {/* Rest of the code */}
    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: "#011734"
    // backgroundColor:{loading?'#ffffff':getBackgroundColor()}
  },
  textobaner: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    alignSelf: "center",
  },
  btnEntrar: {
    marginTop: 100,
    marginBottom: 50,
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    width: '100%',
    fontSize: 5,
  },
  btnSelectEmployee: {
    marginTop: 150,
    marginBottom: 50,
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    width: '100%',
    fontSize: 10,
  },


  floatingButtonContainer: {
    // position: 'absolute',
    bottom: 20, // Ajusta la posición vertical según tus necesidades
    left: 20
    // right: 20, // Ajusta la posición horizontal según tus necesidades
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue', // Color de fondo del botón
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingChangeUserButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white', // Color del texto del botón
    fontSize: 24,
    fontWeight: 'bold',
  },
})