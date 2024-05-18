import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { CategoryData } from "../components/Category";

import SearchCard from "../components/SearchCard";
import { useMyContext } from "../context/Context";

import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNav from "./BottomNav";
const Tab = createBottomTabNavigator<RootStackParamList>();

const CategoryScreen = ({ navigation }: any) => {
  const { cartItem } = useMyContext();
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <View style={{ width: "20%", height: "auto" }}>
          <ScrollView
            style={{ padding: 5 }}
            showsVerticalScrollIndicator={false}
          >
            {CategoryData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  marginVertical: 5,
                  borderRadius: 5,
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  resizeMode="contain"
                  style={{ width: "100%", height: 100 }}
                />
                <Text style={{ textAlign: "center", fontSize: 10 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ width: "80%", height: "auto" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
                justifyContent: "center",
                flexWrap: "wrap",
                paddingTop: 10,
              }}
            >
              {CategoryData?.map((item) => (
                <SearchCard key={item.id} item={item} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
