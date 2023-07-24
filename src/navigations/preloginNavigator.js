import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

const PreLoginNavigator = props => {
    const hasSeenOnboarding = useSelector(state => state.authReducer.hasSeenOnboarding);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            {!hasSeenOnboarding ? (
                <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />) : (
                <>
                    <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    )
};

export default PreLoginNavigator;