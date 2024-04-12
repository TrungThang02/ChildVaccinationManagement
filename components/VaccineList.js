import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { WebView } from 'react-native-webview';

const VaccineList = () => {
  const [vaccineData, setVaccineData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [showWebView, setShowWebView] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('vaccinelist')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVaccineData(data);
      });

    return () => unsubscribe();
  }, []);

  const handleVaccinePress = (websiteUrl) => {
    setSelectedUrl(websiteUrl);
    setShowWebView(true);
  };

  const renderErrorPage = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>The webpage is currently unavailable. Please try again later.</Text>
        <Button title="Close" onPress={() => setShowWebView(false)} />
      </View>
    );
  };

  const renderWebView = () => {
    if (loadingError) {
      return renderErrorPage();
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setShowWebView(false)}>
          <Text style={styles.backButtonText}>Trở về</Text>
        </TouchableOpacity>
        <WebView
          source={{ uri: selectedUrl }}
          style={styles.webview}
          onError={() => setLoadingError(true)}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVaccinePress(item.Info)}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>Tên Vắc xin: {item.VaccineName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!showWebView ? (
        <FlatList
          data={vaccineData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderWebView()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
   
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 5, 
  },
  backButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default VaccineList;
