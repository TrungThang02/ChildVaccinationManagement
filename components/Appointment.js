import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

const NotificationModal = ({ id, onSave, visible, onClose, userEmail }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [notificationSuccess, setNotificationSuccess] = useState(false); // State to track notification success

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleSave = async () => {
        await firestore().collection('MakeAppointments').doc(id).update({ notificationTime: date.getTime() });

        // Schedule email to be sent at the selected time
        const timeDiffMs = date.getTime() - new Date().getTime();
        setTimeout(() => {
            sendEmail(id, date);
        }, timeDiffMs);

        onSave();
        setNotificationSuccess(true); // Update notification success state
        Alert.alert(
            'Thông báo',
            'Thiết lập thông báo thành công!',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };

    const sendEmail = async (id, notificationTime) => {
        try {
            // Lấy thông tin cuộc hẹn từ Firestore
            const appointmentSnapshot = await firestore().collection('MakeAppointments').doc(id).get();
            const appointmentData = appointmentSnapshot.data();
            const formattedDOB = new Date(appointmentData.patientDOB).toLocaleDateString('vi-VN');
            // Gửi email sử dụng server tại http://192.168.1.3:3001/send-email
            await axios.post('http://192.168.1.3:3001/send-email', {
                recipient: userEmail,
                subject: 'Email thông báo lịch tiêm',
                html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                                background-color: #f0f0f0;
                                color: #333;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                padding: 20px;
                            }
                            .highlight {
                                font-weight: bold;
                                color: black;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <h3>THÔNG BÁO LỊCH TIÊM</h3>
                            <p><span class="highlight">Tên Vaccine:</span> ${appointmentData.vaccineName}</p>
                            <p><span class="highlight">Thời gian Tiêm:</span> ${appointmentData.vaccinationTime}</p>
                            <p><span class="highlight">Họ và tên:</span> ${appointmentData.patientName}</p>
                            <p><span class="highlight">Ngày Sinh:</span> ${formattedDOB}</p>
                            <p><span class="highlight">Ngày Tiêm:</span> ${new Date(appointmentData.vaccinationDate.toDate()).toLocaleDateString()}</p>
                            <p><span class="highlight">Thời Gian Đặt Thông Báo:</span> ${new Date(notificationTime).toLocaleString()}</p>
                        </div>
                    </body>
                    </html>
                `,
            });
        } catch (error) {
            console.error('Lỗi khi gửi email: ', error);
        }
    };
    

    return (
        <Modal isVisible={visible} onBackdropPress={onClose} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={styles.btnModal}>Chọn Ngày</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity onPress={showTimepicker}>
                <Text style={styles.btnModal}>Chọn Giờ</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                 <Divider />
                <TouchableOpacity 
                style={{justifyContent: 'center',backgroundColor: "green", borderRadius: 5,}}
                onPress={handleSave}>
                <Text style={{...styles.btnModal, textAlign:"center", color:'#fff'}}>Lưu</Text>
                </TouchableOpacity>
                {/* Display notification success message */}
                {notificationSuccess && (
                    <Text style={styles.successMessage}>Thiết lập thông báo thành công!</Text>
                )}
            </View>
        </Modal>
    );
};

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
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
                    notificationTime: data.notificationTime || null,
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

    const handleSetNotification = (id) => {
        setSelectedAppointmentId(id);
        setNotificationModalVisible(true);
    };

    const handleNotificationSave = () => {
        setNotificationModalVisible(false);
    };

    const handleNotificationClose = () => {
        setNotificationModalVisible(false);
    };

    const renderItem = ({ item }) => {
        if (item.status === 'pending') {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Tên Vaccine:</Text>
                        <Text>{item.vaccineName}</Text>
                    </View>
                    <Divider />
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Thời gian Tiêm:</Text>
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
                        <Text style={styles.label}>Ngày Hẹn:</Text>
                        <Text>{item.vaccinationDate}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)}>
                        <Text style={styles.deleteButton}>Hủy Hẹn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSetNotification(item.id)}>
                        <Text style={{ ...styles.deleteButton, backgroundColor: "green" }}>Đặt Thông Báo</Text>
                    </TouchableOpacity>
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

    const handleDeleteAppointment = async (id) => {
        try {
            const confirmed = await new Promise((resolve) => {
                Alert.alert(
                    'Bạn có chắc chắn muốn hủy lịch hẹn không?',
                    null,
                    [
                        {
                            text: 'Quay Lại',
                            onPress: () => resolve(false),
                            style: 'cancel',
                        },
                        {
                            text: 'Hủy',
                            onPress: () => resolve(true),
                            style: 'destructive',
                        },
                    ],
                    { cancelable: false }
                );
            });

            if (confirmed) {
                await firestore().collection('MakeAppointments').doc(id).delete();
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
            } else {
                console.log('Hủy bỏ việc xóa.');
            }
        } catch (error) {
            console.error('Lỗi khi xóa lịch hẹn: ', error);
            Alert.alert('Xóa lịch hẹn thất bại. Vui lòng thử lại sau.');
        }
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
                        <Text style={styles.noAppointmentText}>Chưa có lịch hẹn nào</Text>
                    </View>
                }
            />
            {notificationModalVisible && (
                <NotificationModal
                    id={selectedAppointmentId}
                    onSave={handleNotificationSave}
                    visible={notificationModalVisible}
                    onClose={handleNotificationClose}
                    userEmail={userEmail}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 40,
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    successMessage: {
        marginTop: 10,
        color: 'green',
        textAlign: 'center',
    },
    btnModal: {
        padding: 10,
       textAlign: 'center',

    }
});

export default Appointment;