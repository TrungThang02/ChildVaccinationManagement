import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView, Modal, TouchableHighlight } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';

const MakeAppointment = () => {
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';
    const [searchQuery, setSearchQuery] = useState('');
    const [appointmentData, setAppointmentData] = useState([]);
    const [patientRecords, setPatientRecords] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [vaccineInfo, setVaccineInfo] = useState({
        vaccineName: '',
        vaccinationTime: '',
        selectedPatient: null,
    });

    useEffect(() => {
        const unsubscribe = firestore().collection('appointment').onSnapshot(snapshot => {
            const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAppointmentData(appointments);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userEmail) {
            const unsubscribe = firestore().collection('Vaccinerecord').where('userEmail', '==', userEmail).onSnapshot(snapshot => {
                const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPatientRecords(records);
            });

            return () => unsubscribe();
        }
    }, [userEmail]);

    const onChangeSearch = query => setSearchQuery(query);
    
    const handleBookAppointment = (appointmentId, vaccineName, vaccinationTime) => {
        setSelectedAppointment(appointmentId);
        setVaccineInfo(prevState => ({
            ...prevState,
            vaccineName: vaccineName,
            vaccinationTime: vaccinationTime,
           
        }));
        setModalVisible(true);
    };

    const handleConfirmAppointment = () => {
        if (!selectedAppointment || !vaccineInfo.selectedPatient) {
            console.log('One or more fields are undefined.');
            alert('Vui lòng điền đầy đủ thông tin đặt lịch.');
            return;
        }

        firestore().collection('MakeAppointments').add({
            appointmentId: selectedAppointment,
            vaccineName: vaccineInfo.vaccineName,
            vaccinationTime: vaccineInfo.vaccinationTime,
            patientName: vaccineInfo.selectedPatient.fullName,
            patientDOB: vaccineInfo.selectedPatient.selectedDate,
            status: "pending",
            email : userEmail
        })
        .then(() => {
            console.log('Appointment successfully booked');
            setModalVisible(false);
            alert('Đặt lịch thành công!');
        })
        .catch(error => {
            console.error('Error adding document: ', error);
            alert('Đã xảy ra lỗi khi đặt lịch.');
        });
    };
    
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.Name}</Text>
            <Text style={styles.name}>{item.Time}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleBookAppointment(item.id, item.Name, item.Time)}
                >
                    <Text style={styles.buttonText}>Đặt lịch</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPatientRecordItem = ({ item }) => (
        <TouchableOpacity
            style={styles.patientRecordItem}
            onPress={() => setVaccineInfo(prevState => ({ ...prevState, selectedPatient: item }))}
        >
            <Text style={styles.patientRecordText}>{item.fullName}</Text>
            <Text style={styles.patientRecordText}>{item.selectedDate}</Text>
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
                    placeholder="Tìm kiếm..."
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
                        <Text style={styles.modalText}>Chọn hồ sơ bệnh nhân:</Text>
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
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={handleConfirmAppointment}
                        >
                            <Text style={styles.textStyle}>Xác nhận đặt lịch</Text>
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
        elevation: 2,
        marginTop: 10,
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
