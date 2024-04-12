import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../components/Welcome';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Notification from '../components/Notification';
import RouteHome from "../components/NavigationHome";
import MakeAppointment from '../components/MakeAppointment';
import VaccinationRecord from '../components/VaccinationRecord';
import AppInfo from '../components/AppInfo';
import ContactInfo from '../components/ContactInfo';
import Insert from '../components/VaccineRecordController/Insert';
import VaccinationLog from '../components/VaccinationLog';
import VaccinationSchedule from '../components/VaccinationSchedule';
import VaccineList from '../components/VaccineList';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
     
        <Stack.Screen name="RouteHome" component={RouteHome} options={{ headerShown: false }} />
       <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />

       <Stack.Screen name="Notification" component={Notification} />

      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="MakeAppointment" component={MakeAppointment} />
      <Stack.Screen name="VaccinationRecord" component={VaccinationRecord}  />
      <Stack.Screen name="AppInfo" component={AppInfo}  />
      <Stack.Screen name="ContactInfo" component={ContactInfo}  />
      <Stack.Screen name="Insert" component={Insert}  />
      <Stack.Screen name="VaccinationLog" component={VaccinationLog}  />
      <Stack.Screen name="VaccinationSchedule" component={VaccinationSchedule}  />
      <Stack.Screen name="VaccineList" component={VaccineList}  />
      
    </Stack.Navigator>


  );
}

const styles = StyleSheet.create({})

export default Router;