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
import { supabase } from "./supabaseClient";

const Tab = createBottomTabNavigator<RootStackParamList>();
const apiKey=""

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

  const {
    getItemQuintity,
    decreaseCardQuantity,
    removeFromcart,
  } = useMyContext();

  const { cartItem } = useMyContext();
  const [products, setProducts] = useState<any>([]);
  const [increaseCardQuantity, setincreaseCardQuantity] = useState<string[]>(
    []
  );
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

  const fetchData = async (newId:string) => {
console.log("newid",newId)
    const resp: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("category_id", newId);
    console.log("resp", resp);

    setProducts(resp.data);
  };
  // const newId = category_id.route.params.category_id;
  useEffect(() => {
    fetchData(newId);
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
                            fontFamily: "Gilroy-Bold",
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
                              justifyContent: "space-around",
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
                            <TouchableOpacity
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
                                  fontSize: 30,
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                              >
                                +
                              </Text>
                            </TouchableOpacity>
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
                                    onPress={() =>
                                      decreaseCardQuantity(item.id)
                                    }
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


// {products?.map((item, index) => {
//   // {console.log("find Products",item)}
//   return (
//     <TouchableOpacity
//       style={styles.body}
//       onPress={() =>
//         navigation.navigate("Product_Details", {
//           // name: item.name,
//           // imgUrl: item.imgUrl,
//           // id: item.id,
//         })
//       }
//     >
//       <View key={item.product_id}>
//         <Image
//           style={{ width: "100%", height: 110 }}
//           resizeMode="contain"
//           source={{ uri: item.product_imagename }}
//         />
//         <Text
//           style={{
//             margin: 10,
//             fontSize: 15,
//             color: "#6b6e6a",
//             fontWeight: "600",
//           }}
//         >
//           {item.product_name}
//         </Text>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             // backgroundColor: "green",
//           }}
//         >