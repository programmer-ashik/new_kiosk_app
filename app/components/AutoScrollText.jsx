import React from 'react';
import { Text, View } from 'react-native';
import AutoScrolling from 'react-native-auto-scrolling';

const AutoScrollText = ({ data }) => {
    return (
        <View className={` flex flex-row justify-center`}>
            <AutoScrolling
                endPadding={10}>
                <Text className={`py-10  text-4xl text-white font-extrabold`} >{data}</Text>
            </AutoScrolling>
        </View>
    )
}

export default AutoScrollText
