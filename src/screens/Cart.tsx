import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { CategoryData } from "../components/Category";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const Cart = () => {
  const { cartItem } = useMyContext();
  const navigation = useNavigation<any>();
  return (
    <View>
      <View
        style={{
          display: "flex",
          // borderWidth: 1,
          height: "auto",
          paddingVertical: 5,
          backgroundColor: "#ffffff",
        }}
      >
        <View style={{ width: "100%", height: 500 }}>
          <FlatList
            data={cartItem}
            renderItem={({ item }) => <CartItemCard item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          // borderWidth: 1,
          borderColor: "lightgrey",
          paddingHorizontal: 10,
          backgroundColor:'#ffffff',
          marginBottom: 10,

          display: "flex",
          rowGap: 5,
          height: 110,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity   onPress={() => navigation.replace("Checkout")}
            style={{
              backgroundColor: "#69AF5D",
              height: 67,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            <Text>Go To Checkout:</Text>
            <View
              style={{
                height: 37,
                width: 73,
                position: "absolute",
                backgroundColor: "#166432",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 5,
                right: 15,
              }}
            >
              <FontAwesome name="rupee" size={14} color="#ffffff" />
              <Text style={{ fontSize: 14, color: "#ffffff" }}>
                {cartItem.reduce((total, cartItem) => {
                  const item = CategoryData.find((i) => i.id === cartItem?.id);
                  return total + (item?.price || 0) * cartItem?.quantity;
                }, 0)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Cart;
