import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MinusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { CategoryData } from "../components/Category";

// type ItemProps = { name: string; imgUrl: string; price: number };


const Cart = () => {
  const { cartItem } = useMyContext()
  return (
    <View>
      <View
        style={{
          display: "flex",
          // borderWidth: 1,
          height: "auto",
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "green", textAlign: "center" }}>
          Free delivery on all orders
        </Text>
        <Text style={{ color: "red", textAlign: "center" }}>
          Discount up to 60% on items
        </Text>
        
        <View style={{ width: "100%", height: 400, padding: 15 }}>
          
          <FlatList
              data={cartItem}
              renderItem={({ item }) => (
                <CartItemCard item={item} />
              )}
              keyExtractor={item => item.id}
            />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: 'lightgrey',
          paddingHorizontal: 10,
          // marginVertical: 10,
          marginBottom:10,
          // paddingVertical: 5,
          display: "flex",
          rowGap: 5,
          height:'auto'
        }}
      >

        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Bill Details</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price:{cartItem.reduce((total, cartItem) => {
          const item = CategoryData.find((i) => i.id === cartItem.id)
          return total + (item?.price || 0) * cartItem.quantity
        }, 0)}</Text>

        <Text style={{ fontSize: 18 }}>Discount:0</Text>
        <Text style={{ fontSize: 18 }}>Delivery Charge:0</Text>
        <Text style={{ fontSize: 18 }}>Packing Charge:0</Text>
        <View
          style={{
            width: "100%",
            // borderWidth: 1,
            backgroundColor: "green",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", marginLeft: 20, fontSize: 20 }}>
            Final Price:755
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Cart;
