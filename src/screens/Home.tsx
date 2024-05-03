import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

import { useMyContext } from "../context/Context";
import Header from "../components/Header";

import Category from "../components/Category";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home", "Category">;

const Home = ({ navigation, route }: HomeProps) => {
  const { count } = useMyContext();
  return (
    <SafeAreaView>
      <ScrollView>
        <Header navigation={navigation} route={route} />
        <Category navigation={navigation} route={route} />
        <Text>Hello User</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
