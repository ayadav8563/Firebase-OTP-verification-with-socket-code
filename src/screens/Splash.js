import React from 'react';
import { View, Text, Image } from 'react-native';

const Splash = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/demo.gif')} resizeMode='contain' />
        </View>
    )
}
export default Splash;