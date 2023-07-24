import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList, ActivityIndicator, TextInput, Touchable, TouchableOpacity, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImageAction } from "../redux/auth.slice";
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [showData, setShowData] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [sentOtp, setSentOtp] = useState(false);
    const [confirmation, setConfirmation] = useState();
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const realData = useSelector(state => state.authReducer.imageData);
    const loader = useSelector(state => state.authReducer.imageLoading);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        dispatch(getImageAction());
    }

    const loadMoreData = () => {
        if (page < parseInt(realData?.length / 10) && !isLoading) {
            setIsLoading(true);
            let newData = realData.filter(item => (page * 10 + 1) < item.id && item.id < ((page + 1) * 10) + 1);
            console.log("newData ==>", newData?.length)
            setShowData(prev => [...prev, ...newData]);
            setPage(p => p + 1)
            setIsLoading(false);
        }
    };

    const sendOTP = () => {
        setOtpLoading(true)
        auth()
            .signInWithPhoneNumber(mobile)
            .then((confirmation) => {
                setConfirmation(confirmation);
                alert('OTP send successfully. Please wait.')
                setOtpLoading(false);
                setSentOtp(true);
            })
            .catch((error) => {
                alert(error.message)
                setOtpLoading(false)
            });
    }

    const verifyOtp = () => {
        setOtpLoading(true);
        confirmation
            .confirm(otp)
            .then((user) => {
                setIsVerified(true);
                alert('OTP verified');
                setOtpLoading(false);
            })
            .catch((error) => {
                alert(error.message)
                setOtpLoading(false);
            });
    }

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={showData}
                keyExtractor={item => `${item.id}${item.url}`}
                onEndReached={loadMoreData}
                onEndReachedThreshold={1}
                ListHeaderComponent={<View>
                    {isVerified ? <View>
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>OTP Verified</Text>
                    </View> : <View>
                        <Text
                            style={{
                                marginHorizontal: 20,
                                marginVertical: 50,
                                height: 50,
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 16,
                                color: 'black',
                                textAlign: 'center'
                            }}
                            onPress={() => alert('Hello')}
                        >Verify OTP</Text>
                        <View>
                            <TextInput
                                value={mobile}
                                onChangeText={(e) => setMobile(e)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    color: 'black',
                                    marginHorizontal: 15,
                                    borderRadius: 8
                                }}
                                placeholder="Enter Phone number with + country code"
                                placeholderTextColor={'black'} />
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: 'blue',
                            paddingVertical: 6,
                            paddingHorizontal: 24,
                            borderRadius: 8,
                            marginVertical: 10,
                            alignSelf: 'center'
                        }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                                onPress={sendOTP}>send OTP</Text>
                        </TouchableOpacity>
                        {sentOtp ? <View>
                            <View>
                                <TextInput
                                    value={otp}
                                    onChangeText={(e) => setOtp(e)}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        color: 'black',
                                        marginHorizontal: 15,
                                        borderRadius: 8
                                    }}
                                    placeholder="Enter OTP"
                                    placeholderTextColor={'black'} />
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: 'blue',
                                paddingVertical: 6,
                                paddingHorizontal: 24,
                                borderRadius: 8,
                                marginVertical: 10,
                                alignSelf: 'center'
                            }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}
                                    onPress={verifyOtp}>verify OTP</Text>
                            </TouchableOpacity>
                        </View>
                            : null}
                    </View>}
                </View>}
                onRefresh={() => onRefresh}
                refreshing={isLoading}
                ListFooterComponent={() => {
                    return isLoading ? <ActivityIndicator size="large" /> : null;
                }}
                renderItem={({ item, index }) =>
                        <View style={{ borderWidth: 1, flexDirection: 'row', marginVertical: 8, marginHorizontal: 16, borderRadius: 8 }}>
                            <Image source={{ uri: item.url }} style={{ height: 100, width: 100, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} resizeMode="contain" />
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'black', marginHorizontal: 10, marginTop: 10 }}>{item.title}</Text>
                            </View>
                        </View>}
            />
            {(loader == 'loading' || isLoading || otpLoading) ? (
                <View style={{ position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignSelf: 'center', zIndex: 2 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : null}
        </SafeAreaView>
    )
}

export default HomeScreen;