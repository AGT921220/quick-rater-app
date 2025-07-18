import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { saveQuestionResponse } from '../Utils/Question';
import { getSecondaryColor, getTextColor } from '../../Utils/Colors';

export default function BooleanQuestion(props) {
    const { question, value } = props;

    const booleanOptions = [{ 'id': 1, 'label': 'Sí', 'value': 1, 'borderColor': getTextColor(), 'color': getSecondaryColor(),
    labelStyle: {
        color: getTextColor(),
      } },
    { 'id': 0, 'label': 'No', 'value': 0, 'borderColor': getTextColor(), 'color': getSecondaryColor(),
    labelStyle: {
        color: getTextColor(),
      } }]

    const [selectedId, setSelectedId] = useState(value);

    const selectOption = (index) => {
        setSelectedId(index)
        saveQuestionResponse(question.id, question.type, index)
    }

    return (
        <View>

            <RadioGroup
                radioButtons={booleanOptions}
                onPress={selectOption}
                selectedId={selectedId}
                containerStyle={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'row', marginTop: 20 }}
            />
        </View>

    );
}

const styles = StyleSheet.create({

    overlay: {
        backgroundColor: "transparent",

        width: "100%",
        height: Dimensions.get("window").height,
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        marginTop: 20,
        fontSize: 24,
        textTransform: "uppercase"
    }

})
