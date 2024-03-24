import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'; // Thêm Alert vào import
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as RNLocalize from 'react-native-localize';

const Insert = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  const [gender, setGender] = useState('');
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  // const [nation, getNation] = useState('');


  const [nation, setNations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedNation, setSelectedNation] = useState('');
  const [selectedCountries, setSelectedCountries] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    hideDatePicker();
   
     
    
  };

  useEffect(() => {
    
    // Fetch nations from Firestore
    const nationsRef = firestore().collection('nation');
    nationsRef.get().then(querySnapshot => {
      const fetchedNations = [];
      querySnapshot.forEach(doc => {
        fetchedNations.push({ id: doc.id, ...doc.data() });
      });
      setNations(fetchedNations);
    }).catch(error => {
      console.log('Error fetching nations: ', error);
    });

    // Fetch ethnicities from Firestore
    const countriesRef = firestore().collection('countries');
    countriesRef.get().then(querySnapshot => {
      const fetchedcountries = [];
      querySnapshot.forEach(doc => {
        fetchedcountries.push({ id: doc.id, ...doc.data() });
      });
      setCountries(fetchedcountries);
    }).catch(error => {
      console.log('Error fetching ethnicities: ', error);
    });
  }, []);


  return (
    
    <View style={styles.container}>
         <SafeAreaView>
         <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.label}>Quan hệ với người đăng ký (*)</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Chọn quan hệ" value="" />
          <Picker.Item label="Con trai" value="male" />
          <Picker.Item label="Con gái" value="female" />
        </Picker>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Số điện thoại (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Họ và tên (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <View style={{flexDirection:'row', paddingTop:10, paddingBottom:10, justifyContent:'space-between', marginRight:20}}>
        <Text style={styles.label}>Ngày sinh (*)</Text>
            <TouchableOpacity 
            style={{}}
            onPress={showDatePicker}>
            <Text style={{fontSize:15}}>Chọn ngày sinh: {selectedDate.toLocaleDateString('vi')}</Text>
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
          <Text style={styles.label}>Quốc tịch (*)</Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={selectedCountries}
            onValueChange={(itemValue) => setSelectedCountries(itemValue)}
          >
            <Picker.Item label="Chọn" value="" />
            {countries.map(countries => (
              <Picker.Item key={countries.id} label={countries.name} value={countries.id} />
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
            {nation.map(nation => (
              <Picker.Item key={nation.id} label={nation.name} value={nation.id} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
    <View style={styles.form}>
        <Text style={styles.label}>Tỉnh/Thành Phố (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Quận/Huyện (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Xã/Phường/Thị Trấn (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Chi tiết (*)</Text>
        <TextInput
          style={styles.TextInputContainer}
          label=""
          value={text}
          underlineColor="transparent"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.ButtonContainer}>
          <Text style={{color:'#fff', fontSize:15, textAlign:'center', fontWeight:'bold'}}>Thêm hồ sơ</Text>
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
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color:'black'
  },
  pickerStyle: {
    backgroundColor: 'transparent',
    borderColor: '#87A7FF',
    borderWidth: 1,
    borderRadius: 10,
  },
  TextInputContainer: {
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: '#87A7FF',
    borderWidth: 1,
  },
  ButtonContainer:{
    margin: 10,
    padding:20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: '#87A7FF',
  }
});

export default Insert;
