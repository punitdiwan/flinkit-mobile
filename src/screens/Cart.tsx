import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { CategoryData } from "../components/Category";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAllCartItem } from "./supabaseClient";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const Cart = () => {
  const { cartItem } = useMyContext();
  const [cartData,setCartData] = useState([]);

//   const getAllCartItem = async () => {
//     const response = await getAllCartItem();
//     setCartData(response.data)
// }

const getData = async() => {
  const data = await getAllCartItem();
  console.log(data?.data);
  setCartData(data?.data)
  
}

useEffect(() => {
  getData();
},[])


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
            data={cartData}
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
          backgroundColor: '#ffffff',
          marginBottom: 10,

          display: "flex",
          rowGap: 5,
          height: 110,
        }}
      >
        {cartData.length === 0 ? (
          <TouchableOpacity style={{ width: "100%", backgroundColor: "#69AF5D", display: "flex", justifyContent: "center", alignItems: "center", height: 70, borderRadius: 20 }} onPress={() => navigation.navigate("Category")}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>Empty cart,Go to category</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ width: "100%", backgroundColor: "#69AF5D", display: "flex", justifyContent: "center", alignItems: "center", height: 70, borderRadius: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 500, color: "white", position: "absolute", left: 80 }}>Go to Checkout</Text>
            <View style={{ position: "absolute", right: 65, backgroundColor: "#166432", height: 40, width: 80, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
              <Text style={{ color: "white", fontWeight: 500, fontSize: 20 }}>₹{cartItem.reduce((total, cartItem) => {
                const item = CategoryData.find((i) => i.id === cartItem?.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Cart;


// <View
// style={{
//   width: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between"

// }}
// >
{/* <TouchableOpacity   onPress={() => navigation.replace("Checkout")}
  style={{
    backgroundColor: "#69AF5D",
    height: 67,
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    gap:5,
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
</TouchableOpacity> */}
// </View>