// // import { View, Text, FlatList, TouchableOpacity, ScrollView,Image } from "react-native";
// // import React, { useEffect, useState } from "react";
// // import { useNavigation } from '@react-navigation/native';
// // import { useMyContext } from "../context/Context";
// // import CartItemCard from "../components/CartItemCard";
// // import { CategoryData } from "../components/Category";
// // import { RootStackParamList } from "../../App";
// // import { NativeStackScreenProps } from "@react-navigation/native-stack";
// // import FontAwesome from "@expo/vector-icons/FontAwesome";
// // import { addItemsInOrder, loadCartData, saveCartItemInCartTable } from "./supabaseClient";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { current } from "@reduxjs/toolkit";
// // import Checkout from "./Checkout";
// // import { Entypo } from '@expo/vector-icons';
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import { Image } from "react-native-reanimated/lib/typescript/Animated";

// // type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

// // const Cart = () => {
// //   // const { cartItem ,addingItemInCart,refresh} = useMyContext();
// //   const navigation = useNavigation<any>();
// //   const [totalCartPrice,setTotalCartPrice] = useState(0);
// //   const [isCheckoutVisible,setIsCheckoutVisible] = useState(false);
// //   const [totalAmount,setTotalAmount] = useState(0);

// //   const {cartItem,clearCart,addingItemInCart,getAsyncStorageCartItemsAndAddInCart} = useMyContext();
// //   // console.log("cartItemm",cartItem);

// //   function generateRandomCode() {
// //     const length = 8;
// //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Define the characters to use
// //     let result = '';

// //     for (let i = 0; i < length; i++) {
// //       const randomIndex = Math.floor(Math.random() * characters.length);
// //       result += characters[randomIndex];
// //     }

// //     return result;
// //   }

// //   const getMonthName = (index) => {
// //     const arrOfMonth = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
// //     return(arrOfMonth[index])
// //   }

// //   const getCurrDate = () => {
// //      const currentDate = new Date();
// //     const date = currentDate.getDate();
// //     const monthNum = currentDate.getMonth();
// //     const monthName = getMonthName(monthNum);
// //     const year = currentDate.getFullYear();
// //     const fullDate =`${date} ${monthName} ${year}`;
// //     return fullDate;
// //   }

// //   const addCartItemOrder = async () => {
// //     console.log("cartData",cartItem);

// //     const totalAmount =  cartItem?.reduce((accumulator:any, currentValue:any) => {
// //       return accumulator + (currentValue.qty * currentValue.price);
// //     }, 0)

// //    const dateoforder = getCurrDate();

// //     const darkroomownerid = cartItem[0].darkroomownerid;

// //     const orderId =  generateRandomCode();
// //     addItemsInOrder(orderId,totalAmount,darkroomownerid,dateoforder,cartItem);
// //     clearCart();
// //   }

