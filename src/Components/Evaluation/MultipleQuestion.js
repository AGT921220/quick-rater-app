import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { saveQuestionResponse } from '../Utils/Question';
import { getSecondaryColor, getTextColor } from '../../Utils/Colors';

export default function MultipleQuestion(props) {
    const { question, value } = props;

    let questionOptions = question.multiple_values.map((element) => {
        return {'borderColor':getTextColor(),'color':getSecondaryColor(), 'id': element.id, 'label': element.value, 'value': element.id,labelStyle: {
            color: getTextColor(),
          },        
        }
    });

    

    const [selectedId, setSelectedId] = useState(value);

    const selectOption = (index) => {
        setSelectedId(index)
        saveQuestionResponse(question.id, question.type, index)
    }

    return (
        <View>

            <RadioGroup
                radioButtons={questionOptions}
                onPress={selectOption}
                selectedId={selectedId}
                containerStyle={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'row', marginTop: 20}}  
                circleSize={20}
                color={'red'}


                />
        </View>

    );
}