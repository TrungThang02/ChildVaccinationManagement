import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';
import { useNavigation } from '@react-navigation/native';
const Home = ({ navigation }) => {
    const { userInfo } = useContext(UserContext);
    const userEmail = userInfo?.email || '';
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsRef = firestore().collection('news');
                const snapshot = await newsRef.get();

                const newsList = [];
                snapshot.forEach(doc => {
                    const { title, image, description } = doc.data();
                    newsList.push({
                        id: doc.id,
                        title,
                        image,
                        description
                    });
                });

                setData(newsList);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

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
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>{userEmail}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', width: 175}}>
                    <TouchableOpacity 
                    style={{marginRight:20}}
                    onPress={handlerAlert}>
                        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/366/210/original/bell-icon-transparent-notification-free-png.png' }} height={45} width={45} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.banner}>
                        <TouchableOpacity 
                        onPress={ ()=> navigation.navigate("VaccinationSchedule")}
                        style={{ ...styles.control, backgroundColor: '#F28076' }} >
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
                    <TouchableOpacity  
                       onPress={ ()=> navigation.navigate("VaccinationLog")}
                    style={{ ...styles.control, backgroundColor: '#fe6d73' }}>
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/nhatky.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Nhật ký tiêm chủng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                         onPress={ ()=> navigation.navigate("VaccineList")}
                        style={{ ...styles.control, backgroundColor: '#50b2c0' }} >
                            <View style={styles.imagebanner}>
                            <Image style={styles.imagebanner} source={require('../assets/images/danhmuc.png')} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Danh sách Vắc xin</Text>
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
                    </View>
                    <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false} 
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NewsDetailScreen', { title: item.title, image: item.image, description: item.description })}>
                        <Image 
                            style={{borderRadius: 5, width: '100%', height: 100}}
                            source={{ uri: item.image }}
                        />
                        <Text style={styles.cardContent}>{item.title.split(' ').slice(0, 15).join(' ')}</Text>
                    </TouchableOpacity>
                )}
            />
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
        marginBottom: 100,
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 180,
        overflow: 'hidden',
        objectFit: 'cover',
    },
    cardContent: {
        fontSize: 14,
        padding: 10,
        color: '#333',
    },
});

export default Home;
