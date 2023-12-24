import React from "react";

import { Text, StyleSheet, View, Image, TouchableOpacity, Alert, Pressable } from "react-native";


// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { PaperProvider } from 'react-native-paper';
import CustomNavigationBar from './CustomNavigationBar';


const Welcome = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.logoview}>
                <View>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </View>
                <Text style={{ ...styles.title, color: 'blue' }}>ỨNG DỤNG</Text>
                <Text style={{ ...styles.title, color: 'blue', fontWeight: 'bold' }}>QUẢN LÝ TIÊM CHỦNG TRẺ EM</Text>
            </View>
            <View>
            </View>
            <View style={styles.viewbtn}>
                    <TouchableOpacity style={styles.btnlogin} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.textbtn}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    logoview: {
        marginBottom: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },

    btnlogin: {
        backgroundColor: '#fff',
        padding: 1,
        width: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'blue',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',


    },
    viewbtn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',

    },
    title: {
        fontSize: 20,
        fontFamily: '',
    },
    textbtn: {
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.8,
        color: 'blue'

    }
})
export default Welcome;




