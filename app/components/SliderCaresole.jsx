import React, { useEffect, useRef } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const images = [
    "https://via.placeholder.com/400x300/FF0000/FFFFFF",
    "https://via.placeholder.com/400x300/00FF00/FFFFFF",
    "https://via.placeholder.com/400x300/0000FF/FFFFFF",
];

const Carousel = ({ data }) => {
    const scrollX = useSharedValue(0);
    const flatListRef = useRef(null);
    let currentIndex = useRef(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                currentIndex.current = (currentIndex.current + 1) % data.length;
                flatListRef.current.scrollToIndex({ index: currentIndex.current, animated: true });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                renderItem={({ item }) => (
                    <View style={{ width, justifyContent: "center", alignItems: "center" }}>
                        <Image source={{ uri: item }} style={{ width: width, height: 290, borderRadius: 1 }} />
                    </View>
                )}
            />
        </View>
    );
};

export default Carousel;
