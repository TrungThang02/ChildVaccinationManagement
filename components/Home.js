import 'react-native-gesture-handler'
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card } from 'react-native-paper';
import MakeAppointment from './MakeAppointment';


const Home = ({ navigation }) => {
    const data = [
        { 
            id: '1', 
            title: 'Lịch tiêm vac-xin cho trẻ em từ 10 đến 30 tháng tuổi', 
            image :'https://upload.wikimedia.org/wikipedia/vi/c/c3/Vaccin_cum.jpg',
            content: 'Dưới đây là lịch tiêm chủng đầy đủ cho trẻ theo chương trình tiêm chủng mở rộng và tiêm chủng dịch vụ theo từng tháng, phụ huynh nhất định phải ghi nhớ hoặc lưu lại để đảm bảo bé được tiêm chủng vắc xin đủ mũi, đúng lịch' 
        },
        { 
            id: '2', 
            title: 'Card 1', 
            image :'https://upload.wikimedia.org/wikipedia/vi/c/c3/Vaccin_cum.jpg',
            content: 'Dưới đây là lịch tiêm chủng đầy đủ cho trẻ theo chương trình tiêm chủng mở rộng và tiêm chủng dịch vụ theo từng tháng, phụ huynh nhất định phải ghi nhớ hoặc lưu lại để đảm bảo bé được tiêm chủng vắc xin đủ mũi, đúng lịch' 
        },
        { 
            id: '3', 
            title: 'Card 1', 
            image :'https://upload.wikimedia.org/wikipedia/vi/c/c3/Vaccin_cum.jpg',
            content: 'Dưới đây là lịch tiêm chủng đầy đủ cho trẻ theo chương trình tiêm chủng mở rộng và tiêm chủng dịch vụ theo từng tháng, phụ huynh nhất định phải ghi nhớ hoặc lưu lại để đảm bảo bé được tiêm chủng vắc xin đủ mũi, đúng lịch' 
        },
        
    ];

    const handlerAlert = () => {
        navigation.navigate("Notification")
    }
    return (
        <SafeAreaView style={styles.container}>


            {/* <View style={styles.container}>  */}
            <View style={styles.header}>
                <View>
                    <Avatar.Image size={45} source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'black' }}>Xin chào</Text>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Tran Trung Thang !</Text>
                </View>
                <View style={{ alignItems: 'flex-end', width: 175 }}>
                    <TouchableOpacity onPress={handlerAlert}>
                        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/366/210/original/bell-icon-transparent-notification-free-png.png' }} height={45} width={45} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.banner}>
                        <TouchableOpacity style={{ ...styles.control, backgroundColor: '#F28076' }} >
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/calendar.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Lịch tiêm chủng</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity  
                        onPress={ ()=> navigation.navigate("MakeAppointment")}
                        style={{ ...styles.control, backgroundColor: '#2D99AE' }}>
                            <View style={styles.imagebanner}>
                                <Image style={styles.imagebanner} source={require('../assets/images/datlich.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Đặt lịch tiêm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>

                    <View style={styles.banner}>
                    <TouchableOpacity  style={{ ...styles.control, backgroundColor: '#fe6d73' }}>
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/nhatky.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Nhật ký tiêm chủng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.control, backgroundColor: '#50b2c0' }} >
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/danhmuc.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Danh mục Vắc xin</Text>
                            </View>
                        </TouchableOpacity>

                        
                    </View>
                </View>
                <View>

                    <TouchableOpacity  style={styles.banner}>
                        <TouchableOpacity 
                        onPressIn={()=> navigation.navigate("VaccinationRecord")}
                        style={{ ...styles.control, backgroundColor: '#de4d86' }} >
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/hoso.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Hồ sơ tiêm chủng</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=> navigation.navigate("ContactInfo")}
                        style={{ ...styles.control, backgroundColor: '#3376bc' }}>
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/lienhe.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Thông tin liên hệ</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.feature}>

                    <View style={{...styles.news, padding:10, paddingBottom:0 }}>
                        <Text style={{fontWeight:'bold', color:'#333'}}>Thông tin tiêm chủng</Text>
                    </View>
                    <View style={{ ...styles.news, marginBottom: 50 }}>
                        <FlatList
                            data={data}
                            horizontal
                            showsHorizontalScrollIndicator={false} 
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <Image 
                                    style={{borderRadius:5}}
                                    source ={{
                                        uri: item.image
                                    }}
                                    height={100}/>
                                    <Text style={styles.cardContent}> {item.title.split(' ').slice(0, 15).join(' ')}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3'

    },
    header: {
        padding: 15,
        flexDirection: 'row',


    },
    control: {
        height: 150,
        width: "50%",
        margin: 10,
        marginBottom: 0,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',

        borderRadius: 15,

    },
    banner: {
        padding: 10,
        paddingBottom: 0,
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 0



    },
    imagebanner:{
        width: 50,
        height:50,
    },
    textbanner: {
        color: 'white',
        fontWeight: '500',
        marginTop: 5,
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 15
    },



    card: {
        width: 180, 
        margin: 10,
        marginBottom:100,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 180,
        overflow: 'hidden',
        objectFit: 'cover',
       
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
       
        fontSize: 14,
        padding:10,
        color:'#333',
     
       
    },
})
export default Home;