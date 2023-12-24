import 'react-native-gesture-handler';
import { Text, Platform, View, StyleSheet } from 'react-native';
// import { Home, Portfolio, Prices, Settings, Transaction } from "./screens";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import { useDrawerStatus } from '@react-navigation/drawer';

import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Appointment from './Appointment'
import Notification from './Notification';
import User from './User';
import MakeAppointment from './MakeAppointment';

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
const Drawer = createDrawerNavigator();
export default function App() {
  return (

      <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Login} />
        <Drawer.Screen name="Notifications" component={SignUp} />
      </Drawer.Navigator> */}



      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Entypo name="home" size={24} color={focused ? "#16247d" : "#111"} />
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
                  <Entypo name="calendar" size={24} color={focused ? "#16247d" : "#111"} />
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
                    backgroundColor: "#16247d",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <Ionicons name="ios-add-sharp" size={30} color="#fff" style={{fontWeight: 'bold'}} />
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
                  <MaterialCommunityIcons name="bell-ring" size={24} color={focused ? "#16247d" : "#111"} />
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
    </NavigationContainer>
  )
}

