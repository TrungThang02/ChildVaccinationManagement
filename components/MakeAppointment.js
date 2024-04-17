import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView, Modal, TouchableHighlight, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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
        selectedDate: new Date(),
    });
    const [datePickerVisible, setDatePickerVisible] = useState(false);

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
        // Lưu thời điểm bạn đặt lịch
        const bookedTime = new Date();

        setSelectedAppointment(appointmentId);
        setVaccineInfo(prevState => ({
            ...prevState,
            vaccineName: vaccineName,
            vaccinationTime: vaccinationTime,
            bookedTime: bookedTime, // Lưu thời điểm bạn đặt lịch vào state
           
        }));
        
        setModalVisible(true);

        // Gửi email nhắc nhở sau 3 phút
        setTimeout(() => {
            sendReminderEmail(bookedTime); // Truyền thời điểm bạn đặt lịch vào hàm gửi email nhắc nhở
        }, 180000); // 3 phút = 180000 milliseconds
    };

    const handleConfirmAppointment = () => {
        if (!selectedAppointment || !vaccineInfo.selectedPatient || !vaccineInfo.selectedDate) {
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
            vaccinationDate: vaccineInfo.selectedDate,
            status: "pending",
            email : userEmail
        })
        .then(() => {
            console.log('Appointment successfully booked');

            // Gửi email
            sendAppointmentEmail();
            sendReminderEmail();
            setModalVisible(false);
            alert('Đặt lịch thành công!');
        })
        .catch(error => {
            console.error('Error adding document: ', error);
            alert('Đã xảy ra lỗi khi đặt lịch.');
        });
    };

    const sendAppointmentEmail = async () => {
        
    try {
        const appointmentDetails = {
            vaccineName: vaccineInfo.vaccineName,
            vaccinationTime: vaccineInfo.vaccinationTime,
            patientName: vaccineInfo.selectedPatient.fullName,
            patientDOB: vaccineInfo.selectedPatient.selectedDate,
            vaccinationDate: vaccineInfo.selectedDate.toLocaleDateString()
        };
        const formattedDOB = new Date(appointmentDetails.patientDOB).toLocaleDateString('vi-VN');

        // Construct HTML content
        const htmlContent = `
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
                    
                }
              .content{
                padding: 20px
              }
                h1 {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #007bff;
                }
                p {
                    margin-bottom: 10px;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .highlight {
                    font-weight: bold;
                    color: black;
                }
                .info {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
              <div style="padding: 10px; background:#bad5e4">
                 <h1 style="text-align:center;color:black">PHIẾU ĐẶT LỊCH TIÊM CHỦNG</h1>
              </div>
              <div class="content">
                <p><span class="highlight">Tên Vaccine:</span> ${appointmentDetails.vaccineName}</p>
                <p><span class="highlight">Thời gian tiêm:</span> ${appointmentDetails.vaccinationTime}</p>
                <p><span class="highlight">Họ và tên:</span> ${appointmentDetails.patientName}</p>
                <p><span class="highlight">Ngày sinh:</span> ${formattedDOB}</p>
                <p><span class="highlight">Ngày tiêm:</span> ${appointmentDetails.vaccinationDate}</p>
            </div>
              </div>
        </body>
    </html>
`;

        // Send email using axios
        const response = await axios.post('http://192.168.1.3:3001/send-email', {
            recipient: userEmail, 
            subject: 'Xác nhận đặt lịch tiêm chủng',
            html: htmlContent
        });
        
        console.log(response.data); // Log response data
    } catch (error) {
        console.error('Error sending appointment email:', error);
    }
};

    const sendReminderEmail = async (bookedTime) => {
    try {
        // Tính thời gian từ lúc đặt lịch đến thời điểm hiện tại
        const currentTime = new Date();
        const timeDiff = currentTime - bookedTime;
        const timeDiffMinutes = Math.floor(timeDiff / 60000); // Chuyển đổi sang phút

        // Nếu bạn muốn gửi email nhắc nhở tối muộn, bạn có thể kiểm tra thời gian ở đây
        if (timeDiffMinutes >= 60) {
            // Construct HTML content
            const htmlContent = `
            <html>
            <head>
            </head>
            <body>
               <h1>Đây là email nhắc nhở</h1>
            </body>
            </html>
            `;

            // Send email using axios
            const response = await axios.post('http://192.168.1.3:3001/send-email', {
                recipient: userEmail, 
                subject: 'Nhắc nhở đặt lịch tiêm chủng',
                html: htmlContent
            });
            
            console.log(response.data); // Log response data
        }
    } catch (error) {
        console.error('Error sending appointment email:', error);
    }
};

    const renderDatePicker = () => {
        const today = new Date();
        const selectedDate = vaccineInfo.selectedDate || new Date();

        if (Platform.OS === 'ios') {
            return (
                <DateTimePicker
                    value={selectedDate}
                    minimumDate={today}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                        setDatePickerVisible(false);
                        if (date) {
                            setVaccineInfo(prevState => ({
                                ...prevState,
                                selectedDate: date,
                            }));
                        }
                    }}
                />
            );
        } else {
            return (
                <DateTimePicker
                    value={selectedDate}
                    minimumDate={today}
                    mode="date"
                    onChange={(event, date) => {
                        setDatePickerVisible(false);
                        if (date) {
                            setVaccineInfo(prevState => ({
                                ...prevState,
                                selectedDate: date,
                            }));
                        }
                    }}
                />
            );
        }
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
            <Text style={styles.patientRecordText}>Tên: {item.fullName}</Text>
            <Text style={styles.patientRecordText}>Ngày sinh: {new Date(item.selectedDate).toLocaleDateString()}</Text>
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
                        <Text style={styles.modalText}>Chọn hồ sơ tiêm chủng:</Text>
                        <FlatList
                            data={patientRecords}
                            renderItem={renderPatientRecordItem}
                            keyExtractor={item => item.id}
                        />
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => setDatePickerVisible(true)}
                        >
                            <Text style={styles.textStyle}>Chọn ngày</Text>
                        </TouchableOpacity>
                        {datePickerVisible && renderDatePicker()}
                        <Text style={styles.selectedDateText}>
                            {vaccineInfo.selectedDate ? `Ngày chọn: ${vaccineInfo.selectedDate.toLocaleDateString()}` : 'Chưa chọn ngày'}
                        </Text>
                        
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={handleConfirmAppointment}
                        >
                            <Text style={styles.textStyle}>Xác nhận đặt lịch</Text>
                        </TouchableHighlight>
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
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      
    },
    patientRecordText: {
        fontSize: 16,
        
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 350,
        height:800,
        padding:50,
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
        width:200,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
       
        textAlign: 'center'
    },
    selectedDateText: {
        marginTop: 10,
        fontSize: 16,
    }
});

export default MakeAppointment;
