import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { dan_toc } from '../../data/Nation.json';
import { quoc_gia } from '../../data/Country.json';
import { dvhcvn } from '../../data/dvhcvn.json';
import { UserContext } from '../../context/UseContext';

const provinces = dvhcvn.map(level1 => ({
  id: level1.level1_id,
  name: level1.name,
  districts: level1.level2s.map(level2 => ({
    id: level2.level2_id,
    name: level2.name,
    communes: level2.level3s.map(level3 => ({
      id: level3.level3_id,
      name: level3.name
    }))
  }))
}));


const Insert = () => {
  const { userInfo } = useContext(UserContext);
  const userEmail = userInfo?.email || '';
  const [relationship, setRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedNation, setSelectedNation] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [detail, setDetail] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [loading, setLoading] = useState(true);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateChange = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const provincesData = dvhcvn.map(level1 => ({
        id: level1.level1_id,
        name: level1.name,
        districts: level1.level2s.map(level2 => ({
          id: level2.level2_id,
          name: level2.name,
          communes: level2.level3s.map(level3 => ({
            id: level3.level3_id,
            name: level3.name
          }))
        }))
      }));
      setProvinces(provincesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching provinces: ', error);
      setLoading(false);
    }
  };

  const handleAddVaccineRecord = () => {
    if (!relationship || !phoneNumber || !fullName || !selectedDate || !selectedCountry || !selectedNation || !selectedProvince || !selectedDistrict || !selectedCommune || !detail) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }
  
    if (!selectedDate instanceof Date || isNaN(selectedDate.getTime())) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày sinh hợp lệ.');
      return;
    }
  
    // Tìm tên quốc gia và dân tộc tương ứng dựa trên ID
    const selectedCountryName = quoc_gia.find(country => country.id === selectedCountry)?.name || '';
    const selectedNationName = dan_toc.find(nation => nation.id === selectedNation)?.name || '';
  
    // Tìm tên tỉnh/thành phố, quận/huyện và xã/phường/thị trấn tương ứng dựa trên ID
    const selectedProvinceName = provinces.find(province => province.id === selectedProvince)?.name || '';
    const selectedDistrictName = districts.find(district => district.id === selectedDistrict)?.name || '';
    const selectedCommuneName = communes.find(commune => commune.id === selectedCommune)?.name || '';
  
    firestore()
      .collection('Vaccinerecord')
      .add({
        userEmail,
        relationship,
        phoneNumber,
        fullName,
        selectedDate: selectedDate.toISOString(),
        selectedCountry: { id: selectedCountry, name: selectedCountryName },
        selectedNation: { id: selectedNation, name: selectedNationName },
        selectedProvince: { id: selectedProvince, name: selectedProvinceName },
        selectedDistrict: { id: selectedDistrict, name: selectedDistrictName },
        selectedCommune: { id: selectedCommune, name: selectedCommuneName },
        detail,
      })
      .then(() => {
        Alert.alert('Thông báo', 'Hồ sơ đã được thêm thành công');
        resetFields();
      })
      .catch(error => {
        console.error('Lỗi khi thêm hồ sơ: ', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm hồ sơ, vui lòng thử lại sau');
      });
  };
  
  

  const resetFields = () => {
    setRelationship('');
    setPhoneNumber('');
    setFullName('');
    setSelectedDate('');
    setSelectedCountry('');
    setSelectedNation('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedCommune('');
    setDetail('');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.label}>Quan hệ với người đăng ký (*)</Text>
            <TextInput
              style={styles.TextInputContainer}
              value={relationship}
              onChangeText={setRelationship}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Số điện thoại (*)</Text>
            <TextInput
              style={styles.TextInputContainer}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Họ và tên (*)</Text>
            <TextInput
              style={styles.TextInputContainer}
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
          </View>
          <View style={styles.form}>
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', marginRight: 20 }}>
              <Text style={styles.label}>Ngày sinh (*)</Text>
              <TouchableOpacity
                style={{}}
                onPress={showDatePicker}>
                <Text style={{ fontSize: 15 }}>Chọn ngày sinh: {selectedDate.toString()}</Text>

              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                dateLocale="vi"
                onConfirm={handleDateChange}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View style={styles.form}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Quốc gia (*)</Text>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={selectedCountry}
                  onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                >
                  <Picker.Item label="Chọn quốc gia" value="" />
                  {quoc_gia.map(country => (
                    <Picker.Item key={country.id} label={country.name} value={country.id} />
                  ))}
                </Picker>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Dân tộc (*)</Text>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={selectedNation}
                  onValueChange={(itemValue) => setSelectedNation(itemValue)}
                >
                  <Picker.Item label="Chọn dân tộc" value="" />
                  {dan_toc.map(item => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Tỉnh/Thành phố (*)</Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedProvince}
              onValueChange={(itemValue) => {
                setSelectedProvince(itemValue);
                // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
                const selectedProvinceData = provinces.find(province => province.id === itemValue);
                if (selectedProvinceData) {
                  setDistricts(selectedProvinceData.districts);
                  // Reset giá trị quận/huyện và xã/phường/thị trấn đã chọn
                  setSelectedDistrict('');
                  setSelectedCommune('');
                } else {
                  setDistricts([]);
                  setCommunes([]);
                }
              }}
            >
              <Picker.Item label="Chọn tỉnh thành" value="" />
              {provinces.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Quận/Huyện (*)</Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedDistrict}
              onValueChange={(itemValue) => {
                setSelectedDistrict(itemValue);
                const selectedDistrictData = districts.find(district => district.id === itemValue);
                if (selectedDistrictData) {
                  setCommunes(selectedDistrictData.communes);

                  setSelectedCommune('');
                } else {
                  setCommunes([]);
                }
              }}
            >
              <Picker.Item label="Chọn quận/huyện" value="" />
              {districts.map(district => (
                <Picker.Item key={district.id} label={district.name} value={district.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Xã/Phường/Thị Trấn (*)</Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedCommune}
              onValueChange={(itemValue) => setSelectedCommune(itemValue)}
            >
              <Picker.Item label="Chọn xã/phường/thị trấn" value="" />
              {communes.map(commune => (
                <Picker.Item key={commune.id} label={commune.name} value={commune.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Chi tiết (*)</Text>
            <TextInput
              style={styles.TextInputContainer}
              value={detail}
              onChangeText={text => setDetail(text)}
            />
          </View>
          <View style={styles.form}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={handleAddVaccineRecord}>
              <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Thêm hồ sơ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 10,
  },
  form: {
    marginVertical: 5,
    color:'black'
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color: 'black'
  },
  pickerStyle: {
    backgroundColor: 'transparent',
    borderColor: '#87A7FF',
    borderWidth: 1,
    borderRadius: 10,
    color:'black',
  },
  TextInputContainer: {
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: '#87A7FF',
    borderWidth: 1,
    color:'black'
  },
  ButtonContainer: {
    margin: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: '#87A7FF',
  }
});

export default Insert;
