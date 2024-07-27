// import React, { useEffect, useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { loadOrders } from "./supabaseClient";
// import { useNavigation } from "@react-navigation/native";
// import { useIsFocused } from "@react-navigation/native";
// import { imageUrl } from "../../lib/constant";

// // order history page

// const Orders = () => {
//   const focus = useIsFocused();

//   const [upcomingOrder, setUpcomingOrder] = useState(true);
//   const [ordersdata, setOrdersData] = useState([]);

//   let checkUpcomingProductOrNot = 0;
//   let checkPreviousProductOrNot = 0;

//   //   navigation
//   const navigation = useNavigation();

//   // calling useEffect to load Order related to user
//   const gettingOrdersRelatedToUser = async () => {
//     const orders = await loadOrders();
//     const date = Date(orders[0]?.created_at);
//     setOrdersData(orders);
//   };

//   useEffect(() => {
//     gettingOrdersRelatedToUser();
//   }, [focus]);

//   return (
//     <View
//       style={{
//         width: "100%",
//         minHeight: "100%",
//         // backgroundColor: "rgb(238,238,238)",
//         backgroundColor: "#FFFFFF",
//       }}
//     >
//       {ordersdata?.length == 0 ? (
//         <View>
//           <View
//             style={{ width: "100%", height: "100%", justifyContent: "center" }}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "semibold",
//                 color: "#969696",
//                 textAlign: "center",
//               }}
//             >
//               " You not orders anything yet "
//             </Text>
//             <View style={{ width: "100%", position: "absolute", bottom: 100 }}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "rgb(105,174,94)",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginHorizontal: 10,
//                   paddingVertical: 10,
//                   borderRadius: 10,
//                 }}
//                 onPress={() => navigation.navigate("SearchScreen")}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontSize: 20,
//                     fontWeight: "bold",
//                     textAlign: "center",
//                   }}

