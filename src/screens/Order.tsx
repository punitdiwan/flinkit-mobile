import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { getAllOrderItems, loadOrders } from "./supabaseClient";
import { useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const Order = () => {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [showMore, setShowMore] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderStatus, setOrderStatus] = useState("")
  const [firstProductName,setFirstProductName] = useState("");

  console.log("orderrr",order);
  

  // useEffect(() => {
  //   animateFill();
  // }, []);

  // const animateFill = () => {
  //   Animated.timing(fillAnimation, {
  //     toValue: 1,
  //     duration: 2000, // Adjust duration as needed
  //     useNativeDriver: false, // false for backgroundColor animation
  //   }).start();
  // };

  // const interpolateColor = fillAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["rgb(217,217,217)", "rgb(105,175,94)"], // Start with transparent and end with your desired color
  // });

  // const animatedStyle = {
  //   backgroundColor: interpolateColor,
  // };
  const [percentage, setPercentage] = useState(0);
  console.log("percentage", percentage);

  const handlePercentage = (orderStatus) => {
    console.log("handle Percenatege", orderStatus);

    if (orderStatus?.toLocaleLowerCase() == "pending") {
      setPercentage(25);
    } else if (orderStatus == "Confirmed") {
      setPercentage(50);
    } else if (percentage < 75) {
      setPercentage(percentage + 25);
    } else if (percentage > 75 && percentage < 100) {
      setPercentage(percentage + 25);
    } else {
      // console.log("0", percentage);
      setPercentage(0);
    }
  };
  //  const timer = setTimeout(handlePercentage,2000);

  const width = `${percentage}%`;

  // Determine background color based on percentage
  let backgroundColor = "rgb(105,175,94)"; // Default color
  if (percentage >= 0 && percentage < 25) {
    backgroundColor = "rgb(105,175,94)";
  } else if (percentage >= 25 && percentage < 50) {
    backgroundColor = "rgb(105,175,94)";
  } else if (percentage >= 50 && percentage < 75) {
    backgroundColor = "rgb(105,175,94)";
  } else if (percentage >= 75 && percentage <= 100) {
    backgroundColor = "rgb(105,175,94)";
  }

  const loadOrdersData = async () => {
    const response = await getAllOrderItems();
    console.log("responseOrder", response);
    setOrder(response[0]);
    setOrderList(response[0]?.orderitems);
    setOrderStatus(response[0].orderstatus);
    setFirstProductName("Hello");
    handlePercentage(response[0]?.orderstatus);
  };

  useEffect(() => {
    loadOrdersData();
    //  handlePercentage(orderStatus)
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Entypo
              name="cross"
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => navigation.navigate("Help")}
            >
              <Text style={{ fontWeight: "semibold" }}>Help</Text>
            </TouchableOpacity>
          </View>
          {order === undefined ? (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                "You not order anything"
              </Text>
              <View
                style={{
                  marginTop: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: 30,
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: "rgb(105,175,94)",
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 4,
                  }}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                  >
                    Back to Home
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>
                {order?.orderstatus == "pending"
                  ? "Packing your order..."
                  : order?.orderstatus}
              </Text>
              <View style={{ paddingTop: 5 }}>
                <Text style={{ fontWeight: "semibold" }}>
                  Arriving <Text style={styles.boldText}>10:15</Text>
                </Text>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(238,238,238)",
                    height: 10,
                    justifyContent: "center",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={[styles.progressBar, { width, backgroundColor }]}
                  >
                    <View
                      style={{
                        width: 5,
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "white",
                        left: 85,
                      }}
                    ></View>
                    <View
                      style={{
                        width: 5,
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "white",
                        left: 175,
                      }}
                    ></View>
                    <View
                      style={{
                        width: 5,
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "white",
                        left: 275,
                      }}
                    ></View>
                  </View>
                </View>

                {/* <View style={styles.animationContainer}>
                <Animated.View style={[styles.box, animatedStyle]} />
                <Animated.View style={[styles.box, animatedStyle]} />
                <Animated.View style={[styles.box, animatedStyle]} />
                <Animated.View style={[styles.box, animatedStyle]} />
              </View> */}
                <View style={styles.arrivalInfo}>
                  <Text>
                    Estimated arrival by{" "}
                    <Text style={styles.boldText}>10:15</Text>
                  </Text>
                  {/* Additional content */}
                </View>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50,
                  }}
                >
                  <Image source={require("../../assets/orderbackground.png")} />
                  <Text
                    style={{
                      width: "20%",
                      backgroundColor: "#EEEEEE",
                      height: 10,
                      fontWeight: "500",
                      marginTop: 30,
                      borderRadius: 20,
                    }}
                  ></Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Delivery details
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: "rgb(124,124,124)",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Address
                  </Text>
                  <Text style={{ color: "black", fontWeight: "semibold" }}>
                    B-69,Kanya West Road,Kayne nagar,Bhopal(M.P)
                  </Text>
                  <Text
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(232,232,232)",
                      height: 1,
                      fontWeight: "500",
                      marginTop: 15,
                    }}
                  ></Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: "rgb(124,124,124)",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Type
                  </Text>
                  <Text style={{ color: "black", fontWeight: "semibold" }}>
                    Leave at door
                  </Text>
                  <Text
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(232,232,232)",
                      height: 1,
                      fontWeight: "500",
                      marginTop: 15,
                    }}
                  ></Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: "rgb(124,124,124)",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Instructions
                  </Text>
                  <Text style={{ color: "black", fontWeight: "semibold" }}>
                    Please knock to let me know it has arrive and then leave it
                    at the doorstep
                  </Text>
                  <Text
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(232,232,232)",
                      height: 1,
                      fontWeight: "500",
                      marginTop: 15,
                    }}
                  ></Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: "rgb(124,124,124)",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Service
                  </Text>
                  <Text style={{ color: "black", fontWeight: "semibold" }}>
                    Standard
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(246,246,246)",
                      height: 10,
                      fontWeight: "500",
                      marginTop: 15,
                    }}
                  ></Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    Share this delivery
                  </Text>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={{ color: "black", fontWeight: "semibold" }}>
                        Let someone follow along
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        gap: 10,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgb(238,238,238)",
                      }}
                    >
                      <Image source={require("../../assets/share.png")} />
                      <Text
                        style={{
                          color: "rgb(105,174,97)",
                          fontWeight: "semibold",
                        }}
                      >
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(246,246,246)",
                      height: 10,
                      fontWeight: "500",
                      marginTop: 15,
                    }}
                  ></Text>
                </View>

                {/* order component started */}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      Order Summary
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "rgb(105,174,95)",
                      }}
                    >
                      View Cart
                    </Text>
                  </View>
                  <View style={{ paddingTop: 15 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      Order Number : {order?.orderid}
                    </Text>
                  </View>

                  <View
                    style={{ marginTop: 25, flexDirection: "row", gap: 20 }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "rgb(238,238,238)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{"1"}</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        {firstProductName ? order?.orderitems[0]?.product_name : ""}
                      </Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                        onPress={() => setShowMore(!showMore)}
                      >
                        {showMore ? (
                          <>
                            <Text
                              style={{ fontWeight: "semibold", fontSize: 13 }}
                            >
                              Show less
                            </Text>
                            <Image
                              source={require("../../assets/arrowbottom.png")}
                            />
                          </>
                        ) : (
                          <>
                            <Text
                              style={{ fontWeight: "semibold", fontSize: 13 }}
                            >
                              Show more
                            </Text>
                            <Image
                              source={require("../../assets/arrowbottom.png")}
                            />
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  {order &&
                    showMore &&
                    orderList?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          // style={{ marginTop: 10, flexDirection: "row", gap: 20 }}
                          style={
                            index == 0
                              ? { display: "none" }
                              : { marginTop: 5, flexDirection: "row", gap: 20 }
                          }
                        >
                          <View
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: "rgb(238,238,238)",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              {index + 1}
                            </Text>
                          </View>
                          <View>
                            <Text style={{ fontWeight: "bold" }}>
                              {item?.product_name}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>

                {/* total order price */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Total
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {order?.totalamt}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: "rgb(105,175,94)",
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 4,
                  }}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
                  >
                    Back to Home
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingTop: 70, // Adjust this as needed
    paddingVertical: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  icon: {
    fontSize: 30,
    fontWeight: "300",
  },
  helpButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "rgb(238,238,238)",
    borderRadius: 5,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50, // Add padding or adjust as needed
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  animationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  arrivalInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  boldText: {
    fontWeight: "bold",
  },
  box: {
    // width: 200,
    // height: 200,
    // borderRadius: 10,
    width: "25%",
    marginRight: 5,
    borderRadius: 2,
    height: 7,
  },
  // Add more styles for other sections as needed
  progressBar: {
    height: 7,
    borderRadius: 2,
  },
});

export default Order;
