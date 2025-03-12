import { Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const VideoPlayer = ({ video }) => {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playAsync();
        }
    }, []);

    const handlePlaybackStatusUpdate = (status) => {
        setStatus(status);
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: video }}
                resizeMode="contain"
                isLooping
                isMuted
                shouldPlay
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "blue",
    },
    video: {
        width: screenWidth,
        height: screenWidth * 0.7,
    },
});

export default VideoPlayer;