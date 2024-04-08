import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const MakeAppointment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [appointmentData, setAppointmentData] = useState([]);
    const [patientRecords, setPatientRecords] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore().collection('appointment').onSnapshot(snapshot => {
            const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppointmentData(appointments);
        });

        return () => unsubscribe();
    }, []);

    const onChangeSearch = query => setSearchQuery(query);

    const handleBookAppointment = appointmentId => {
        setSelectedAppointment(appointmentId);
        setModalVisible(true);
        firestore().collection('Vaccinerecord').where('appointmentId', '==', appointmentId).get()
            .then(querySnapshot => {
                const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPatientRecords(records);
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
    };

    const handleConfirmAppointment = (vaccineName, fullName, time) => {
        if (selectedAppointment) {
            // Save appointment information to collection
            firestore().collection('Makeappointment').add({
                vaccineName: vaccineName,
                fullName: fullName,
                time: time,
            })
            .then(() => {
                console.log('Appointment successfully booked');
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });
        } else {
            console.log('Please select an appointment before booking.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.Name}</Text>
            <Text style={styles.name}>{item.Time}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleBookAppointment(item.id)}
                >
                    <Text style={styles.buttonText}>Đặt lịch</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPatientRecordItem = ({ item }) => (
        <TouchableOpacity
            style={styles.patientRecordItem}
            onPress={() => handleConfirmAppointment(item.vaccineName, item.fullName, item.time)}
        >
            <Text style={styles.patientRecordText}>{item.fullName}</Text>
            {/* Add more fields here */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Đặt lịch</Text>
            </View>
            <View style={styles.search}>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Search locations..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <SafeAreaView style={styles.listContainer}>
                <FlatList
                    data={appointmentData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select patient record:</Text>
                        <FlatList
                            data={patientRecords}
                            renderItem={renderPatientRecordItem}
                            keyExtractor={item => item.id}
                        />
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Đóng</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#87A7FF',
    },
    headerText: {
        fontFamily: 'Arial',
        fontSize: 18,
        fontWeight: '600',
        fontWeight: 'bold',
        color: '#fff',
    },
    search: {
        padding: 15,
        paddingBottom: 5,
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderColor: '#87A7FF',
        borderWidth: 1,
        borderRadius: 10,
    },
    listContainer: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 14,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        padding: 10,
        backgroundColor: '#87A7FF',
        borderRadius: 20,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    patientRecordItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    patientRecordText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default MakeAppointment;
