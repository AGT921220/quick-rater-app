import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../Components/CustomDrawerContent";
import Home from '../Pantallas/Home';



// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainStackNavigator() {

  return (
    <NavigationContainer>

      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
            <Drawer.Screen
              color='white'
              name="Inicio"
              component={Home}>
            </Drawer.Screen>

      </Drawer.Navigator>

    </NavigationContainer>
  );
}
