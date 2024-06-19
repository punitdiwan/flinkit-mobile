import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { CategoryData } from "../components/Category";

import SearchCard from "../components/SearchCard";
import { useMyContext } from "../context/Context";

import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { loadCartData, supabase } from "./supabaseClient";
import { addToCartFun } from "../../lib/cartFun";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";


const Tab = createBottomTabNavigator<RootStackParamList>();
// const apikey = "";


const CategoryScreen = (category_id: any, { navigate }: any) => {

  interface Products {
    product: {
      product_id: string;
      product_imagename: string;
      product_name: string;
      price: number;
    };
  }
  const ref = useRef<{ product_id: string }>(null);

  const { cartItem,addingItemInCart,increaseCartQuantity,decreaseCartQuantity } = useMyContext();
  const [products, setProducts] = useState<any>([]);
  const [increaseCardQuantity, setincreaseCardQuantity] = useState<string[]>(
    []
  );

  console.log("cartItem",cartItem);
  let itemPresent = ""
  
  

  // const cartItemList = useSelector(store => store?.cart?.cartItemList);
  // console.log("screen",cartItemList);
  

  // console.log("category_id:", category_id.route.params.category_id);
  // const id = category_id.route.params.category_id;
  // console.log("newId", newId);
  // console.log("id:");
  // const resp = await fetch(
  //   `https://backend.delivery.maitretech.com/rest/v1/newproducts`,
  //   {
  //     headers: {
  //       Apikey: apikey,
  //     },
  //   }
  // );
  // const quantity = getItemQuintity("0");

  // old addTOCart






  const fetchData = async () => {
    console.log("working");
    console.log("category_id:", category_id.route.params.category_id);
    const resp: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("category_id", newId);
    console.log("resp", resp);

    setProducts(resp.data);
  };
  const newId = category_id.route.params.category_id;

  // const fetchData = async () => {
  //   console.log("working");
  //   console.log("category_id:", category_id.route.params.category_id);
  //   const resp = await fetch(
  //     `https://backend.delivery.maitretech.com/rest/v1/newproducts`,
  //     {
  //       headers: {
  //         Apikey: apiKey,
  //       },
  //     }
  //   );
  //   console.log("resp", resp);

  //   setProducts(resp.data);
  // };
  // const newId = category_id.route.params.category_id;


  useEffect(() => {
    fetchData();
  }, [category_id]);


  const navigation = useNavigation<any>();
   return (
        <>
         {products.length == 0 ? <View style={{width:"100%",justifyContent:"center",alignItems:"center",minHeight:"100%"}}><Text style={{fontSize:15,fontWeight:"bold"}}>"No Products"</Text></View>: <View
            style={{
              display: "flex",
              flexDirection:"row",    
              minHeight: "100%",
              width:"100%",
              // backgroundColor:"red",
              // paddingVertical:80,
              flexWrap:"wrap",
              // justifyContent:"space-around",
              alignItems:"center",
              justifyContent:"flex-start",
              gap:3,
              paddingHorizontal:4
            }}
          >
            {products.map(item => 
                <View style={{backgroundColor:"white",width:200,marginVertical:3,paddingVertical:30,paddingHorizontal:10,borderRadius:10,height:250}}>
                  <TouchableOpacity    onPress={() =>
            navigation.navigate("Productdetail", {
              id: item?.product_id,
            })
          }>
                    <View>
                    <Image  style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: item?. product_imagename }}
                />
                 <Text style={{fontSize:15,fontWeight:"bold"}}>{item?.product_name}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:15,alignItems:"center"}}>

                        <View>
                        <Text style={{fontSize:15,fontWeight:"bold"}}>₹{item?.price}</Text>
                        </View>

                        {cartItem.filter(itemm => itemm?.product_id == item?.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5
                    }}
                    onPress={() => decreaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{color:"#bab7b6"}}>
                      <Entypo name="minus" size={20}/>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5
                    }}>
                      <Text style={{fontSize:20}}>
                      {cartItem.filter(itemm => itemm?.product_id == item?.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{    width:30,
                      height:30,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      // borderWidth:1,
                      borderColor:"#bab7b6",
                      borderRadius:5}} onPress={() => increaseCartQuantity(item?.product_id)}>
                        <Entypo name='plus' style={{fontSize:20,color:"#69AF5D"}} />
                    </TouchableOpacity>
                </View> :   <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#69AF5D",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "white",
                      // backgroundColor:"red",
                      
                    }}
                    onPress={() => addingItemInCart(item)}
                  >
                    +
                  </Text>
                </TouchableOpacity>
                
                }

                    </View>
                </TouchableOpacity>
                </View>
            )}

          </View>
}
        </>
      );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  body: {
    width: "45%",
    height: "auto",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0ebeb",
    shadowColor: "white",
  },
});
