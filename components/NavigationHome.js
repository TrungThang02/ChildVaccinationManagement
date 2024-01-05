import { Text, Platform, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMT from 'react-native-vector-icons/MaterialIcons';
import IconMTC from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
// import { createDrawerNavigator } from '@react-navigation/drawer';

//import { useDrawerStatus } from '@react-navigation/drawer';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import Appointment from '../components/Appointment'
import Notification from '../components/Notification';
import User from '../components/User';
import MakeAppointment from '../components/MakeAppointment';


const tabBarIcon = icon => () => (
  <Ionicons name={icon} size={26} style={{ color: "black" }} />
);
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",

  }
}
const RouteHome = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="home" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>Trang chủ</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={Appointment}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <IconMT name="date-range" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>Lịch hẹn</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={MakeAppointment}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#87A7FF",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <Ionicons name="add-sharp" size={30} color="#fff" style={{fontWeight: 'bold'}} />
                  
                </View>
                
              )
            }
          }}
        />
        <Tab.Screen
          name="Prices"
          component={Notification}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <IconMTC name="bell-ring" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>Thông báo</Text>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Settings"
          component={User}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <FontAwesome5 name="user-alt" size={24} color={focused ? "#16247d" : "#111"} />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>Cá nhân</Text>
                </View>
              )
            }
          }}
        />
      </Tab.Navigator>
   
  )
}

export default RouteHome