//                 >
//                   Shop Now
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-around",
//               paddingVertical: 10,
//               // gap: 5,
//               paddingHorizontal: 10,
//               height: "auto",
//               //   backgroundColor:"red"
//             }}
//           >
//             <TouchableOpacity
//               style={
//                 upcomingOrder
//                   ? {
//                       backgroundColor: "rgb(105,174,94)",
//                       width: "50%",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: 35,
//                       borderTopLeftRadius: 20,
//                       borderBottomLeftRadius: 20,
//                     }
//                   : {
//                       backgroundColor: "transparent",
//                       width: "50%",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: 35,
//                       borderTopLeftRadius: 20,
//                       borderBottomLeftRadius: 20,
//                       borderWidth: 1,
//                       borderColor: "rgb(105,174,94)",
//                     }
//               }
//               onPress={() => setUpcomingOrder(!upcomingOrder)}
//             >
//               <Text
//                 style={
//                   upcomingOrder
//                     ? { color: "white", fontWeight: "500" }
//                     : { color: "rgb(105,174,94)", fontWeight: "500" }
//                 }
//               >
//                 Upcoming
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={
//                 upcomingOrder
//                   ? {
//                       backgroundColor: "white",
//                       width: "50%",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: 35,
//                       borderTopRightRadius: 20,
//                       borderBottomRightRadius: 20,
//                       borderWidth: 1,
//                       borderColor: "rgb(105,174,94)",
//                     }
//                   : {
//                       backgroundColor: "rgb(105,174,94)",
//                       width: "50%",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: 35,
//                       borderTopRightRadius: 20,
//                       borderBottomRightRadius: 20,
//                     }
//               }
//               onPress={() => setUpcomingOrder(!upcomingOrder)}
//             >
//               <Text
//                 style={
//                   upcomingOrder
//                     ? { color: "rgb(105,174,94)", fontWeight: "500" }
//                     : { color: "white", fontWeight: "500" }
//                 }
//               >
//                 Previous
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView>
//             {/* upcoming order */}
//             {upcomingOrder ? (
//               <View
//                 style={{
//                   gap: 10,
//                   paddingHorizontal: 15,
//                   minHeight: "100%",
//                   paddingTop: 10,
//                   marginBottom: 100,
//                 }}
//               >

//                 {ordersdata &&
//                   ordersdata.map((item) => {
//                     // console.log("itemsss",item?.orderstatus)
//                     if(item?.orderstatus?.toLowerCase() == 'delivered') {
//                       return
//                     }else{
//                       checkUpcomingProductOrNot = checkUpcomingProductOrNot + 1;
//                     }
//                     return(
//                     <View
//                       style={{
//                         flexDirection: "column",
//                         width: "100%",
//                         //   paddingHorizontal: 10,
//                         backgroundColor: "#FFFFFF",
//                         borderRadius: 10,
//                         paddingVertical: 10,
//                         shadowColor: "#818181",
//                         elevation: 3,
//                         height: "auto",
//                         borderWidth: 1,
//                         borderColor: "rgb(233,233,233)",
//                       }}
//                       key={item?.orderid}
//                     >
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           paddingVertical: 5,
//                           paddingHorizontal: 20,
//                         }}
//                       >
//                         <View>
//                           <Text style={{ fontWeight: 500 }}>
//                             Order Id :{" "}
//                             <Text style={{ color: "rgb(105,174,94)" }}>
//                               {item?.orderid}
//                             </Text>
//                           </Text>
//                         </View>
//                         <View>
//                           <Text style={{ fontWeight: "500" }}>
//                             Date :{" "}
//                             <Text style={{ color: "black" }}>
//                               {item?.dateoforder}
//                             </Text>
//                           </Text>
//                         </View>
//                       </View>
//                       <View style={{ paddingHorizontal: 15 }}>
//                         <Text
//                           style={{
//                             width: "100%",
//                             height: 1,
//                             backgroundColor: "rgb(233,233,233)",
//                           }}
//                         ></Text>
//                       </View>
//                       <View
//                         style={{
//                           justifyContent: "space-between",
//                           flexDirection: "row",
//                           alignItems: "center",
//                           paddingVertical: 10,
//                           paddingHorizontal: 20,
//                         }}
//                       >
//                         <View>
//                           <Image
//                             source={{
//                               uri: `${imageUrl}${item?.orderitems[0]?.imagename[0]?.name}`,
//                             }}
//                             style={{
//                               width: 70,
//                               height: 70,
//                               //   backgroundColor: "red",
//                               borderRadius: 10,
//                             }}
//                           />
//                         </View>
//                         <View style={{ width: 200, height: 40 }}>
//                           <Text style={{ fontWeight: "500", color: "black" }}>
//                             {item?.orderitems[0]?.product_name}
//                           </Text>
//                         </View>
//                         <View>
//                           <Text
//                             style={{
//                               fontWeight: "500",
//                               color: "rgb(105,175,94)",
//                             }}
//                           >
//                             +
//                             <Text style={{ color: "rgb(105,174,94)" }}>
//                               {item?.orderitems.length - 1}
//                             </Text>
//                           </Text>
//                         </View>
//                       </View>

//                       <View
//                         style={{
//                           paddingHorizontal: 20,
//                           paddingVertical: 10,
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <TouchableOpacity
//                           style={{
//                             backgroundColor: "rgb(105,175,94)",
//                             paddingVertical: 10,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             borderRadius: 10,
//                             borderWidth: 1,
//                             borderColor: "rgb(105,175,94)",
//                             width: "100%",
//                           }}
//                           onPress={() =>
//                             navigation.navigate("Order", {
//                               item,
//                             })
//                           }
//                         >
//                           <Text
//                             style={{
//                               fontWeight: "500",
//                               fontSize: 14,
//                               color: "white",
//                             }}
//                           >
//                             Order details
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   )})}

