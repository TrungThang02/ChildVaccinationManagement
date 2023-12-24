import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const MakeAppointment = () => {
    return (
        <View style={styles.container}>
            <Text>
                Đây là trang để người ta đặt lịch hẹn
            </Text>
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

export default MakeAppointment;
