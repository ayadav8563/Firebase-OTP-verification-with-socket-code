import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, connect, useSelector } from 'react-redux';
import { authActions, userRegisterAction } from '../redux/auth.slice';



const SignUpScreen = (props) => {
    const dispatch = useDispatch()
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.authReducer.registerLoadingStatus);


    const handleSignUp = async () => {
        if (email.trim().length <= 0) {
            alert('Please enter email.')
        }
        else if (!(emailRegex.test(email))) {
            alert('Please enter valid email.')
        } else if (password.trim().length <= 0) {
            alert('Please enter password.')
        } else if (!(passwordRegex.test(password))) {
            alert('Please enter Min 8 characters, At Least 1 uppercase and 1 number.')
        } else {
            let data = {
                email: email,
                password: password,
            }
            dispatch(userRegisterAction(data))
        }
    };

    useEffect(() => {
        if (loading == 'loaded') {
            gotoLogin();
            dispatch(authActions.updateRegisterLoadingStatus());
        }
    }, [loading])

    const gotoLogin = () => {
        props.navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.container, { alignItems: 'center' }]}>
                <Text style={styles.title}>Welcome to Your Sign up Screen</Text>
                <Text style={styles.subtitle}>Explore and Enjoy!</Text>
                <Text style={styles.emailStyle}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'black'}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'black'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50 }} activeOpacity={0.7} onPress={gotoLogin}>
                    <Text style={styles.subtitle}>Tap here to go Login Screen</Text>
                </TouchableOpacity>
            </View>
            {loading == 'loading' ? (
                <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', zIndex: 2 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
        marginHorizontal: 20,
        textAlign:'center'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 32,
        color: 'black',
        marginHorizontal: 20,
        textAlign:'center'
    },
    emailStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:'black'
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        color:'black'
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// const mapStateToProps = state =>({
// loading: state.authReducer.loading,
// })

// export default connect(mapStateToProps)(SignUpScreen);

export default SignUpScreen;