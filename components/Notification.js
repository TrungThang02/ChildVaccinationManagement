import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';



const Notification = () => {

    return (
        <View>

  <View style={styles.container}>
            <Text>Đây là trang thông báo</Text>
        </View>
  </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Notification;
