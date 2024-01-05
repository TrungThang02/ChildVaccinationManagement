import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../components/Welcome';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

import RouteHome from "../components/NavigationHome";
const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="RouteHome" component={RouteHome} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

      
    </Stack.Navigator>


  );
}

const styles = StyleSheet.create({})

export default Router;