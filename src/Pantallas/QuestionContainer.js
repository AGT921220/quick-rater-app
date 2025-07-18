import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar, Dimensions } from "react-native";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from 'react-native-elements';
import Loading from '../Components/Utils/Loading';
import { getQuestions } from '../Services/QuestionService';
import { FlatList } from 'react-native-gesture-handler';

export default function QuestionContainer(queestions) {

  const navigation = useNavigation();
  const [loading, setloading] = useState(true);

  const windowWidth = Dimensions.get('window').width;



  useEffect(() => {

    (async () => {

      let questions = await getQuestions()
      setQuestions(questions.data)
      setTotalQuestions(questions.total)
    })();
    setloading(false)
  }, []);

  return (
    <View style={styles.container}>




      {/* <Loading isVisible={loading} text="Cargando Preguntas" />
      <Toast ref={toastRef} position="center" opacity={0.8}></Toast> */}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  textobaner: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    alignSelf: "center",
  },
  btnEntrar: {
    width: "50%",
    marginTop: 20,
    marginBottom: 10
  },
  containerBtn: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  }
})