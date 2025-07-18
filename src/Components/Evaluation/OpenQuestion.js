import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { saveQuestionResponse } from '../Utils/Question';
import { Input } from 'react-native-elements';
import { getTextColor } from '../../Utils/Colors';

export default function OpenQuestion(props) {
    const { question, value } = props;

    const [localValue, setValue] = useState(value)
    return (
        <Input placeholder="Respuesta.."
        value={localValue}
        placeholderTextColor={getTextColor()}// Cambia el color del placeholder
        style={{ margin: 20,  padding: 0, marginTop: 100, fontSize:30}}
    inputStyle={{ 
        color: getTextColor(),
     }}
        onChangeText={(response) => {
          saveQuestionResponse(question.id, question.type, response)
        }}
    ></Input>
    );
}