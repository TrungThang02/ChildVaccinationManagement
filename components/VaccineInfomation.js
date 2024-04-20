// VaccineDetails.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const VaccineDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();

    const removeDiacritics = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

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

                setNewsData(newsList);
                setFilteredData(newsList);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredNewsData = newsData.filter(item =>
            removeDiacritics(item.title.toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase()))
        );
        setFilteredData(filteredNewsData);
    }, [searchQuery, newsData]);

    const Item = ({ title, image, description }) => (
        <TouchableOpacity onPress={() => navigateToDetails(title, image, description)} style={styles.item}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={{ marginLeft: 10, width: 200 }}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const navigateToDetails = (title, image, description) => {
        navigation.navigate('NewsDetailScreen', { title, image, description });
    };

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ padding: 10, alignItems: 'center', backgroundColor: '#87A7FF' }}>
                <Text style={{ fontFamily: 'Arial', fontSize: 18, fontWeight: '600', fontWeight: 'bold', color: '#fff' }}>Thông tin tiêm chủng</Text>
            </View>
            <View style={styles.search}>
                <Searchbar
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: '#87A7FF',
                        borderWidth: 1,
                        borderRadius: 10
                    }}
                    placeholder="Tìm kiếm thông tin..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
            <SafeAreaView>
                <FlatList
                    style={{ marginBottom: 200 }}
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Item title={item.title} image={item.image} description={item.description} />
                    )}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
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
        marginRight: 10,
        textAlign: 'left',
    },
    search: {
        padding: 15,
        paddingBottom: 5,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
});

export default VaccineDetails;