//                 {checkUpcomingProductOrNot == 0 ? <><View style={{paddingTop:300}}><Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",color:"#D1D1D1"}}>"There is no order Processing"</Text></View></>:  ""}
//               </View>
//             ) : (
//               <View
//               style={{
//                 gap: 10,
//                 paddingHorizontal: 15,
//                 minHeight: "100%",
//                 paddingTop: 10,
//                 marginBottom: 100,
//               }}
//             >
//               {/* <ScrollView style={{backgroundColor:"red",height:"auto"}}> */}
//               {ordersdata &&
//                 ordersdata.map((item) => {
//                   if(item?.orderstatus?.toLowerCase() !== "delivered") {
//                     return
//                   }else{
//                     checkPreviousProductOrNot = checkPreviousProductOrNot + 1;
//                   }
//                   return(
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       width: "100%",
//                       //   paddingHorizontal: 10,
//                       backgroundColor: "#FFFFFF",
//                       borderRadius: 10,
//                       paddingVertical: 10,
//                       shadowColor: "#818181",
//                       elevation: 3,
//                       height: "auto",
//                       borderWidth: 1,
//                       borderColor: "rgb(233,233,233)",
//                     }}
//                     key={item?.orderid}
//                   >
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         paddingVertical: 5,
//                         paddingHorizontal: 20,
//                       }}
//                     >
//                       <View>
//                         <Text style={{ fontWeight: 500 }}>
//                           Order Id :{" "}
//                           <Text style={{ color: "rgb(105,174,94)" }}>
//                             {item?.orderid}
//                           </Text>
//                         </Text>
//                       </View>
//                       <View>
//                         <Text style={{ fontWeight: "500" }}>
//                           Date :{" "}
//                           <Text style={{ color: "black" }}>
//                             {item?.dateoforder}
//                           </Text>
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={{ paddingHorizontal: 15 }}>
//                       <Text
//                         style={{
//                           width: "100%",
//                           height: 1,
//                           backgroundColor: "rgb(233,233,233)",
//                         }}
//                       ></Text>
//                     </View>
//                     <View
//                       style={{
//                         justifyContent: "space-between",
//                         flexDirection: "row",
//                         alignItems: "center",
//                         paddingVertical: 10,
//                         paddingHorizontal: 20,
//                       }}
//                     >
//                       <View>
//                         <Image
//                           source={{
//                             uri: `${imageUrl}${item?.orderitems[0]?.imagename[0]?.name}`,
//                           }}
//                           style={{
//                             width: 70,
//                             height: 70,
//                           }}
//                         />
//                       </View>
//                       <View style={{ width: 200, height: 40 }}>
//                         <Text style={{ fontWeight: "500", color: "black" }}>
//                           {item?.orderitems[0]?.product_name}
//                         </Text>
//                       </View>
//                       <View>
//                         <Text
//                           style={{
//                             fontWeight: "500",
//                             color: "rgb(105,175,94)",
//                           }}
//                         >
//                           +
//                           <Text style={{ color: "rgb(105,174,94)" }}>
//                             {item?.orderitems.length - 1}
//                           </Text>
//                         </Text>
//                       </View>
//                     </View>

//                     <View
//                       style={{
//                         paddingHorizontal: 20,
//                         paddingVertical: 10,
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <TouchableOpacity
//                         style={{
//                           backgroundColor: "rgb(105,175,94)",
//                           paddingVertical: 10,
//                           justifyContent: "center",
//                           alignItems: "center",
//                           borderRadius: 10,
//                           borderWidth: 1,
//                           borderColor: "rgb(105,175,94)",
//                           width: "100%",
//                         }}
//                         onPress={() =>
//                           navigation.navigate("Order", {
//                             item,
//                           })
//                         }
//                       >
//                         <Text
//                           style={{
//                             fontWeight: "500",
//                             fontSize: 14,
//                             color: "white",
//                           }}
//                         >
//                           Order details
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 )})}
//               {/* </ScrollView> */}
//               {checkPreviousProductOrNot == 0 ? <View style={{paddingTop:300}}><Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",color:"rgb(105,175,94)"}}>"There is no previos products"</Text></View> : ""}
//             </View>
//             )}
//           </ScrollView>
//         </>
//       )}
//     </View>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { loadOrders } from "./supabaseClient";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { imageUrl } from "../../lib/constant";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

// Get device dimensions
const { width, height } = Dimensions.get("window");

