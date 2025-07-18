import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import {Overlay} from "react-native-elements";
import {Grid} from "react-native-animated-spinkit";
import { getPrimaryColor } from '../../Utils/Colors';


export default function Loading(props) {
    const {isVisible,text} =props;
    return (
        <Overlay
            isVisible={isVisible} overlayStyle={styles.overlay}
        >   
            <View style={styles.view}>
                <Grid sixe={78} color="gray" >
                </Grid>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>

    )
}

const styles = StyleSheet.create({

    overlay:{
        backgroundColor: "transparent",

        width:"100%",
        height:Dimensions.get("window").height,
    },
    view:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:getPrimaryColor(),
        marginTop:40,
        fontSize:20,
        // textTransform:"uppercase",
    }

})
