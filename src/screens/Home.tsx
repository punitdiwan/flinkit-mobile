import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { loadCartData, supabase } from "./supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../App";
import HomePageCard from "../components/HomePageCard";
import Header from "../components/Header";
import { ProductData } from "../Date";
import { Ionicons } from "@expo/vector-icons";
import Category from "../components/Category";

// const SUPABASE_URL = 'http://192.168.1.40:8000'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
const Tab = createBottomTabNavigator<RootStackParamList>();

const Home = ({ navigation, route }: HomeProps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [cartData,setCartData] = useState([]);

  // async function loadCart(){
  //   console.log("call loaded data");
    
  //   const response = await loadCartData();
  //   console.log("loadCart",response);
    
  // }
  
  // React.useEffect(() => {
  //   loadCart();
  // },[])

  return (
    <SafeAreaView>
      <ScrollView>
        <Header navigation={navigation} route={route} />
        <HomePageCard name={"Exclusive Offer"} data={ProductData} cartItem={cartData} />
        <HomePageCard name={"Best Selling"} data={ProductData} />
        <TouchableOpacity>
          {/* <Text style={{ fontSize: 40 }} onPress={fetchData}>Fetch Data</Text> */}

          {/* <Category /> */}
        </TouchableOpacity>
        {/* {data.length > 0 ? (
          data.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text>Name: {item.name}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          ))
        ) : (
          <Text>No data available</Text>
        )} */}
      </ScrollView>
    </SafeAreaView>
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
