import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAllTopRatedProducts, loadCartData, supabase } from "./supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../App";
import HomePageCard from "../components/HomePageCard";
import Header from "../components/Header";
import { ProductData } from "../Date";
import { Ionicons } from "@expo/vector-icons";
import Category from "../components/Category";
import { StatusBar } from "react-native";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
const Tab = createBottomTabNavigator<RootStackParamList>();

const Home = ({ navigation, route }: HomeProps) => {
  const [cartData,setCartData] = useState([]);
  const [topRatedProducts,setTopRatedProducts] = useState([]);

  const loadTopRatedProducts = async () => {
    const response = await getAllTopRatedProducts();
    setTopRatedProducts(response);
}



React.useEffect(() => {
  loadTopRatedProducts();
},[]);

  return (
    <>
    <StatusBar backgroundColor="rgb(255,255,255)" barStyle={"dark-content"} translucent={true}/>
    <SafeAreaView>
      <ScrollView style={{backgroundColor:"rgb(255,255,255)"}} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} route={route} />
        
        <HomePageCard name={"Exclusive Offer"} data={topRatedProducts} cartItem={cartData} />
        <HomePageCard name={"Best Selling"} data={topRatedProducts} />
        <HomePageCard name={"Top Rated"} data={topRatedProducts}/> 
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
});
