import React from 'react';
import { View, StyleSheet, Button, Dimensions, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { useNavigation } from '@react-navigation/native';

const ImageDetail = ({ route }) => {
    const { imageUri } = route.params;
    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <ImageZoom
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={Dimensions.get('window').width}
                imageHeight={Dimensions.get('window').height}
                enableSwipeDown
                panToMove
                onSwipeDown={() => navigation.goBack()}
            >
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="contain" // Thay đổi chế độ xử lý hình ảnh để phù hợp với kích thước của ImageZoom
                />
            </ImageZoom>
            <Button title="Close" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default ImageDetail;
