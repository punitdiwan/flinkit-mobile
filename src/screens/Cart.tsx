import { View, Text, FlatList, TouchableOpacity, ScrollView,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { CategoryData } from "../components/Category";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { addItemsInOrder, loadCartData } from "./supabaseClient";
// import { useDispatch, useSelector } from "react-redux";
// import { current } from "@reduxjs/toolkit";
import Checkout from "./Checkout";
import { Entypo } from '@expo/vector-icons';
// import { Image } from "react-native-reanimated/lib/typescript/Animated";


type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const Cart = () => {
  // const { cartItem ,addingItemInCart,refresh} = useMyContext();
  const navigation = useNavigation<any>();
  const [totalCartPrice,setTotalCartPrice] = useState(0);
  const [isCheckoutVisible,setIsCheckoutVisible] = useState(false);
  const [totalAmount,setTotalAmount] = useState(0);

  const {cartItem,clearCart} = useMyContext();
  console.log("cartItem",cartItem);


  function generateRandomCode() {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Define the characters to use
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }

  const addCartItemOrder = async () => {
    const totalAmount =  cartItem?.reduce((accumulator:any, currentValue:any) => {
      return accumulator + (currentValue.qty * currentValue.price);
    }, 0)
    const orderId =  generateRandomCode();
    addItemsInOrder(orderId,totalAmount,cartItem);
    clearCart();
  }

  return (
    <View style={{flex:1,backgroundColor:"rgb(255,255,255)"}}>
      <View
        style={{
          display: "flex",
          flex:1
        }}
      >
        <View style={{ width: "100%",height:650}}>
          {/* <FlatList
            data={cartItemList}
            renderItem={({ item }) => <CartItemCard item={item} />}
            keyExtractor={(item) => item.id}
          /> */}
          <ScrollView>
          {cartItem?.length > 0 ? cartItem?.map(item => <CartItemCard item={item}/>) : <View style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:700}}><Text style={{fontSize:20,fontWeight:500,textAlign:"center",color:"#b3afaf"}}>Your cart is {"\n"}Empty</Text></View>}
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          // borderWidth: 1,
          borderColor: "lightgrey",
          paddingHorizontal: 10,
          backgroundColor:'#fff',
          marginBottom: 10,
          display: "flex",
          rowGap: 5,
          height: 30
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
           {cartItem?.length > 0 ?
           (<TouchableOpacity
            style={{
              backgroundColor: "rgb(105,175,93)",
              height: 65,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              flexDirection: "row",
              position:"absolute",
            }}
            onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}
          >
          <View>
            <Text style={{color:"rgb(252,252,252)",fontWeight:"500",fontSize:20}}>Go To Checkout:</Text>
          </View>
            <View
              style={{
                height: 37,
                width: 73,
                position: "absolute",
                backgroundColor: "rgb(22,100,50)",
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
                {
                  cartItem?.reduce((accumulator:any, currentValue:any) => {
                    return accumulator + (currentValue.qty * currentValue.price);
                  }, 0)
                }
              </Text>
            </View>
          </TouchableOpacity>) : (
              <TouchableOpacity
              style={{
                backgroundColor: "rgb(105,175,93)",
                height: 67,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                borderRadius: 20,
                flexDirection: "row",
                bottom:0
              }}
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Go to Category</Text>
              {/* <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Empty cart</Text> */}
            </TouchableOpacity>
          )}
        </View>
      </View>


      {isCheckoutVisible ? (
         <View style={{ backgroundColor: "white", position: "absolute", bottom:7, height: 600, borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
         <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 100 }}>
             <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1c1c1c" }}>Checkout</Text>
             <Entypo name="cross" size={28} color="black" style={{ position: "absolute", right: 10 }} onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}/>
         </View>
         <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
         <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
             <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Delivery</Text>
             <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}>Select method</Text><Image source={require("../../assets/Vector.png")} /></View>
         </View>
         <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
         <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
             <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Payment</Text>
             <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                 <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                     <Image style={{ marginRight: 18 }} source={require("../../assets/card.png")} />
                     <Image source={require("../../assets/Vector.png")} />
                 </View>
             </View>
         </View>
         <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
         <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
             <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Promo Code</Text>
             <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold", color: "black" }}>Pick discount</Text><Image source={require("../../assets/Vector.png")} /></View>
         </View>
         <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
         <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
             <Text style={{ fontSize: 18, color: "#828181", fontWeight: "500" }}>Total Cost</Text>
             <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}> ₹{
                  cartItem.reduce((accumulator:any, currentValue:any) => {
                    return accumulator + (currentValue?.qty * currentValue?.price);
                  }, 0)
                }</Text><Image source={require("../../assets/Vector.png")} /></View>
         </View>
         <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
         <View style={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 20 }}>
             <Text style={{ color: "#828181", fontSize: 12, fontWeight: "bold" }}>By placing an order you agree to our{"\n"}<Text style={{ color: "black" }}>Terms</Text> and <Text style={{ color: "black" }}>Conditions</Text></Text>
         </View>
         <View style={{width: "100%", backgroundColor: "white", marginTop: 30, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center",paddingHorizontal:20}}>
             <TouchableOpacity style={{ backgroundColor: "#69AF5D",width:"100%",paddingVertical: 20,borderRadius:20}} onPress={() => navigation.replace("Orderaccepted")}>
                 <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white"}} onPress={() => {
                  addCartItemOrder()
                  navigation.navigate("Orderaccepted");
                  setIsCheckoutVisible(!isCheckoutVisible);
                  }}>Place Order</Text>
             </TouchableOpacity>
         </View>

     </View>
      ) : ""}
    </View>
  );
};
export default Cart;
