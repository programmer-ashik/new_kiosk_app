import { fetch } from 'expo/fetch';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import AutoScrollText from './components/AutoScrollText';
import DateTime from './components/DateTime';
import Carousel from './components/SliderCaresole';
import VideoPlayer from './components/VideoPlayer';
const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { width: screenWidth } = Dimensions.get('window');
    const [sliderData, setSliderData] = useState(null);
    const [error, setError] = useState('')
    const BASE_URL = "http://103.107.184.80:3000";

    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                // Fetch data from the API
                const resp = await fetch(`${BASE_URL}/api/slider_images`);
                const data = await resp.json(); // Parse the response as JSON
                if (data.success) {
                    setSliderData(data.data); // Set the slider data only if the API call was successful
                } else {
                    setError("API call failed:", data.message)
                    console.error("API call failed:", data.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSliderData();
        const intervalId = setInterval(fetchSliderData, 10000); // Refresh data every 10 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
    console.log(sliderData, ' this is slider data');
    if (isLoading || !sliderData) {
        return <Text>Loading</Text>;
    }
    if (error) {
        return <Text>{error}</Text>
    }
    const formattedSliderImages = sliderData.sliderImages.map(imagePath => `${BASE_URL}/${imagePath}`);

    return (
        <View className={' bg-gray-900 w-full'}>
            <View className={'w-full'}>
                <View className={'flex flex-row justify-between items-center gap-4'}>
                    <Image
                        source={{ uri: `${BASE_URL}/${sliderData.headerImage.cgFlag}` }}
                        style={{ width: screenWidth * 0.40, height: screenWidth * 0.3 * (28 / 46) }}
                    />
                    <Image
                        source={{ uri: `${BASE_URL}/${sliderData.headerImage.cglogo}` }}
                        style={{ width: screenWidth * 0.28, height: screenWidth * 0.3 * (28 / 46) }}
                    />
                    <Image
                        source={{ uri: `${BASE_URL}/${sliderData.headerImage.bdFlag}` }}
                        style={{ width: screenWidth * 0.40, height: screenWidth * 0.3 * (28 / 46) }}
                    />
                </View>
                <View className={`bg-blue-900 h-32 flex flex-col items-center justify-center`}>
                    <AutoScrollText data={sliderData.title} />
                </View>
            </View>
            <View className={'w-full h-72 border-2'}>
                <Carousel data={formattedSliderImages} />
            </View>
            <View>
                {sliderData.video && (
                    <View style={{ width: screenWidth, height: screenWidth * 0.5 * (50 / 50) }}>
                        <VideoPlayer video={`${BASE_URL}/${sliderData.video}`} />
                    </View>
                )}
            </View>
            <View className={' w-full bg-black'}>
                <DateTime />
            </View>
            <Text className={" text-blue-500 text-3xl font-bold"}>Home</Text>
        </View>
    );
};

export default Home;
