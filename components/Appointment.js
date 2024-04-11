import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const snapshot = await firestore()
                    .collection('MakeAppointments')
                    .where('email', '==', userEmail)
                    .get();

                const appointmentsData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        vaccineName: data.vaccineName || '',
                        vaccinationTime: data.vaccinationTime || '',
                        patientName: data.patientName || '',
                        patientDOB: data.patientDOB || '',
                        status: data.status || ''
                    };
                });
                setAppointments(appointmentsData);
            } catch (error) {
                console.error('Error fetching appointments: ', error);
            }
        };

        fetchAppointments();
    }, [userEmail]);

    // Hàm tính tuổi từ ngày sinh
    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Tên vaccine:</Text>
                <Text>{item.vaccineName}</Text>
            </View>
            <Divider />
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Thời gian:</Text>
                <Text>{item.vaccinationTime}</Text>
            </View>
            <Divider />
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Tên:</Text>
                <Text>{item.patientName}</Text>
            </View>
            <Divider />
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Tuổi:</Text>
                <Text>{calculateAge(item.patientDOB)}</Text>
            </View>
            <Divider />
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Trạng thái:</Text>
                <Text>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
         
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    flatList: {
        width: '100%',
    },
});

export default Appointment;