// //   return (
// //     <View style={{flex:1,backgroundColor:"rgb(255,255,255)"}}>
// //       <View
// //         style={{
// //           display: "flex",
// //           flex:1
// //         }}
// //       >
// //         <View style={{ width: "100%",height:650}}>
// //           {/* <FlatList
// //             data={cartItemList}
// //             renderItem={({ item }) => <CartItemCard item={item} />}
// //             keyExtractor={(item) => item.id}
// //           /> */}
// //           <ScrollView showsVerticalScrollIndicator={false}>
// //           {cartItem?.length > 0 ? cartItem?.map(item => <CartItemCard key={item?.product_id} item={item}/>) : <View style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:700}}><Text style={{fontSize:20,fontWeight:500,textAlign:"center",color:"#b3afaf"}}>Your cart is {"\n"}Empty</Text></View>}
// //           </ScrollView>
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           width: "100%",
// //           // borderWidth: 1,
// //           borderColor: "lightgrey",
// //           paddingHorizontal: 10,
// //           backgroundColor:'#fff',
// //           marginBottom: 10,
// //           display: "flex",
// //           rowGap: 5,
// //           height: 30
// //         }}
// //       >
// //         <View
// //           style={{
// //             width: "100%",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //           }}
// //         >
// //            {cartItem?.length > 0 ?
// //            (<TouchableOpacity
// //             style={{
// //               backgroundColor: "rgb(105,175,93)",
// //               height: 65,
// //               width: "100%",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               borderRadius: 15,
// //               flexDirection: "row",
// //               position:"absolute",
// //             }}
// //             onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}
// //           >
// //           <View>
// //             <Text style={{color:"rgb(252,252,252)",fontWeight:"500",fontSize:20}}>Go To Checkout:</Text>
// //           </View>
// //             <View
// //               style={{
// //                 height: 37,
// //                 width: 73,
// //                 position: "absolute",
// //                 backgroundColor: "rgb(22,100,50)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 flexDirection: "row",
// //                 borderRadius: 5,
// //                 right: 15,
// //               }}
// //             >
// //               <FontAwesome name="rupee" size={14} color="#ffffff" />
// //               <Text style={{ fontSize: 14, color: "#ffffff" }}>
// //                 {
// //                   cartItem?.reduce((accumulator:any, currentValue:any) => {
// //                     return accumulator + (currentValue.qty * currentValue.price);
// //                   }, 0)
// //                 }
// //               </Text>
// //             </View>
// //           </TouchableOpacity>) : (
// //               <TouchableOpacity
// //               style={{
// //                 backgroundColor: "rgb(105,175,93)",
// //                 height:60,
// //                 width: "100%",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 position: "absolute",
// //                 borderRadius: 10,
// //                 flexDirection: "row",
// //                 bottom:0
// //               }}
// //               onPress={() => navigation.navigate("SearchScreen")}
// //             >
// //               <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Go to Category</Text>
// //               {/* <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Empty cart</Text> */}
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>

// //       {isCheckoutVisible ? (
// //          <View style={{ backgroundColor: "white", position: "absolute", bottom:7, height: 600, borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
// //          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 100 }}>
// //              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1c1c1c" }}>Checkout</Text>
// //              <Entypo name="cross" size={28} color="black" style={{ position: "absolute", right: 10 }} onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}/>
// //          </View>
// //          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
// //          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
// //              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Delivery</Text>
// //              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}>Select method</Text><Image source={require("../../assets/Vector.png")} /></View>
// //          </View>
// //          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
// //          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
// //              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Payment</Text>
// //              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
// //                  <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
// //                      <Image style={{ marginRight: 18 }} source={require("../../assets/card.png")} />
// //                      <Image source={require("../../assets/Vector.png")} />
// //                  </View>
// //              </View>
// //          </View>
// //          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
// //          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
// //              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Promo Code</Text>
// //              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold", color: "black" }}>Pick discount</Text><Image source={require("../../assets/Vector.png")} /></View>
// //          </View>
// //          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
// //          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
// //              <Text style={{ fontSize: 18, color: "#828181", fontWeight: "500" }}>Total Cost</Text>
// //              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}> ₹{
// //                   cartItem.reduce((accumulator:any, currentValue:any) => {
// //                     return accumulator + (currentValue?.qty * currentValue?.price);
// //                   }, 0)
// //                 }</Text><Image source={require("../../assets/Vector.png")} /></View>
// //          </View>
// //          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
// //          <View style={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 20 }}>
// //              <Text style={{ color: "#828181", fontSize: 12, fontWeight: "bold" }}>By placing an order you agree to our{"\n"}<Text style={{ color: "black" }}>Terms</Text> and <Text style={{ color: "black" }}>Conditions</Text></Text>
// //          </View>
// //          <View style={{width: "100%", backgroundColor: "white", marginTop: 30, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center",paddingHorizontal:20}}>
// //              <TouchableOpacity style={{ backgroundColor: "#69AF5D",width:"100%",paddingVertical: 20,borderRadius:20}} onPress={() => navigation.replace("Orderaccepted")}>
// //                  <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white"}} onPress={() => {
// //                   addCartItemOrder()
// //                   navigation.navigate("Orderaccepted");
// //                   setIsCheckoutVisible(!isCheckoutVisible);
// //                   }}>Place Order</Text>
// //              </TouchableOpacity>
// //          </View>

