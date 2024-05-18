import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../App";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header";

import Category from "../components/Category";

import { Ionicons } from "@expo/vector-icons";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
// const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();
const Home = ({ navigation, route }: HomeProps) => {
  // const { count } = useMyContext();

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Header navigation={navigation} route={route} />
          <Category />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
