import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const User = () => {
    return (
        <View style={styles.container}>
            <Text>
                Đây là trang người dùng
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

export default User;