// //      </View>
// //       ) : ""}
// //     </View>
// //   );
// // };
// // export default Cart;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useMyContext } from "../context/Context";
// import CartItemCard from "../components/CartItemCard";
// import { Entypo, FontAwesome } from "@expo/vector-icons";
// import { addItemsInOrder, getCurrentQuantityOfProducts } from "./supabaseClient";
// import { imageUrl } from "../../lib/constant";

// // Utility Functions
// const generateRandomCode = (length = 8) => {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   return Array.from({ length }, () =>
//     characters.charAt(Math.floor(Math.random() * characters.length))
//   ).join("");
// };

// const getMonthName = (index) =>
//   [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ][index];

// // console.log("getMonthName",getMonthName);

// const getCurrDate = () => {
//   const currentDate = new Date();
//   return `${currentDate.getDate()} ${getMonthName(
//     currentDate.getMonth()
//   )} ${currentDate.getFullYear()}`;
// };

// // Cart Component
// const Cart = () => {
//   const focused = useIsFocused();
//   const navigation = useNavigation();
//   const { cartItem, clearCart } = useMyContext();
//   const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
//   const [isCheckingVisible,setIsCheckingVisible] = useState(false);

//   const [currentProduct,setCurrentProduct] = useState([]);
//   console.log("currPro",currentProduct);
  

//   const calculateTotalAmount = () => {
//     return (
//       cartItem?.reduce((acc, item) => acc + item?.qty * item?.price, 0) ?? 0
//     );
//   };

//   const handleCheckout = async () => {
//     const totalAmount = calculateTotalAmount();
//     const dateOfOrder = getCurrDate();
//     const darkroomOwnerId = cartItem?.[0]?.darkroomownerid;
//     const orderId = generateRandomCode();

//     await addItemsInOrder(
//       orderId,
//       totalAmount,
//       darkroomOwnerId,
//       dateOfOrder,
//       cartItem
//     );
//     clearCart();
//     navigation.navigate("Orderaccepted");
//     setIsCheckoutVisible(false);
//   };

//   const loadCurrentProduct = async () => {
//       const data = await getCurrentQuantityOfProducts(); 
//       setCurrentProduct(data);
//   }

//   useEffect(() => {
//     loadCurrentProduct();
//   },[focused])

//   const renderCartItems = () => (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       {cartItem?.length > 0 ? (
//         cartItem.map((item) => (
//           <CartItemCard key={item?.product_id} item={item} />
//         ))
//       ) : (
//         <View style={styles.emptyCartContainer}>
//           <Text style={styles.emptyCartText}>Your cart is {"\n"}Empty</Text>
//         </View>
//       )}
//     </ScrollView>
//   );

//   const orderSummary = () => {
//     return <ScrollView style={{backgroundColor: "white",
//       position: "absolute",
//       bottom: 0,
//       height: "105%",
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       padding: 10,
//       width: "100%"}}>
//         <Text style={{textAlign:"center"}}>Order Summary</Text>
//       <View style={{flexDirection:"row",gap:5,justifyContent:"space-between"}}>
//         <View>
//           <Text>Product</Text>
//         </View>
//         <View>
//           <Text>Availability</Text>
//         </View>
//         <View>
//           <Text>Quantity</Text>
//         </View>
//         <View>
//           <Text>Each</Text>
//         </View>
//         <View>
//           <Text>Total</Text>
//         </View>
//       </View>
//     </ScrollView>
//   }

