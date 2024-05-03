import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { CategoryData } from "../components/Category";
import MinusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CartIcon from "react-native-vector-icons/FontAwesome6";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryScreen = () => {
  const navigation = useNavigation<any>();
  const [addToCart, setAddToCart] = useState(false);
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
              {CategoryData?.map((item, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Product_Details", {
                      name: item.name,
                      imgUrl: item.imgUrl,
                    })
                  }
                  key={index}
                  style={{
                    width: "45%",
                    backgroundColor: "#ffffff",
                    height: 200,
                    overflow: "hidden",
                    padding: 10,
                    borderRadius: 15,
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: item.imgUrl }}
                      resizeMode="contain"
                      style={{ width: "100%", height: 100 }}
                    />
                  </View>
                  <Text>{item.name}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ textDecorationLine: "line-through" }}>
                        500
                      </Text>
                      <Text>400</Text>
                    </View>

                    {addToCart ? (
                      <TouchableOpacity
                        style={{
                          // backgroundColor: "#c3e3c1",

                          // padding: 5,
                          borderRadius: 8,
                          flexDirection: "row",
                          borderWidth: 1,
                          borderColor: "#c3e3c1",
                          width: "50%",
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <MinusIcon
                            name="minus-circle"
                            color={"green"}
                            size={20}
                          />
                          <Text style={{ fontSize: 20 }}>1</Text>
                          <PlusIcon
                            name="plus-circle"
                            color={"green"}
                            size={20}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#c3e3c1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 5,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{ color: "green" }}
                          onPress={() => setAddToCart(true)}
                        >
                          ADD
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  width: "45%",
                  backgroundColor: "#ffffff",
                  height: 200,
                  overflow: "hidden",
                  padding: 10,
                  borderRadius: 15,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              >
                <View>
                  <Image
                    source={{ uri: CategoryData[0].imgUrl }}
                    resizeMode="contain"
                    style={{ width: "100%", height: 100 }}
                  />
                </View>
                <Text>{CategoryData[0].name}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ textDecorationLine: "line-through" }}>
                      500
                    </Text>
                    <Text>400</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#c3e3c1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "green" }}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {addToCart ? (
          <View
            style={{
              width: 80,
              height: 80,
              // borderWidth: 1,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              position: "absolute",
              // position: "relative",
              marginVertical: 550,
              marginHorizontal: 280,
            }}
          >
            <CartIcon
              name="cart-plus"
              size={30}
              color={"white"}
              onPress={() => navigation.navigate("Cart")}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
