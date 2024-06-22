import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Text,View,TouchableOpacity,ScrollView,Image} from "react-native"
import { getAllTopRatedProducts } from './supabaseClient';
import { useMyContext } from '../context/Context';
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const TopRated = () => {
  const [products,setProducts] = useState([]);
  const navigation = useNavigation();
  // context state
  const {cartItem,increaseCartQuantity,decreaseCartQuantity,addingItemInCart} = useMyContext();
  


  const loadCategory = async () => {
      const response  = await getAllTopRatedProducts();
      setProducts(response);
  }

  useEffect(() => {
    loadCategory();
  },[])

  return (
    <ScrollView>
    <View style={{width:"100%",backgroundColor:"white",justifyContent:"center",alignItems:"center",minHeight:"100%",paddingVertical:10}}>
        <View   style={{
              display: "flex",
              flexDirection:"row",    
              minHeight: "100%",
              width:"100%",
              backgroundColor:"white",
              flexWrap:"wrap",
              alignItems:"center",
              gap:10,
              paddingTop:10,
              justifyContent:'flex-start',
              paddingLeft:15
            }}>

        {products?.length > 0 ? products.map(item =>
            <View style={{ backgroundColor: "white", width: 185, marginVertical: 3, paddingVertical: 30, paddingHorizontal: 10, borderRadius: 20, height: 270, borderColor: "rgb(233,233,233)", borderWidth: 1 }}>
              <TouchableOpacity onPress={() =>
                navigation.navigate("Productdetail", {
                  id: item?.product_id,
                })
              }>
                <View>
                  <Image style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: item?.product_imagename }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>{item?.product_name}</Text>
                  <Text style={{ paddingTop: 5, color: "rgb(205,205,205)", fontWeight: "bold" }}>325ml,Price</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, alignItems: "center" }}>

                  <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>₹{item?.price}</Text>
                  </View>

                  {cartItem.filter(itemm => itemm?.product_id == item?.product_id).length > 0 ? <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 2 }}>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}
                      onPress={() => decreaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{ color: "#bab7b6" }}>
                        <Entypo name="minus" size={20} />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}>
                      <Text style={{ fontSize: 20 }}>
                        {cartItem.filter(itemm => itemm?.product_id == item?.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }} onPress={() => increaseCartQuantity(item?.product_id)}>
                      <Entypo name='plus' style={{ fontSize: 20, color: "#69AF5D" }} />
                    </TouchableOpacity>
                  </View> : <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgb(105,175,93)",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "white",
                        // backgroundColor:"red",
                        // backgroundColor:""

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
          ): <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width:"100%"
          }}><ActivityIndicator size={"large"} color={"rgb(105,175,94)"}/></View>}
        </View>
    </View>
    </ScrollView>
  )
}

export default TopRated