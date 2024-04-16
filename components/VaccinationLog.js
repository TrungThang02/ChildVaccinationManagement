import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';

const VaccinationLog = () => {
    const [appointments, setAppointments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';

    useEffect(() => {
        fetchAppointments();
    }, [userEmail]);

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
                    status: data.status || '',
                    vaccinationDate: data.vaccinationDate ? data.vaccinationDate.toDate().toLocaleDateString() : '',
                };
            });
            setAppointments(appointmentsData);
        } catch (error) {
            console.error('Error fetching appointments: ', error);
        } finally {
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchAppointments();
    };

    const renderItem = ({ item }) => {
      
        if (item.status === 'done') {
            return (
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
                        <Text style={styles.label}>Ngày đặt lịch:</Text>
                        <Text>{item.vaccinationDate}</Text>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    };
    

    const calculateAge = (dob) => {
        const dobDate = new Date(Date.parse(dob));
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <View style={[styles.container, { flexGrow: 1 }]}>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.flatList}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.noAppointmentText}>Nhật ký trống</Text>
                    </View>
                }
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
        flex: 1,
    },
    deleteButton: {
        color: 'white',
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    },
    noAppointmentText: {
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VaccinationLog;
