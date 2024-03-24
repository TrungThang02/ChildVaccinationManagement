import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const VaccinationRecord = ({navigation}) => {
    return (
        <View>
            <View>
                <TouchableOpacity 
                onPress={()=> navigation.navigate("Insert")}
                style={styles.btn}>
                    <Text>Thêm hồ sơ mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#3333',
        padding:20,
        margin: 10,
        borderRadius: 15,


    }
})

export default VaccinationRecord;
