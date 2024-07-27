import React from 'react';
import { StyleSheet, Alert, View, ScrollView, Image, TouchableOpacity } from 'react-native';

// Import local images
const images = [
  require('../../assets/offers.png'),
  require('../../assets/offers.png'),
  require('../../assets/offers.png'),
  
];

const arr = [
  {
    img: images[0],
    title: 'Offer',
  },
  {
    img: images[1],
    title: 'Pizza',
  },
  {
    img: images[2],
    title: 'Cake',
  },
  
];

const Carousel = () => {
  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {arr.map((item, index) => (
        <View style={styles.carouselItem} key={index}>
            <Image
              style={styles.image}
              source={item.img}
            />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  carouselItem: {
    width: 360,
    height: 120,
    marginHorizontal: 5,
  },
  image: {
    width: 360,
    height: 120,
    borderRadius: 10,
  },
});

export default Carousel;
