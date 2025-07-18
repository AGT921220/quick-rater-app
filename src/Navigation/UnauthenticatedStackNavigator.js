import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../Pantallas/Home';
import Evaluation from '../Pantallas/Evaluation';
const Stack = createStackNavigator();

export default function UnauthenticatedStackNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">


        <Stack.Screen name="Home" component={Home}

          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Evaluation" component={Evaluation}

          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
