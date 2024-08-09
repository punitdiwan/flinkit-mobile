// import * as React from "react";
// import {
//   JSXElementConstructor,
//   Key,
//   ReactElement,
//   ReactNode,
//   ReactPortal,
// } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import {
//   addFavouriteItem,
//   addToCart,
//   getAllTopRatedProducts,
//   loadCartData,
// } from "../screens/supabaseClient";
// import { useMyContext } from "../context/Context";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
// import { imageUrl } from "../../lib/constant";

// const HomePageCard = ({ name, data }: any) => {
//   // console.log("data",data);
//   const [count, setCount] = React.useState(0);

//   const imgUrl =
//     "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png";

//   const {
//     cartItem,
//     addingItemInCart,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//   } = useMyContext();

//   const navigation = useNavigation();
//   return (
//     <SafeAreaView>
//       <View style={{}}>
//         <View
//           style={{
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             paddingHorizontal: 20,
//             marginVertical: 5,
//             backgroundColor: "rgb(255,255,255)",
//           }}
//         >
//           <Text
//             style={{
//               width: "60%",
//               color: "#181725",
//               fontSize: 22,
//               fontFamily: "Gilroy-Bold",
//             }}
//           >
//             {name}
//           </Text>
//           <Text
//             style={{
//               width: "auto",
//               color: "#69AF5D",
//               fontSize: 15,
//               fontFamily: "Gilroy-Bold",
//             }}
//             onPress={() => navigation.navigate("TopRated")}
//           >
//             See all
//           </Text>
//         </View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{
//             paddingHorizontal: 15,
//             paddingTop: 10,
//             // marginBottom:20,
//             backgroundColor: "rgb(255,255,255)",
//             gap: 10,
//           }}
//         >
//           {data?.length > 0 ? (
//             data.map((item: any) => {
//               const longProductName =
//                 item?.product_name?.length > 18 ? true : false;
//               item.product_name = longProductName
//                 ? `${item?.product_name?.slice(0, 18)}...`
//                 : item?.product_name;

//               return (
//                 <View
//                   key={item?.product_id}
//                   style={{
//                     backgroundColor: "white",
//                     width: 185,
//                     marginVertical: 3,
//                     paddingVertical: 30,
//                     paddingHorizontal: 10,
//                     borderRadius: 15,
//                     height: 270,
//                     borderColor: "rgb(233,233,233)",
//                     borderWidth: 1,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate("Productdetail", {
//                         id: item?.product_id,
//                       })
//                     }
//                   >
//                     <View>
//                       <Image
//                         style={{ width: "100%", height: 110 }}
//                         resizeMode="contain"
//                         source={{
//                           uri: `${imageUrl}${item?.imagename[0]?.name}`,
//                         }}
//                       />
//                       <View>
//                         <Text
//                           style={{
//                             fontSize: 15,
//                             fontWeight: "bold",
//                             color: "rgb(38,37,50)",
//                           }}
//                         >
//                           {item?.product_name}
//                         </Text>
//                       </View>
//                       <Text
//                         style={{
//                           paddingTop: 5,
//                           color: "rgb(205,205,205)",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         325ml,Price
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         marginTop: 15,
//                         alignItems: "center",
//                       }}
//                     >
//                       <View>
//                         <Text
//                           style={{
//                             fontSize: 15,
//                             fontWeight: "bold",
//                             color: "rgb(38,37,50)",
//                           }}
//                         >
//                           ₹{item?.price}
//                         </Text>
//                       </View>

