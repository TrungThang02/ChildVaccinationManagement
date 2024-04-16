import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from '@react-navigation/native';

const ImageDetail = ({ route }) => {
    const { imageUri } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const handleImageLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleImageError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading image</Text>
                </View>
            )}
            {!loading && !error && (
                <ImageViewer
                    imageUrls={[{ url: imageUri }]}
                    enableSwipeDown
                    enableImageZoom
                    onCancel={() => navigation.goBack()}
                    renderIndicator={() => null}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginTop: 10,
    },
});

export default ImageDetail;
