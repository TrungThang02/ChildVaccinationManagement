import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const VaccinationRecord = ({ navigation }) => {
    const [vaccineRecords, setVaccineRecords] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore().collection('Vaccinerecord').onSnapshot(snapshot => {
            const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVaccineRecords(records);
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Details", { recordId: item.id })}
            style={styles.recordItem}>
            <Text style={styles.fullName}>Họ và tên: {item.fullName}</Text>
            <Text style={styles.detailText}>Ngày sinh: {item.dateOfBirth}</Text>
            {/* Add more fields here */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Insert")}
                style={styles.addButton}>
                <Text style={styles.addButtonText}>Thêm hồ sơ mới</Text>
            </TouchableOpacity>
            <FlatList
                data={vaccineRecords}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    addButton: {
        backgroundColor: '#87A7FF',
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    recordItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    fullName: {
        color:'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
    },
    flatList: {
        width: '100%',
    },
});

export default VaccinationRecord;