//                       {item?.product_total_qty == 0 ? (
//                         <View
//                           style={{
//                             backgroundColor: "#E3E3E3",
//                             paddingHorizontal: 5,
//                             paddingVertical: 2,
//                             borderRadius: 5,
//                           }}
//                         >
//                           <Text style={{ color: "red", fontWeight: 500 }}>
//                             Out Of Stock
//                           </Text>
//                         </View>
//                       ) : cartItem.filter(
//                           (itemm) => itemm?.product_id == item?.product_id
//                         ).length > 0 ? (
//                         <View
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             flexDirection: "row",
//                             gap: 2,
//                           }}
//                         >
//                           <TouchableOpacity
//                             style={{
//                               // backgroundColor:"red",
//                               width: 30,
//                               height: 30,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               // borderWidth:1,
//                               borderColor: "#bab7b6",
//                               borderRadius: 5,
//                             }}
//                             onPress={() =>
//                               decreaseCartQuantity(item?.product_id)
//                             }
//                           >
//                             <Text style={{ color: "#bab7b6" }}>
//                               <Entypo name="minus" size={20} />
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             style={{
//                               // backgroundColor:"red",
//                               width: 30,
//                               height: 30,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               // borderWidth:1,
//                               borderColor: "#bab7b6",
//                               borderRadius: 5,
//                             }}
//                           >
//                             <Text style={{ fontSize: 20 }}>
//                               {
//                                 cartItem.filter(
//                                   (itemm) =>
//                                     itemm?.product_id == item?.product_id
//                                 )?.[0]?.qty
//                               }
//                             </Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity
//                             style={{
//                               width: 30,
//                               height: 30,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               // borderWidth:1,
//                               borderColor: "#bab7b6",
//                               borderRadius: 5,
//                             }}
//                             onPress={() =>
//                               increaseCartQuantity(item?.product_id)
//                             }
//                           >
//                             <Entypo
//                               name="plus"
//                               style={{ fontSize: 20, color: "#69AF5D" }}
//                             />
//                           </TouchableOpacity>
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           style={{
//                             width: 40,
//                             height: 40,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             backgroundColor: "rgb(105,175,93)",
//                             borderRadius: 15,
//                           }}
//                         >
//                           <Text
//                             style={{
//                               fontSize: 25,
//                               fontWeight: "bold",
//                               color: "white",
//                               // backgroundColor:"red",
//                               // backgroundColor:""
//                             }}
//                             onPress={() => addingItemInCart(item)}
//                           >
//                             +
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               );
//             })
//           ) : (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%",
//               }}
//             >
//               <ActivityIndicator size={"large"} color={"rgb(105,175,94)"} />
//             </View>
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomePageCard;

// const styles = StyleSheet.create({});

import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { useMyContext } from "../context/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageUrl } from "../../lib/constant";

const HomePageCard = ({ name, data }: any) => {
  const [count, setCount] = React.useState(0);
  const navigation = useNavigation();
  const { cartItem, addingItemInCart, increaseCartQuantity, decreaseCartQuantity } = useMyContext();

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth <= 600 ? windowWidth * 0.45 : 185; // Adjust item width based on screen width

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 5, backgroundColor: "rgb(255,255,255)" }}>
          <Text style={{ width: "60%", color: "#181725", fontSize: 22, fontFamily: "Gilroy-Bold" }}>{name}</Text>
          <TouchableOpacity style={{ width: "auto"}} onPress={() => navigation.navigate("TopRated")}>
            <Text style={{fontWeight:500,color:"rgb(105,175,94)"}}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10, backgroundColor: "rgb(255,255,255)", gap: 10 }}>
          {data?.length > 0 ? (
            data.map((item: any) => {
              const longProductName = item?.product_name?.length > 18;
              const truncatedName = longProductName ? `${item?.product_name?.slice(0, 18)}...` : item?.product_name;

              return (
                <TouchableOpacity key={item?.product_id} style={{ width: itemWidth, backgroundColor: "white", marginVertical: 3, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 15, borderColor: "rgb(233,233,233)", borderWidth: 1,height:248,elevation:1 }} onPress={() => navigation.navigate("Productdetail", { id: item?.product_id })}>
                  <View>
                    <Image style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: `${imageUrl}${item?.imagename[0]?.name}` }} />
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>{truncatedName}</Text>
                    <Text style={{ paddingTop: 5, color: "rgb(205,205,205)", fontWeight: "bold" }}>325ml, Price</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>₹{item?.price}</Text>
                    {item?.product_total_qty === 0 ? (
                      <View style={{ backgroundColor: "#E3E3E3", paddingHorizontal: 5, paddingVertical: 2, borderRadius: 5 }}>
                        <Text style={{ color: "red", fontWeight: "bold" }}>Out Of Stock</Text>
                      </View>
                    ) : (
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {cartItem.filter((itemm) => itemm?.product_id === item?.product_id).length > 0 ? (
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center", borderColor: "#bab7b6", borderRadius: 5 }} onPress={() => decreaseCartQuantity(item?.product_id)}>
                              <Entypo name="minus" size={20} color="#69AF5D" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>{cartItem.find(itemm => itemm?.product_id === item?.product_id)?.qty}</Text>
                            <TouchableOpacity style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center", borderColor: "#bab7b6", borderRadius: 5 }} onPress={() => increaseCartQuantity(item?.product_id)}>
                              <Entypo name="plus" size={20} color="#69AF5D" />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(105,175,93)", borderRadius: 15 }} onPress={() => addingItemInCart(item)}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>+</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
              <ActivityIndicator size={"large"} color={"rgb(105,175,94)"} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomePageCard;