//   const renderCheckout = () => (
//     <View style={styles.checkoutContainer}>
//       <View style={styles.checkoutHeader}>
//         <Text style={styles.checkoutTitle}>Checkout</Text>
//         <Entypo
//           name="cross"
//           size={28}
//           color="black"
//           onPress={() => setIsCheckoutVisible(false)}
//         />
//       </View>
//       <View style={styles.separator} />
//       <View style={styles.checkoutSection}>
//         <Text style={styles.sectionTitle}>Delivery</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.sectionContentText}>Select method</Text>
//           <Image source={require("../../assets/Vector.png")} />
//         </View>
//       </View>
//       <View style={styles.separator} />
//       <View style={styles.checkoutSection}>
//         <Text style={styles.sectionTitle}>Payment</Text>
//         <View style={styles.sectionContent}>
//           <Image
//             style={styles.paymentIcon}
//             source={require("../../assets/card.png")}
//           />
//           <Image source={require("../../assets/Vector.png")} />
//         </View>
//       </View>
//       <View style={styles.separator} />
//       <View style={styles.checkoutSection}>
//         <Text style={styles.sectionTitle}>Promo Code</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.sectionContentText}>Pick discount</Text>
//           <Image source={require("../../assets/Vector.png")} />
//         </View>
//       </View>
//       <View style={styles.separator} />
//       <View style={styles.checkoutSection}>
//         <Text style={styles.sectionTitle}>Total Cost</Text>
//         <View style={styles.sectionContent}>
//           <Text style={styles.totalCost}>₹{calculateTotalAmount()}</Text>
//           <Image source={require("../../assets/Vector.png")} />
//         </View>
//       </View>
//       <Text style={styles.termsText}>
//         By placing an order you agree to our{"\n"}
//         <Text style={styles.termsLink}>Terms</Text> and{" "}
//         <Text style={styles.termsLink}>Conditions</Text>
//       </Text>
//       <TouchableOpacity
//         style={styles.placeOrderButton}
//         onPress={handleCheckout}
//       >
//         <Text style={styles.placeOrderButtonText}>Place Order</Text>
//       </TouchableOpacity>
//     </View>
//   );


//   return (
//     <View style={styles.container}>
//       {/* <View style={styles.cartListContainer}> */}
//       <ScrollView style={styles.cartListContainer}>
//         {renderCartItems()}
//       </ScrollView>
//       {/* </View> */}
//       <View style={styles.checkoutButtonContainer}>
//         {cartItem?.length > 0 ? (
//           <TouchableOpacity
//             style={styles.checkoutButton}
//             onPress={() => setIsCheckoutVisible(true)}
//           >
//             <Text style={styles.checkoutButtonText}>Go To Checkout</Text>
//             <View style={styles.totalAmountContainer}>
//               <FontAwesome name="rupee" size={14} color="#ffffff" />
//               <Text style={styles.totalAmount}>{calculateTotalAmount()}</Text>
//             </View>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.goToCategoryButton}
//             onPress={() => navigation.navigate("SearchScreen")}
//           >
//             <Text style={styles.goToCategoryText}>Go to Category</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//         {isCheckoutVisible && renderCheckout()}
        
//          {/* {isCheckoutVisible && orderSummary()} */}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgb(255,255,255)",
//   },
//   cartListContainer: {
//     // flex: 1,
//     marginBottom: 70,
//   },
//   emptyCartContainer: {
//     width: "100%",
//     height: 700,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyCartText: {
//     fontSize: 20,
//     fontWeight: "500",
//     textAlign: "center",
//     color: "#b3afaf",
//   },
//   checkoutButtonContainer: {
//     width: "100%",
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     borderColor: "lightgrey",
//     borderTopWidth: 1,
//     position: "absolute",
//     bottom: 0,
//     height: 80,
//   },
//   checkoutButton: {
//     backgroundColor: "rgb(105,175,93)",
//     height: 65,
//     width: "100%",
//     borderRadius: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   checkoutButtonText: {
//     color: "rgb(252,252,252)",
//     fontWeight: "500",
//     fontSize: 20,
//   },
//   totalAmountContainer: {
//     height: 37,
//     width: 73,
//     backgroundColor: "rgb(22,100,50)",
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     right: 15,
//     flexDirection: "row",
//   },
//   totalAmount: {
//     fontSize: 14,
//     color: "#ffffff",
//   },
//   goToCategoryButton: {
//     backgroundColor: "rgb(105,175,93)",
//     height: 60,
//     width: "100%",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "absolute",
//     bottom: 0,
//     margin: 10,
//   },
//   goToCategoryText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   checkoutContainer: {
//     backgroundColor: "white",
//     position: "absolute",
//     bottom: 0,
//     height: 600,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 10,
//     width: "100%",
//   },
//   checkoutHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 100,
//   },
//   checkoutTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1c1c1c",
//   },
//   separator: {
//     width: "100%",
//     height: 2,
//     backgroundColor: "#edebeb",
//   },
//   checkoutSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 55,
//     paddingHorizontal: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: "#8c8c8c",
//     fontWeight: "500",
//   },
//   sectionContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   sectionContentText: {
//     fontWeight: "bold",
//   },
//   paymentIcon: {
//     marginRight: 18,
//   },
//   totalCost: {
//     fontWeight: "bold",
//   },
//   termsText: {
//     color: "#828181",
//     fontSize: 12,
//     fontWeight: "bold",
//     marginVertical: 15,
//   },
//   termsLink: {
//     color: "black",
//   },
//   placeOrderButton: {
//     backgroundColor: "#69AF5D",
//     width: "100%",
//     paddingVertical: 15,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   placeOrderButtonText: {
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "white",
//   },
// });

