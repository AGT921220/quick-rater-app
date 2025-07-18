import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { saveQuestionResponse } from '../Utils/Question';
import { getSecondaryColor, getTextColor } from '../../Utils/Colors';
import { Icon } from 'react-native-elements';

export default function EvaluationQuestion(props) {
    const { question, value } = props;
    const emojiStatus = question.emoji_status
    const iconEmojiSize = 40
    const EVALUATION_1 = 1
    const EVALUATION_2 = 2
    const EVALUATION_3 = 3
    const EVALUATION_4 = 4
    const EVALUATION_5 = 5

    let questionOptions = []
    for (let i = question.evaluation_min; i <= question.evaluation_max; i++) {
        questionOptions.push({
            'borderColor': getTextColor(), 'color': getSecondaryColor(), 'id': i,
            'label': i,
            'value': i, labelStyle: {
                color: getTextColor(),
            }
        })
    }

    const [selectedId, setSelectedId] = useState(value);

    const selectOption = (index) => {
        setSelectedId(index)
        saveQuestionResponse(question.id, question.type, index)
    }

    const [selectedIcon, setSelectedIcon] = useState("sentiment-very-dissatisfied");

    const selectIconOption = (iconSelected) => {
        selectOption(iconSelected)
        setSelectedIcon(iconSelected);
    };
    return (
        <View>

            {emojiStatus == true ? (
                <View style={{flexDirection:'row', marginTop:20,justifyContent:'space-around'}}>
                    <TouchableOpacity onPress={() => selectIconOption(EVALUATION_1)}>
                        <Icon
                            name="sentiment-very-dissatisfied"
                            type="material"
                            color={selectedIcon === EVALUATION_1 ? "red" : "black"}
                            size={iconEmojiSize}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectIconOption(EVALUATION_2)}>
                        <Icon
                            name="sentiment-dissatisfied"
                            type="material"
                            color={selectedIcon === EVALUATION_2 ? "orange" : "black"}
                            size={iconEmojiSize}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectIconOption(EVALUATION_3)}>
                        <Icon
                            name="sentiment-neutral"
                            type="material"
                            color={selectedIcon === EVALUATION_3 ? "#FFF823" : "black"}
                            size={iconEmojiSize}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectIconOption(EVALUATION_4)}>
                        <Icon
                            name="sentiment-satisfied-alt"
                            type="material"
                            color={selectedIcon === EVALUATION_4 ? "#7EE711" : "black"}
                            size={iconEmojiSize}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectIconOption(EVALUATION_5)}>
                        <Icon
                            name="sentiment-very-satisfied"
                            type="material"
                            color={selectedIcon === EVALUATION_5 ? "#01D201" : "black"}
                            size={iconEmojiSize}
                        />
                    </TouchableOpacity>
                </View>

            ) :
                (
                    <RadioGroup
                        radioButtons={questionOptions}
                        onPress={selectOption}
                        selectedId={selectedId}
                        containerStyle={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'row', marginTop: 20 }}
                    />)}
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
