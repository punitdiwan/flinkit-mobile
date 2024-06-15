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
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

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


  useEffect(() => {
    fetchData();
  }, [category_id]);


  const navigation = useNavigation<any>();
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",

          // gap: 2,
          // backgroundColor: "red",

          minHeight: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            minHeight: "100%",
            // backgroundColor: "green",
            display: "flex",

            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignContent: "flex-start",
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 15,
                paddingHorizontal: 10,
                columnGap: 5,
                // justifyContent: "center",
                flexWrap: "wrap",
                paddingTop: 10,
              }}
            >
              {products?.map(
                (
                  item: {
                    product_category: any;
                    product_id: React.Key | null | undefined;
                    product_imagename: any;
                    product_name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    price:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    id: string;
                  },
                  index: any
                ) => {
                  return (
                    <TouchableOpacity
                      key={item.product_id}
                      style={styles.body}
                      // onPress={() =>
                      //   console.log("Productdetail", item.product_id)
                      // }
                      onPress={() =>
                        navigation.navigate("Productdetail", {
                          id: item.product_id,
                        })
                      }
                    >
                      <View key={item.product_id}>
                        <Image
                          style={{ width: "100%", height: 110 }}
                          resizeMode="contain"
                          source={{ uri: item.product_imagename }}
                        />
                        <Text
                          style={{
                            margin: 10,
                            fontSize: 16,
                            color: "#6b6e6a",
                            fontWeight: "600",
                            // fontFamily: "Gilroy-Bold",
                          }}
                        >
                          {item.product_name}
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000000",
                                fontWeight: "600",
                              }}
                            >
                              ₹ {item.price}
                            </Text>

                            {/* {console.log("yes",(cartItem.filter(itemm => itemm.product_id == item.product_id))[0]?.qty)} */}

                            {cartItem.filter(itemm => itemm.product_id == item.product_id).length > 0 ?   <View style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:2}}>
                                <TouchableOpacity style={{
                                  // backgroundColor:"red",
                                  width:40,
                                  height:40,
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
                                  width:40,
                                  height:40,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"center",
                                  // borderWidth:1,
                                  borderColor:"#bab7b6",
                                  borderRadius:5
                                }}>
                                  <Text style={{fontSize:20}}>
                                  {cartItem.filter(itemm => itemm.product_id == item.product_id)?.[0]?.qty}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                  // backgroundColor:"red",
                                  width:40,
                                  height:40,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"center",
                                  // borderWidth:1,
                                  borderColor:"#bab7b6",
                                  borderRadius:5
                                }}
                                onPress={() => increaseCartQuantity(item?.product_id)}
                                >
                                  <Text style={{fontSize:20,color:"#69AF5D"}}>
                                  <Entypo name="plus" size={20}/>
                                  </Text>
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
                          {increaseCardQuantity.length === 0 ? (
                            <></>
                          ) : (
                            <>
                              <View
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginVertical: 10,
                                }}
                              >
                                <View
                                  style={{
                                    backgroundColor: "green",
                                    borderRadius: 5,
                                    borderColor: "green",
                                    borderWidth: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                    width: "80%",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 10,
                                    // paddingVertical:10
                                  }}
                                >
                                  <Text
                                    // onPress={() =>
                                    //   decreaseCardQuantity(item.id)
                                    // }
                                    style={{
                                      fontSize: 30,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                      height: "100%",
                                    }}
                                  >
                                    -
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                    }}
                                  ></Text>
                                  <Text
                                    style={{
                                      fontSize: 30,
                                      fontWeight: "500",
                                      color: "#ffffff",
                                      height: "100%",
                                    }}
                                  >
                                    +
                                  </Text>
                                </View>
                              </View>
                            </>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </ScrollView>
        </View>
      </View>
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
