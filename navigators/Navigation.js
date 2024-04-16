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
import Update from '../components/VaccineRecordController/Update';
import ImageDetail from '../components/ImageDetail';
const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
     
        <Stack.Screen name="RouteHome" component={RouteHome} options={{ headerShown: false }} />
       <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />

       <Stack.Screen name="Notification" component={Notification} options={{ title: 'Thông báo' }} />

      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="MakeAppointment" component={MakeAppointment} options={{ title: 'Đặt lịch tiêm chủng' }} />
      <Stack.Screen name="VaccinationRecord" component={VaccinationRecord} options={{ title: 'Hồ sơ tiêm chủng' }}/>
      <Stack.Screen name="AppInfo" component={AppInfo} options={{ title: 'Hồ sơ tiêm chủng' }} />
      <Stack.Screen name="ContactInfo" component={ContactInfo} options={{ title: 'Thông tin liên hệ' }} />
      <Stack.Screen name="Insert" component={Insert}  options={{ title: 'Thêm hồ sơ mới' }}/>
      <Stack.Screen name="VaccinationLog" component={VaccinationLog} options={{ title: 'Nhật ký tiêm' }} />
      <Stack.Screen name="VaccinationSchedule" component={VaccinationSchedule} options={{ title: 'Lịch tiêm chủng cho trẻ em' }} />
      <Stack.Screen name="VaccineList" component={VaccineList}  options={{ title: 'Danh sách Vắc xin' }}/>
      <Stack.Screen name="Update" component={Update} options={{ title: 'Cập nhật hồ sơ tiêm chủng' }} />
      <Stack.Screen name="ImageDetail" component={ImageDetail}  />
      
    </Stack.Navigator>


  );
}

const styles = StyleSheet.create({})

export default Router;