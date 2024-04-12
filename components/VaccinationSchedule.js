import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const VaccinationSchedule = () => {
    const images = [{
        url: "https://firebasestorage.googleapis.com/v0/b/childvaccinationmanageme-f8806.appspot.com/o/images%2Flichtiem1den10.png?alt=media&token=b7ad32b0-9f50-4558-b29f-06c2bfce81c0",
        props: {
            resizeMode: 'contain'
        }
    }];
    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    maximumZoomScale={2}
                    minimumZoomScale={1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <ImageViewer
                        imageUrls={images}
                        enableSwipeDown={false}
                        renderIndicator={() => null}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    innerContainer: {
        flex: 1,
    },
});

export default VaccinationSchedule;