// export default Cart;


// import { View, Text, FlatList, TouchableOpacity, ScrollView,Image } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useNavigation } from '@react-navigation/native';
// import { useMyContext } from "../context/Context";
// import CartItemCard from "../components/CartItemCard";
// import { CategoryData } from "../components/Category";
// import { RootStackParamList } from "../../App";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { addItemsInOrder, loadCartData, saveCartItemInCartTable } from "./supabaseClient";
// // import { useDispatch, useSelector } from "react-redux";
// // import { current } from "@reduxjs/toolkit";
// import Checkout from "./Checkout";
// import { Entypo } from '@expo/vector-icons';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { Image } from "react-native-reanimated/lib/typescript/Animated";

// type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

// const Cart = () => {
//   // const { cartItem ,addingItemInCart,refresh} = useMyContext();
//   const navigation = useNavigation<any>();
//   const [totalCartPrice,setTotalCartPrice] = useState(0);
//   const [isCheckoutVisible,setIsCheckoutVisible] = useState(false);
//   const [totalAmount,setTotalAmount] = useState(0);

//   const {cartItem,clearCart,addingItemInCart,getAsyncStorageCartItemsAndAddInCart} = useMyContext();
//   // console.log("cartItemm",cartItem);

//   function generateRandomCode() {
//     const length = 8;
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Define the characters to use
//     let result = '';

//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       result += characters[randomIndex];
//     }

//     return result;
//   }

//   const getMonthName = (index) => {
//     const arrOfMonth = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
//     return(arrOfMonth[index])
//   }

//   const getCurrDate = () => {
//      const currentDate = new Date();
//     const date = currentDate.getDate();
//     const monthNum = currentDate.getMonth();
//     const monthName = getMonthName(monthNum);
//     const year = currentDate.getFullYear();
//     const fullDate =`${date} ${monthName} ${year}`;
//     return fullDate;
//   }

//   const addCartItemOrder = async () => {
//     console.log("cartData",cartItem);

//     const totalAmount =  cartItem?.reduce((accumulator:any, currentValue:any) => {
//       return accumulator + (currentValue.qty * currentValue.price);
//     }, 0)

//    const dateoforder = getCurrDate();

//     const darkroomownerid = cartItem[0].darkroomownerid;

//     const orderId =  generateRandomCode();
//     addItemsInOrder(orderId,totalAmount,darkroomownerid,dateoforder,cartItem);
//     clearCart();
//   }

