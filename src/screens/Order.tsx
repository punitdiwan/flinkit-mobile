import { useEffect, useRef, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity, Animated, ScrollView, SafeAreaView } from "react-native"
import { loadOrders } from "./supabaseClient"
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import React from 'react'
import { StyleSheet } from "react-native";

const Order = () => {

  const fillAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    animateFill();
  }, []);

  const animateFill = () => {
    Animated.timing(fillAnimation, {
      toValue: 1,
      duration: 1500, // Adjust duration as needed
      useNativeDriver: false, // false for backgroundColor animation
    }).start();
  };

  const interpolateColor = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(217,217,217)', 'rgb(105,175,94)'], // Start with transparent and end with your desired color
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Entypo name="cross" style={styles.icon} onPress={() => navigation.goBack()} />
            <TouchableOpacity onPress={() => navigation.navigate("Help")}>
              <Text style={styles.helpButton}>Help</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Preparing your order...</Text>

            <View style={{ paddingTop: 5 }}>
              <Text style={{ fontWeight: "semibold" }}>Arriving <Text style={styles.boldText}>10:15</Text></Text>
              {/* Additional content */}
            </View>

            {/* Replace with your animated views */}
            <View style={styles.animationContainer}>
              <Animated.View style={[styles.box, animatedStyle]} />
              <Animated.View style={[styles.box, animatedStyle]} />
              <Animated.View style={[styles.box, animatedStyle]} />
              <Animated.View style={[styles.box, animatedStyle]} />
            </View>

            <View style={styles.arrivalInfo}>
              <Text>Estimated arrival by <Text style={styles.boldText}>10:15</Text></Text>
              {/* Additional content */}
            </View>

            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
              <Image source={require("../../assets/orderbackground.png")} />
              <Text
                style={{
                  width: "20%",
                  backgroundColor: "#EEEEEE",
                  height: 10,
                  fontWeight: "500",
                  marginTop: 30,
                  borderRadius: 20
                }}
              ></Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Delivery details</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "rgb(124,124,124)", fontWeight: "bold", fontSize: 15 }}>Address</Text>
              <Text style={{ color: "black", fontWeight: "semibold" }}>B-69,Kanya West Road,Kayne nagar,Bhopal(M.P)</Text>
              <Text
                style={{
                  width: "100%",
                  backgroundColor: "rgb(232,232,232)",
                  height: 1,
                  fontWeight: "500",
                  marginTop: 15
                }}
              ></Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "rgb(124,124,124)", fontWeight: "bold", fontSize: 15 }}>Type</Text>
              <Text style={{ color: "black", fontWeight: "semibold" }}>Leave at door</Text>
              <Text
                style={{
                  width: "100%",
                  backgroundColor: "rgb(232,232,232)",
                  height: 1,
                  fontWeight: "500",
                  marginTop: 15
                }}
              ></Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "rgb(124,124,124)", fontWeight: "bold", fontSize: 15 }}>Instructions</Text>
              <Text style={{ color: "black", fontWeight: "semibold" }}>Please knock to let me know it has arrive and then leave it at the doorstep</Text>
              <Text
                style={{
                  width: "100%",
                  backgroundColor: "rgb(232,232,232)",
                  height: 1,
                  fontWeight: "500",
                  marginTop: 15
                }}
              ></Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "rgb(124,124,124)", fontWeight: "bold", fontSize: 15 }}>Service</Text>
              <Text style={{ color: "black", fontWeight: "semibold" }}>Standard</Text>
            </View>
            <View >
              <Text
                style={{
                  width: "100%",
                  backgroundColor: "rgb(246,246,246)",
                  height: 10,
                  fontWeight: "500",
                  marginTop: 15
                }}
              ></Text>
            </View>

            <View style={{ marginTop: 20}}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Share this delivery</Text>
              <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={{ color: "black", fontWeight: "semibold" }}>Let someone follow along</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10, gap: 10, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "rgb(238,238,238)" }}>
                  <Image source={require("../../assets/share.png")} />
                  <Text style={{ color: "rgb(105,174,97)", fontWeight: "semibold" }}>Share</Text>
                </TouchableOpacity>
              </View>

            </View>
            
            <View >
              <Text
                style={{
                  width: "100%",
                  backgroundColor: "rgb(246,246,246)",
                  height: 10,
                  fontWeight: "500",
                  marginTop: 15
                }}
              ></Text>
            </View>

            <View style={{marginTop:20}}>
              <View style={{justifyContent:"space-between",flexDirection:"row"}}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Order summary</Text>
              <Text style={{color:"rgb(105,175,94)",fontWeight:"bold"}}>View Cart</Text>
              </View>
              <Text style={{fontSize:15,fontWeight:"bold",marginTop:20}}>Order Number : {"00006969"}</Text>
              <View style={{flexDirection:"row",alignItems:"center",gap:20}}>
                <View style={{width:40,height:40,justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"rgb(238,238,238)"}}>
                <Text style={{fontSize:16,fontWeight:"bold"}}>1</Text>
                </View>
                <View style={{marginVertical:20}}>
                  <Text style={{fontWeight:"bold",fontSize:16}}>Bell Pepper Red</Text>
                  <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                      <Text style={{fontWeight:"semibold"}}>Show more</Text>
                      <Image source={require("../../assets/arrowbottom.png")}/>
                  </View>
                </View>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                  <Text style={{fontSize:16,fontWeight:"bold"}}>Total</Text>
                  <Text style={{fontSize:16,fontWeight:"bold"}}>295</Text>
                </View>
            </View>

          </View>

          {/* Other sections and views */}
          <View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:10}}>
            <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",width:"100%",justifyContent:"center",alignItems:"center",paddingVertical:10,borderRadius:10}} onPress={() => navigation.navigate("Home")}>
              <Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>Back to home</Text>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: 70, // Adjust this as needed
    paddingVertical:40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  icon: {
    fontSize: 30,
    fontWeight: '300',
  },
  helpButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgb(238,238,238)',
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50, // Add padding or adjust as needed
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  arrivalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  box: {
    // width: 200,
    // height: 200,
    // borderRadius: 10,
    width: "25%", marginRight: 5, borderRadius: 2, height: 7
  },
  // Add more styles for other sections as needed
});



export default Order;


