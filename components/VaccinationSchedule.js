import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const VaccinationSchedule = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('calendar').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCalendarData(data);
        });
        return () => unsubscribe();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        navigation.navigate('ImageDetail', { imageUri: item.image });
    };

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {calendarData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleItemClick(item)}>
                       <View style={styles.itemContainer}>
                           <Text>{item.Time.toString()}</Text>
                       </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const ImageDetail = ({ route }) => {
    const { imageUri } = route.params;
    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUri }}
                style={styles.image}
            />
            <Button title="Close" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});

export default VaccinationSchedule;
