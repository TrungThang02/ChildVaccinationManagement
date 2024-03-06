import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactInfo = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logovacxinbd.png')} />
            </View>
            <View style={styles.info}>
                <View style={styles.item}>
                    <Icon name="location-on" size={26} style={styles.icon} />
                    <Text style={{...styles.text, marginRight:20}}>
                        3 Phạm Ngọc Thạch, Hiệp Thành, Thủ Dầu Một, Bình Dương
                    </Text>
                </View>
                <View style={styles.item}>
                    <Icon name="phone" size={26} style={styles.icon} />
                    <Text style={styles.text}>
                        0274 3689 883
                    </Text>
                </View>
                <View style={styles.item}>
                    <Icon name="email" size={26} style={styles.icon} />
                    <Text style={styles.text}>
                        vacxinbinhduong@gmail.com
                    </Text>
                </View>
                <View style={styles.item}>
                    <Icon name="access-time-filled" size={26} style={styles.icon} />
                    <Text style={styles.text}>
                        Sáng: 8:00 – 11.30{'\n'}
                        Chiều: 13:30 – 17:00
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain', 
    },
    info: {
        marginTop: 30,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        color: 'black',
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24, // Đảm bảo dòng chữ không bị chồng chéo
    },
});

export default ContactInfo;
