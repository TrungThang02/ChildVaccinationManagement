import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { UserContext } from '../context/UseContext';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';


const VaccinationLog = () => {
    const [appointments, setAppointments] = useState([]);
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        setSelectedMonth((currentDate.getMonth() + 1).toString());
        setSelectedYear(currentDate.getFullYear().toString());
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [userEmail, selectedMonth, selectedYear]);

    const fetchAppointments = async () => {
        try {
            let query = firestore().collection('MakeAppointments').where('email', '==', userEmail);

            if (selectedMonth !== '' && selectedYear !== '') {
                if (selectedMonth === 'all' && selectedYear === 'all') {
                    query = query.orderBy('vaccinationDate', 'asc');
                } else if (selectedMonth === 'all') {
                    query = query.where('vaccinationDate', '>=', new Date(parseInt(selectedYear), 0, 1)).where('vaccinationDate', '<=', new Date(parseInt(selectedYear), 11, 31, 23, 59, 59));
                } else {
                    const startDate = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, 1);
                    const endDate = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0, 23, 59, 59);
                    query = query.where('vaccinationDate', '>=', startDate).where('vaccinationDate', '<=', endDate);
                }
            }

            const snapshot = await query.get();

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
        }
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    const handleViewAll = () => {
        setSelectedMonth('all');
        setSelectedYear('all');
    };

    const renderItem = ({ item }) => {
        if (item.status === 'done') {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Tên vaccine:</Text>
                        <Text>{item.vaccineName}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Thời gian:</Text>
                        <Text>{item.vaccinationTime}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Tên:</Text>
                        <Text>{item.patientName}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Tuổi:</Text>
                        <Text>{calculateAge(item.patientDOB)}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Ngày tiêm:</Text>
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
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => handleMonthChange(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Tất cả" value="all" />
                    <Picker.Item label="Tháng 1" value="1" />
                    <Picker.Item label="Tháng 2" value="2" />
                    <Picker.Item label="Tháng 3" value="3" />
                    <Picker.Item label="Tháng 4" value="4" />
                    <Picker.Item label="Tháng 5" value="5" />
                    <Picker.Item label="Tháng 6" value="6" />
                    <Picker.Item label="Tháng 7" value="7" />
                    <Picker.Item label="Tháng 8" value="8" />
                    <Picker.Item label="Tháng 9" value="9" />
                    <Picker.Item label="Tháng 10" value="10" />
                    <Picker.Item label="Tháng 11" value="11" />
                    <Picker.Item label="Tháng 12" value="12" />
                </Picker>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => handleYearChange(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="2021" value="2021" />
                    <Picker.Item label="2022" value="2022" />
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2025" value="2025" />
                    <Picker.Item label="2026" value="2026" />
                </Picker>
            </View>
            
            <TouchableOpacity 
            style={{padding:15, 
                    backgroundColor:'#87A7FF',
                    marginBottom:10,
                    borderRadius:10,
                }}
            onPress={handleViewAll}>
                <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:16}}>Xem tất cả</Text>
            </TouchableOpacity>

            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text>Nhật ký trống</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
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
});

export default VaccinationLog;
