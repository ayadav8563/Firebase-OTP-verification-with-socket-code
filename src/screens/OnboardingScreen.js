import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { authActions } from '../redux/auth.slice';
import { useDispatch } from 'react-redux';

const data = [
  {
    title: "First Onboarding",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    title: "Second Onboarding",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    title: "Third Onboarding",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
];

const SLIDER_WIDTH = Dimensions.get('window').width


const OnboardingScreen = (props) => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleNextStep = () => {
    if (index < 2 && swiperRef.current) {
      swiperRef.current.scrollBy(1);
    } else {
        dispatch(authActions.setOnboardingCompleted())
      // props.navigation.navigate('SignUpScreen')
    }
  };

  const handlePreviousStep = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const handleIndexChanged = (index) => {
    setIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Swiper ref={swiperRef} loop={false} onIndexChanged={handleIndexChanged}>
        {data?.map((item, index) => {
          return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }} key={index}>
              <View style={styles.container}>
                <Image
                  source={{ uri: item.imgUrl }}
                  style={styles.image}
                />
                <Text style={styles.header}>{item.title}</Text>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          )
        })}
      </Swiper>
      <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 50 }}>
        {index == 1 || index == 2 ? <TouchableOpacity activeOpacity={0.7} onPress={() => handlePreviousStep()} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8 }}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity> : <View style={{ flex: 1 }} />}
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleNextStep()} style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8 }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: SLIDER_WIDTH - 50,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: 'center'
  },
  image: {
    width: SLIDER_WIDTH - 50,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  buttonText: {
    marginHorizontal: 15,
    marginVertical: 10,
    color: 'black'
  }
})

export default OnboardingScreen;