import { StyleSheet, Alert, View, ScrollView, Image,TouchableOpacity } from "react-native";
import React from "react";

const arr = [
  {
    imgurl:
      "https://plus.unsplash.com/premium_photo-1664201889896-6a42c19e953a?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Offer",
  },
  {
    imgurl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Pizza",
  },
  {
    imgurl:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cake",
  },
  {
    imgurl:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Egg",
  },
  {
    imgurl:
      "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Burger",
  },
  {
    imgurl:
      "https://plus.unsplash.com/premium_photo-1669150849080-241bf2ec9b4a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fish",
  },
  {
    imgurl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Scream",
  },
];
type Props = {};

const Carousel = (props: Props) => {
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
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {arr?.map((item, index) => (
        <View style={styles.Carousel} key={index}>
          <TouchableOpacity onPress={createThreeButtonAlert}>

          <Image
          key={index}
          style={{ width: 300, height: 200, borderRadius: 10 }}
          source={{
            uri: item.imgurl,
          }}
          />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  Carousel: {
    width: 300,
    height: 200,
    marginHorizontal: 5,
    overflow: "hidden",
  },
});
