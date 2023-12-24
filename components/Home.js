import 'react-native-gesture-handler'
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView , FlatList,TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card } from 'react-native-paper';



const Home = () => {
    const data = [
        { id: '1', title: 'Card 1', content: 'Hãy đảm bảo bạn không lồng ghép một NavigationContainer hoặc điều hướng trong một điều hướng khác hoặc thành phần Screen. Cấu trúc điều hướng của bạn nên được tổ chức với một NavigationContainer ở mức cao nhất,' },
        { id: '2', title: 'Card 2', content: 'Content of Card 2' },
        { id: '3', title: 'Card 3', content: 'Content of Card 3' },
        // Add more data as needed
      ];
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* <View style={styles.container}>  */}
                <View style={styles.header}>
                    <View>
                        <Avatar.Image size={45} source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: 'black' }}>Xin chào</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Tran Trung Thang !</Text>
                    </View>
                </View>
                {/* </View> */}

                <View>
                    <View style={styles.banner}>
                        <TouchableOpacity style={{ ...styles.control, backgroundColor: '#A8DF8E' }} onPress={()=> alert("Bấm vào")}>
                            <View style={styles.imagebanner}>
                                <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Khai báo y tế</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ ...styles.control, backgroundColor: '#80B3FF' }}>
                            <View style={styles.imagebanner}>
                                <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Chứng nhận Tiêm chủng</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.control, backgroundColor: '#FF6666' }}>
                            <View style={styles.imagebanner}>
                                <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                            </View>
                            <View>
                                <Text style={styles.textbanner}>Tư vấn sức khỏe</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.feature}>
                    <View>
                        <View style={styles.banner}>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/26/08/49/injection-5342099_960_720.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Khai báo y tế</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Chứng nhận Tiêm chủng</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Tư vấn sức khỏe</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.banner}>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/26/08/49/injection-5342099_960_720.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Khai báo y tế</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Chứng nhận Tiêm chủng</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Tư vấn sức khỏe</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.banner}>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/26/08/49/injection-5342099_960_720.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Khai báo y tế</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Chứng nhận Tiêm chủng</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Tư vấn sức khỏe</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.banner}>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/26/08/49/injection-5342099_960_720.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Khai báo y tế</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Chứng nhận Tiêm chủng</Text>
                                </View>
                            </View>
                            <View style={styles.controlfeature}>
                                <View style={styles.imagefeature}>
                                    <Avatar.Image size={50} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                                </View>
                                <View>
                                    <Text style={styles.textfeature}>Tư vấn sức khỏe</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.news}>
                        <Text>Cẩm nang y tế</Text>
                    </View>
                    <View style={{...styles.news, marginBottom: 50}}>
                    <FlatList
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardContent}>{item.content}</Text>
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
        backgroundColor: 'white'

    },
    header: {
        padding: 15,
        flexDirection: 'row',


    },
    control: {
        height: 150,
        width: 110,
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center',
        // justifyContent:'center',
        borderRadius: 15,

    },
    banner: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20


    },
    imagebanner: {
        height: 50,

    },
    textbanner: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 15
    },
    feature: {
        padding: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#f3f3f3',


    },
    imagefeature: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: 'white',
        overflow: 'hidden',
        objectFit: 'cover',
        borderRadius: 50,
        padding: 5
    },
    controlfeature: {
        height: 100,
        width: 110,
        alignItems: 'center',
        // justifyContent:'center',
        borderRadius: 10,
    },
    textfeature: {
        color: 'black',
        fontWeight: '400',
        marginTop: 10,
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 15
    },
    card: {
        width: 200, // Độ rộng của thẻ
        margin: 10,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        height: 200,
        overflow: 'hidden',
        objectFit: 'cover'
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      cardContent: {
        fontSize: 14,
        paddingBottom: 10
      },
})
export default Home;