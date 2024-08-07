import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
// import { UserProvider, UserContext } from '../context/UseContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import  Entypo  from 'react-native-vector-icons/Entypo';
import IconMT from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper';
import COLORS from '../constants/colors';
import { UserProvider, UserContext } from '../context/UseContext';

import VaccinationRecord from './VaccinationRecord';
const User = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    //   const { userInfo } = useContext(UserContext);
    //   const [user, setUser] = useState(null);
      const { logoutUser } = useContext(UserContext);

      const { userInfo } = useContext(UserContext);
      const userEmail = userInfo?.email || '';
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            // setUser(user);
            if (initializing) setInitializing(false);
        });

        return unsubscribe;
    }, [initializing]);

    if (initializing) return null;
    const handleInfo = () => {
        // navigation.navigate('Info', { userId: user ? user.uid : null });
    };

    // const handleEdit = () => {
    //     navigation.navigate('ChangeInfo');
    // };

    const handleReset = () => {
        // if (userInfo.email) {
        //   auth()
        //     .sendPasswordResetEmail(userInfo.email)
        //     .then(() => {
        //       Alert.alert('Thông báo', 'Gửi yêu cầu thành công!');
        //     })
        //     .catch((error) => {
        //       Alert.alert('Lỗi', 'Không tìm thấy tài khoản!');
        //     });
        // } else {
        //   Alert.alert('Lỗi', 'Không tìm thấy tài khoản!');
        // }
    };
    const handleLogout = () => {
        Alert.alert(
            '',
            'Bạn chắc chưa?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    onPress: () => {
                        logoutUser();
                        navigation.navigate('Login');
                    },
                    style: 'default',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ backgroundColor: 'white', height: "100%" }}>

            <View
                style={{
                    flexDirection: 'column',
                    padding: 30,
                    // borderBottomRightRadius: 30,
                    // borderBottomLeftRadius: 30,
                    marginBottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.purple,
                    zIndex: 1,


                }}
            >
                <Avatar.Image
                    size={100}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
                    }}
                />
                <View style={{ justifyContent: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                       {userEmail}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', padding: 10 }}>
                    <TouchableOpacity 
                        onPress={handleLogout}
                        style={{
                        backgroundColor: 'transparent',
                        padding: 10,
                        width: 120,
                        borderWidth: 1,
                        borderRadius: 30,
                        alignItems: 'center',
                        borderColor: '#fff'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 15 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                position: 'relative',
                top: -25,
                zIndex: 2,
                backgroundColor: '#fff'
            }}>
                <View style={{ margin: 5 }}>
                    <Pressable
                       onPressIn={()=> navigation.navigate("VaccinationRecord")}
                        style={styles.button}
                    > 
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ marginRight:10}}><Icon name='file-alt' size={26} style={{ color: "black" , margin:20}} /></Text>
                    <Text style={styles.textbutton}> Hồ sơ tiêm chủng</Text>
                    </View>
         
                    </Pressable>
                    <Pressable
                         onPress={ ()=> navigation.navigate("VaccinationLog") }  
                        style={styles.button}
                    > 
                    <TouchableOpacity 
                    onPress={ ()=> navigation.navigate("VaccinationLog") }  
                    style={{flexDirection:'row'}}>
                    <Text style={{ marginRight:10}}><Entypo name='back-in-time' size={26} style={{ color: "black" , margin:20}} /></Text>
                    <Text style={styles.textbutton}>Lịch sử tiêm</Text>
                    </TouchableOpacity>
         
                    </Pressable>
                    {/* <Pressable
                        onPress={handleEdit}
                        style={styles.button}
                    > 
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ marginRight:10}}><Icon name='notes-medical' size={26} style={{ color: "black" , margin:20}} /></Text>
                    <Text style={styles.textbutton}>Phiếu khám bệnh</Text>
                    </View>
         
                    </Pressable> */}
                    {/* <Pressable
                        onPress={handleEdit}
                        style={styles.button}
                    > 
                    <View style={{flexDirection:'row'}}>
                    <Text style={{ marginRight:10}}><Icon name='info-circle' size={26} style={{ color: "black" , margin:20}} /></Text>
                    <Text style={styles.textbutton}>Giới thiệu</Text>
                    </View>
         
                    </Pressable> */}
                </View>
                {/* <Pressable
                        onPress={handleEdit}
                        style={styles.button}
                    > 
                    <View style={{flexDirection:'row',marginLeft:5}}>
                    <Text style={{ marginRight:10}}><IconMT name='settings' size={26} style={{ color: "black" , margin:20}} /></Text>
                    <Text style={styles.textbutton}>Cài đặt</Text>
                    </View>
         
                    </Pressable> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    textbutton: {
        color: '#333',
        fontSize: 18,

    },
    button: {
        padding: 20,
        
        borderBottomWidth: 1,
        borderColor: COLORS.grey
    },
});

export default User;