import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../context/UseContext';

const VaccinationRecord = ({ navigation }) => {
    const [vaccineRecords, setVaccineRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';
    const [modalVisible, setModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    useEffect(() => {
        const currentUser = auth().currentUser;

        if (currentUser) {
            const userEmail = currentUser.email;

            const unsubscribe = firestore().collection('Vaccinerecord')
                .where('userEmail', '==', userEmail)
                .onSnapshot(snapshot => {
                    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setVaccineRecords(records);
                });

            return () => unsubscribe();
        }
    }, [userEmail]);    

    useEffect(() => {
        if (recordToDelete) {
            deleteRecord(recordToDelete);
        }
    }, [recordToDelete]);

    const deleteRecord = async (recordId) => {
        try {
            await firestore().collection('Vaccinerecord').doc(recordId).delete();
        } catch (error) {
            console.error("Error removing document: ", error);
            Alert.alert("An error occurred while deleting the record. Please try again later.");
        } finally {
            setRecordToDelete(null);
            setModalVisible(false);
        }
    };

    const confirmDelete = (recordId) => {
        Alert.alert(
            "Xóa Hồ Sơ",
            "Bạn có chắc chắn muốn xóa hồ sơ này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: () => setRecordToDelete(recordId)
                }
            ]
        );
    };

    const editRecord = (recordId) => {
        navigation.navigate('Update', { recordId: recordId });
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedRecord(null);
    };

    const renderModal = () => {
        if (!selectedRecord) return null;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.headerText}>Chi tiết hồ sơ</Text>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Họ và tên: </Text>
                            <Text>{selectedRecord.fullName}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Ngày sinh: </Text>
                            <Text>{new Date(selectedRecord.selectedDate).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Số điện thoại: </Text>
                            <Text>{selectedRecord.phoneNumber}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Mối quan hệ: </Text>
                            <Text>{selectedRecord.relationship}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Chi tiết địa điểm: </Text>
                            <Text>{selectedRecord.detail}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Xã/Phường: </Text>
                            <Text>{selectedRecord.selectedCommune.name}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Quận/Huyện: </Text>
                            <Text>{selectedRecord.selectedDistrict.name}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Tỉnh/Thành phố: </Text>
                            <Text>{selectedRecord.selectedProvince.name}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={closeModal} style={[styles.button, styles.closeButton]}>
                                <Text style={styles.buttonText}>Đóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => editRecord(selectedRecord.id)} style={[styles.button, styles.editButton]}>
                                <Text style={styles.buttonText}>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => confirmDelete(selectedRecord.id)} style={[styles.button, styles.deleteButton]}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.recordItem}>
            <TouchableOpacity
                onPress={() => {
                    setSelectedRecord(item);
                    setModalVisible(true);
                }}
                style={styles.recordDetail}>
                <Text style={styles.fullName}>Họ và tên: {item.fullName}</Text>
                <Text style={styles.detailText}>Ngày sinh: {item.selectedDate ? new Date(item.selectedDate).toLocaleDateString('vi-VN') : ''}</Text>

            </TouchableOpacity>
        </View>
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
            {renderModal()}
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
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    fullName: {
        color:'black',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
    },
    detailText: {
        fontSize: 16,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    flatList: {
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Độ mờ của background modal
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '80%',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: 20,
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 4
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    closeButton: {
        backgroundColor: '#007BFF',
    },
    editButton: {
        backgroundColor: '#FFD700', // Màu vàng
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});

export default VaccinationRecord;
