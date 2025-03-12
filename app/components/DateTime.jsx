import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const DateTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [currentTime]);
    const formattedDate = currentTime.toLocaleDateString();
    // const formattedTime = currentTime.toLocaleTimeString();
    const formattedTime = currentTime.toLocaleTimeString([], {
        timeZone: 'Asia/Dhaka',
        hour12: false
    });
    console.log(formattedTime);
    return (
        <View className={`flex flex-row justify-between items-center mt-24 px-4`}>
            <Text className={`text-4xl font-bold text-white`}>Date: {formattedDate}</Text>

            <Text className={`text-4xl font-bold text-white`}>Time: {formattedTime}</Text>
            {/* <Text className={`text-gray-50`}>Powerd by: Ashik Hasan</Text> */}

        </View>
    );
};



export default DateTime;