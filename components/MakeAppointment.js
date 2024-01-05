import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Searchbar, Appbar } from 'react-native-paper';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Phong Kham Da Khoa',
        title: 'Binh Duong',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Phong Kham Da Khoa',
        title: 'TH. HCM',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Phong Kham Da Khoa',
        title: 'Vinh Long',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d7t2',
        name: 'Phong Kham Da Khoa',
        title: 'Vinh Long',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d2',
        name: 'Phong Kham Da Khoa',
        title: 'Vinh Long',
    },
];

const Item = ({ title, name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.name}>{title}</Text>
      
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Xem chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#87A7FF' }]}
            >
                <Text style={[styles.buttonText, { color: 'white' }]}>Đặt lịch</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const MakeAppointment = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
             <View style={{ padding: 10, alignItems: 'center', backgroundColor:'#87A7FF'}}>
                <Text style={{ fontFamily: 'Arial', fontSize: 18, fontWeight: '600', fontWeight:'bold', color:'#fff'}}>ĐẶT LỊCH TIÊM</Text>
            </View>
           
            <View style={styles.search}>
                <Searchbar
                    style={{backgroundColor:'transparent',
                            borderColor:'#87A7FF',
                            borderWidth:1,
                            borderRadius:10
                        }}
                    placeholder="Tìm kiếm địa điểm..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <SafeAreaView>
                <FlatList
                style={{marginBottom:200}}
                    data={DATA}
                    renderItem={({ item }) => (
                        <Item title={item.title} name={item.name} />
                    )}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: {width: -2, height: 4},  
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 20,
        width: '45%',
        borderWidth: 1,
        borderColor: '#87A7FF',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
    },
    search:{
        padding:15,
        paddingBottom:5,
    }
});

export default MakeAppointment;
