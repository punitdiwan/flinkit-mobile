import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { CategoryData } from "../components/Category";

import SearchCard from "../components/SearchCard";
import { useMyContext } from "../context/Context";

import { RootStackParamList } from "../../App";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNav from "./BottomNav";
import { supabase } from "./supabaseClient";
const myArray = [1];

// ----------------------------------------------------------
// {products?.map((item, index) => {
//   return (
// <TouchableOpacity
//   style={styles.body}
//   onPress={() =>
//     navigation.navigate("Product_Details", {
//       // name: item.name,
//       // imgUrl: item.imgUrl,
//       // id: item.id,
//     })
//   }
// >
//   <View style={{ backgroundColor: "pink" }}>
//     <Image
//       style={{ width: "100%", height: 110 }}
//       resizeMode="contain"
//       source={{ uri: item.product_imagename }}
//     />
//     <Text
//       style={{
//         margin: 10,
//         fontSize: 15,
//         color: "#6b6e6a",
//         fontWeight: "600",
//       }}
//     >
//       {item.product_name}
//     </Text>
//     <View
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         backgroundColor: "green",
//       }}
//     >
//       <View
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           flexDirection: "row",
//           gap: 10,
//           backgroundColor: "red",
//         }}
//       >
//         <Text
//           style={{
//             textDecorationLine: "line-through",
//             fontSize: 15,
//             color: "#6b6e6a",
//             fontWeight: "600",
//           }}
//         >
//           ₹
//         </Text>
//         <Text
//           style={{
//             fontSize: 15,
//             color: "#000000",
//             fontWeight: "600",
//           }}
//         >
//           ₹ {item.price}
//         </Text>
//       </View>
//       {quantity === 0 ? (
//         <>
//           <View
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginVertical: 10,
//             }}
//           >
//             <TouchableOpacity
//               style={{
//                 padding: 10,
//                 backgroundColor: "#b5e8ae",
//                 borderRadius: 5,
//                 borderColor: "green",
//                 borderWidth: 1,
//                 width: "80%",
//               }}
//               onPress={() => increaseCardQuantity(item.id)}
//             >
//               <Text
//                 style={{
//                   color: "green",
//                   textAlign: "center",
//                 }}
//               >
//                 ADD
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <>
//           <View
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginVertical: 10,
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "green",
//                 borderRadius: 5,
//                 borderColor: "green",
//                 borderWidth: 1,
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: 10,
//                 alignItems: "center",
//                 width: "80%",
//                 justifyContent: "space-between",
//                 paddingHorizontal: 10,
//                 // paddingVertical:10
//               }}
//             >
//               <Text
//                 onPress={() => decreaseCardQuantity(item.id)}
//                 style={{
//                   fontSize: 30,
//                   fontWeight: "500",
//                   color: "#ffffff",
//                   height: "100%",
//                 }}
//               >
//                 -
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontWeight: "500",
//                   color: "#ffffff",
//                 }}
//               >
//                 {quantity}
//               </Text>
//               <Text
//                 // onPress={() => increaseCardQuantity(item.id)}
//                 style={{
//                   fontSize: 30,
//                   fontWeight: "500",
//                   color: "#ffffff",
//                   height: "100%",
//                 }}
//               >
//                 +
//               </Text>
//             </View>
//           </View>
//         </>
//       )}
//     </View>
//   </View>
// </TouchableOpacity>
//   );

// })}
// --------------------------------------------------------------------------------
const Tab = createBottomTabNavigator<RootStackParamList>();
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw";


const CategoryScreen = (category_id: any) => {
  console.log("categoryIdComingInCategoryScreen",category_id.route.params.category_id);
  const newId=category_id.route.params.category_id
  const {
    getItemQuintity,
    decreaseCardQuantity,
    removeFromcart,
  } = useMyContext();

  const { cartItem } = useMyContext();
  const [products, setProducts] = useState([]);
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
      <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {/* <View style={{ width: "20%", height: "auto" }}>
          <ScrollView
            style={{ padding: 5 }}
            showsVerticalScrollIndicator={true}
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
        </View> */}
        <View style={{ width: "100%", height: "auto" }}>
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
              {products?.map((item, index) => {
                // {console.log("find Products",item)}
                return (
                  <TouchableOpacity
                    style={styles.body}
                    onPress={() =>
                      navigation.navigate("Product_Details", {
                        // name: item.name,
                        // imgUrl: item.imgUrl,
                        // id: item.id,
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
                          fontSize: 15,
                          color: "#6b6e6a",
                          fontWeight: "600",
                        }}
                      >
                        {item.product_name}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          // backgroundColor: "green",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                              fontSize: 15,
                              color: "#6b6e6a",
                              fontWeight: "600",
                            }}
                          >
                            ₹
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            ₹ {item.price}
                          </Text>
                        </View>
                        {increaseCardQuantity.length === 0 ? (
                          <>
                            <View
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 10,
                              }}
                            >
                              <TouchableOpacity
                                style={{
                                  padding: 10,
                                  backgroundColor: "#b5e8ae",
                                  borderRadius: 5,
                                  borderColor: "green",
                                  borderWidth: 1,
                                  width: "80%",
                                }}
                                onPress={() => increaseCardQuantity(item.id)}
                              >
                                <Text
                                  style={{
                                    color: "green",
                                    textAlign: "center",
                                  }}
                                >
                                  ADD
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
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
                                  onPress={() => decreaseCardQuantity(item.id)}
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
                                >
                                  {quantity}
                                </Text>
                                <Text
                                  onPress={() => increaseCardQuantity(item.id)}
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
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};
{
  /* {products.map((item, index) => {
                return <SearchCard key={item.product_id} item={products} />;
              // })} */
}
export default CategoryScreen;

const styles = StyleSheet.create({
  body: {
    width: "45%",
    height: "auto",
    backgroundColor: "#ffffff",

    borderRadius: 10,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
