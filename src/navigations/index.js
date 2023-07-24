import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import PreLoginNavigator from './preloginNavigator';
import PostloginNavigator from './postLoginNavigator';
import { useSelector } from 'react-redux';
import Splash from '../screens/Splash';
import SplashScreen from 'react-native-splash-screen';

const MainNavigator = () => {
  const isVerified = useSelector(state => state.authReducer.isMailPasswordVerified);

  return (
    <NavigationContainer fallback={<Splash />} onReady={() => SplashScreen?.hide()}>
      {isVerified ? <PostloginNavigator /> : <PreLoginNavigator />}
    </NavigationContainer>

  )
}

export default MainNavigator;