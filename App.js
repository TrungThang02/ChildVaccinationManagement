import "react-native-gesture-handler";
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import CustomNavigationBar from './navigators/CustomNavigationBar';

import Router from "./navigators/Navigation";

import { UserProvider } from "./context/UseContext";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
    <NavigationContainer>
    {/* <Stack.Navigator
    initalRouteName ="Welcome"
    screenOptions={{
      header: (props) => <CustomNavigationBar {...props} />
    }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="SignUp" component={SignUp} /> 
      <Stack.Screen name="Home" component={RouteHome} /> 
      
    </Stack.Navigator> */}
    <UserProvider>
    <Router/>
    </UserProvider>
  </NavigationContainer>
  </PaperProvider>
  );
}