import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { CategoryData } from "../components/Category";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { loadCartData } from "./supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { addItemInCart } from "../../redux/slices/cartSlice";


type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const Cart = () => {
  // const { cartItem ,addingItemInCart,refresh} = useMyContext();
  const navigation = useNavigation<any>();
  // console.log(cartItem);
  
  const dispatch = useDispatch();
  const cartItemList = useSelector((store) => store?.cart?.cartItemList);
  console.log("useselector",cartItemList);
  

  async function loadedCart(){
    const response = await loadCartData();    
    dispatch(addItemInCart(response))
    
  }

useEffect(() => {
  loadedCart();
},[])


  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View
        style={{
          display: "flex",
          // borderWidth: 1,
          // paddingVertical: 5,
          // backgroundColor: "red ",
          // minHeight:"full"
          
        }}
      >
        <View style={{ width: "100%", height: 500 }}>
          {/* <FlatList
            data={cartItemList}
            renderItem={({ item }) => <CartItemCard item={item} />}
            keyExtractor={(item) => item.id}
          /> */}
          <ScrollView>
          {cartItemList && cartItemList.map(item => <CartItemCard item={item}/>)}
          </ScrollView>
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
              position: "absolute",
              borderRadius: 20,
              flexDirection: "row",
              bottom:0
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
                200
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Cart;