// Helper Component for Order Card
const OrderCard = ({ item, onPress }: any) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderIdText}>
        Order Id: <Text style={styles.orderId}>{item?.orderid}</Text>
      </Text>
      <Text style={styles.orderDateText}>
        Date: <Text style={styles.orderDate}>{item?.dateoforder}</Text>
      </Text>
    </View>
    <View style={styles.separator} />
    <View style={styles.orderDetails}>
      <Image
        source={{
          uri: `${imageUrl}${item?.orderitems[0]?.imagename[0]?.name}`,
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>
          {item?.orderitems[0]?.product_name}
        </Text>
      </View>
      <Text style={styles.productCount}>
        +
        <Text style={styles.additionalCount}>
          {item?.orderitems.length - 1}
        </Text>
      </Text>
    </View>
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
   
        <FontAwesome
          name="info-circle"
          size={20}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Order Details</Text>
     
    </TouchableOpacity>
  </View>
);

// Main Orders Component
const Orders = () => {
  const focus = useIsFocused();
  const [upcomingOrder, setUpcomingOrder] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const navigation = useNavigation();

  

  useEffect(() => {
    const getOrders = async () => {
      const orders = await loadOrders();
      setOrdersData(orders);
    };
    getOrders();
  }, [focus]);

  const renderOrderCards = (statusCheck: any) => {
    
    const processingState = (statusCheck == "processing" ? ["pending","confirmed","out for delivery"] : []);

    const filteredOrders = ordersData.filter(
      (item) => {
        return statusCheck == "processing" ? processingState.includes(item?.orderstatus?.toLowerCase()) : item?.orderstatus?.toLowerCase() == "delivered"
      }
    )
    

    return filteredOrders.length === 0 ? (
      <View style={styles.noOrdersContainer}>
        <Text style={styles.noOrdersText}>
          {statusCheck === "delivered"
            ? "There are no previous products"
            : "There is no order processing"}
        </Text>
      </View>
    ) : (
      filteredOrders.map((item) => (
        <OrderCard
          key={item?.orderid}
          item={item}
          onPress={() => navigation.navigate("Order", { item })}
        />
      ))
    );
  };

  return (
    <View style={styles.container}>
      {ordersData.length === 0 ? (
        <View style={styles.emptyOrdersContainer}>
          <Text style={styles.emptyOrdersText}>
            You have not ordered anything yet
          </Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, upcomingOrder && styles.activeTab]}
              onPress={() => setUpcomingOrder(true)}
              activeOpacity={0.7} // Change opacity when button is pressed
            >
              <Text
                style={[styles.tabText, upcomingOrder && styles.activeTabText]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, !upcomingOrder && styles.activeTab]}
              onPress={() => setUpcomingOrder(false)}
            >
              <Text
                style={[styles.tabText, !upcomingOrder && styles.activeTabText]}
              >
                Previous
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {upcomingOrder
              ? renderOrderCards("processing")
              : renderOrderCards("delivered")}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  emptyOrdersText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#969696",
    textAlign: "center",
  },
  shopNowButton: {
    backgroundColor: "rgb(105,174,94)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  shopNowButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal:10,
    gap:5
  },
  tabButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 20,
    borderWidth: 0.1,
    borderColor: "#000",
  },
  activeTab: {
    backgroundColor: "rgb(105,174,94)",
    borderColor:"rgb(105,175,94)"
  },
  tabText: {
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingVertical: 10,
  },
  orderCard: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#818181",
    elevation: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgb(233,233,233)",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  orderIdText: {
    fontWeight: "500",
  },
  orderId: {
    color: "rgb(105,174,94)",
  },
  orderDateText: {
    fontWeight: "500",
  },
  orderDate: {
    color: "black",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "rgb(233,233,233)",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  productInfo: {
    width: width * 0.55, // Responsive width
  },
  productName: {
    fontWeight: "500",
    color: "black",
  },
  productCount: {
    fontWeight: "500",
    color: "rgb(105,175,94)",
  },
  additionalCount: {
    color: "rgb(105,174,94)",
  },
  detailsButton: {
    backgroundColor: "rgb(105,175,94)",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(105,175,94)",
    width: "100%",
  },
  detailsButtonText: {
    fontWeight: "500",
    fontSize: 14,
    color: "white",
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 300,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#D1D1D1",
  },
  buttonContainer: {
    margin: 10, // Space around the button
    borderRadius: 10, // Rounded corners for the button
    overflow: "hidden",
    backgroundColor:"rgb(105,175,94)",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:7 // Ensures the gradient background stays within the button's bounds
  },
  gradientBackground: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally
    padding: 10, // Add padding inside the gradient background
    borderRadius: 5, // Match border radius with the button container
  },
  icon: {
    marginRight: 10, // Space between the icon and text
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Make the text bold
  },
});

export default Orders;