//   return (
//     <View style={{flex:1,backgroundColor:"rgb(255,255,255)"}}>
//       <View
//         style={{
//           display: "flex",
//           flex:1
//         }}
//       >
//         <View style={{ width: "100%",height:650}}>
//           {/* <FlatList
//             data={cartItemList}
//             renderItem={({ item }) => <CartItemCard item={item} />}
//             keyExtractor={(item) => item.id}
//           /> */}
//           <ScrollView showsVerticalScrollIndicator={false}>
//           {cartItem?.length > 0 ? cartItem?.map(item => <CartItemCard key={item?.product_id} item={item}/>) : <View style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:700}}><Text style={{fontSize:20,fontWeight:500,textAlign:"center",color:"#b3afaf"}}>Your cart is {"\n"}Empty</Text></View>}
//           </ScrollView>
//         </View>
//       </View>
//       <View
//         style={{
//           width: "100%",
//           // borderWidth: 1,
//           borderColor: "lightgrey",
//           paddingHorizontal: 10,
//           backgroundColor:'#fff',
//           marginBottom: 10,
//           display: "flex",
//           rowGap: 5,
//           height: 30
//         }}
//       >
//         <View
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//            {cartItem?.length > 0 ?
//            (<TouchableOpacity
//             style={{
//               backgroundColor: "rgb(105,175,93)",
//               height: 65,
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 15,
//               flexDirection: "row",
//               position:"absolute",
//             }}
//             onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}
//           >
//           <View>
//             <Text style={{color:"rgb(252,252,252)",fontWeight:"500",fontSize:20}}>Go To Checkout:</Text>
//           </View>
//             <View
//               style={{
//                 height: 37,
//                 width: 73,
//                 position: "absolute",
//                 backgroundColor: "rgb(22,100,50)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "row",
//                 borderRadius: 5,
//                 right: 15,
//               }}
//             >
//               <FontAwesome name="rupee" size={14} color="#ffffff" />
//               <Text style={{ fontSize: 14, color: "#ffffff" }}>
//                 {
//                   cartItem?.reduce((accumulator:any, currentValue:any) => {
//                     return accumulator + (currentValue.qty * currentValue.price);
//                   }, 0)
//                 }
//               </Text>
//             </View>
//           </TouchableOpacity>) : (
//               <TouchableOpacity
//               style={{
//                 backgroundColor: "rgb(105,175,93)",
//                 height:60,
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: "absolute",
//                 borderRadius: 10,
//                 flexDirection: "row",
//                 bottom:0
//               }}
//               onPress={() => navigation.navigate("SearchScreen")}
//             >
//               <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Go to Category</Text>
//               {/* <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Empty cart</Text> */}
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {isCheckoutVisible ? (
//          <View style={{ backgroundColor: "white", position: "absolute", bottom:7, height: 600, borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
//          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 100 }}>
//              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1c1c1c" }}>Checkout</Text>
//              <Entypo name="cross" size={28} color="black" style={{ position: "absolute", right: 10 }} onPress={() => setIsCheckoutVisible(!isCheckoutVisible)}/>
//          </View>
//          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
//          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
//              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Delivery</Text>
//              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}>Select method</Text><Image source={require("../../assets/Vector.png")} /></View>
//          </View>
//          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
//          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55 }}>
//              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Payment</Text>
//              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
//                  <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
//                      <Image style={{ marginRight: 18 }} source={require("../../assets/card.png")} />
//                      <Image source={require("../../assets/Vector.png")} />
//                  </View>
//              </View>
//          </View>
//          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
//          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
//              <Text style={{ fontSize: 18, color: "#8c8c8c", fontWeight: "500" }}>Promo Code</Text>
//              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold", color: "black" }}>Pick discount</Text><Image source={require("../../assets/Vector.png")} /></View>
//          </View>
//          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
//          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", height: 55, shadowColor: "#edebeb" }}>
//              <Text style={{ fontSize: 18, color: "#828181", fontWeight: "500" }}>Total Cost</Text>
//              <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><Text style={{ fontWeight: "bold" }}> ₹{
//                   cartItem.reduce((accumulator:any, currentValue:any) => {
//                     return accumulator + (currentValue?.qty * currentValue?.price);
//                   }, 0)
//                 }</Text><Image source={require("../../assets/Vector.png")} /></View>
//          </View>
//          <Text style={{ width: "100%", height: 2, backgroundColor: "#edebeb" }}></Text>
//          <View style={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 20 }}>
//              <Text style={{ color: "#828181", fontSize: 12, fontWeight: "bold" }}>By placing an order you agree to our{"\n"}<Text style={{ color: "black" }}>Terms</Text> and <Text style={{ color: "black" }}>Conditions</Text></Text>
//          </View>
//          <View style={{width: "100%", backgroundColor: "white", marginTop: 30, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center",paddingHorizontal:20}}>
//              <TouchableOpacity style={{ backgroundColor: "#69AF5D",width:"100%",paddingVertical: 20,borderRadius:20}} onPress={() => navigation.replace("Orderaccepted")}>
//                  <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white"}} onPress={() => {
//                   addCartItemOrder()
//                   navigation.navigate("Orderaccepted");
//                   setIsCheckoutVisible(!isCheckoutVisible);
//                   }}>Place Order</Text>
//              </TouchableOpacity>
//          </View>

//      </View>
//       ) : ""}
//     </View>
//   );
// };
// export default Cart;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useMyContext } from "../context/Context";
import CartItemCard from "../components/CartItemCard";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { addItemsInOrder, getCurrentQuantityOfProducts } from "./supabaseClient";
import { imageUrl } from "../../lib/constant";

// Utility Functions
const generateRandomCode = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

const getMonthName = (index) =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][index];

// console.log("getMonthName",getMonthName);

const getCurrDate = () => {
  const currentDate = new Date();
  return `${currentDate.getDate()} ${getMonthName(
    currentDate.getMonth()
  )} ${currentDate.getFullYear()}`;
};

// Cart Component
const Cart = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();

  // getting context state 
  const { cartItem, clearCart } = useMyContext();

  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isCheckingVisible,setIsCheckingVisible] = useState(false);

  const [currentProduct,setCurrentProduct] = useState([]);
  
  // loadCurrentProduct
  const loadCurrentProduct = async () => {
      const data = await getCurrentQuantityOfProducts(); 
      setCurrentProduct(data);
  }

  // calculating total amount
   const calculateTotalAmount = () => {
    return (
      cartItem?.reduce((acc, item) => acc + item?.qty * item?.price, 0) ?? 0
    );
  };

  // laoding current product quantity
  useEffect(() => {
    loadCurrentProduct();
  },[focused])

  const renderCartItems = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {cartItem?.length > 0 ? (
        cartItem.map((item) => (
          <CartItemCard key={item?.product_id} item={item} />
        ))
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is {"\n"}Empty</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.cartListContainer}> */}
      <ScrollView style={styles.cartListContainer}>
        {renderCartItems()}
      </ScrollView>
      {/* </View> */}
      <View style={styles.checkoutButtonContainer}>
        {cartItem?.length > 0 ? (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              navigation.navigate("OrderSummary");
            }}
          >
            <Text style={styles.checkoutButtonText}>Go To Checkout</Text>
            <View style={styles.totalAmountContainer}>
              <FontAwesome name="rupee" size={14} color="#ffffff" />
              <Text style={styles.totalAmount}>{calculateTotalAmount()}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.goToCategoryButton}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.goToCategoryText}>Go to Category</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
  },
  cartListContainer: {
    // flex: 1,
    marginBottom: 70,
  },
  emptyCartContainer: {
    width: "100%",
    height: 700,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#b3afaf",
  },
  checkoutButtonContainer: {
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: "lightgrey",
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    height: 80,
  },
  checkoutButton: {
    backgroundColor: "rgb(105,175,93)",
    height: 65,
    width: "100%",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    color: "rgb(252,252,252)",
    fontWeight: "500",
    fontSize: 20,
  },
  totalAmountContainer: {
    height: 37,
    width: 73,
    backgroundColor: "rgb(22,100,50)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    flexDirection: "row",
  },
  totalAmount: {
    fontSize: 14,
    color: "#ffffff",
  },
  goToCategoryButton: {
    backgroundColor: "rgb(105,175,93)",
    height: 60,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    margin: 10,
  },
  goToCategoryText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

 
});

export default Cart;

