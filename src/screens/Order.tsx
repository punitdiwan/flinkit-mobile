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
  Linking,
} from "react-native";
import {
  getAllOrderItems,
  getDriverDetails,
  loadOrders,
} from "./supabaseClient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";

import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import { imageUrl } from "../../lib/constant";

// Order details page

const Order = (orderdetails: any) => {
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const totalOrder = orderDetailsData[0]?.orderitems?.length;
  // console.log("totalOrder",totalOrder);

  // extract data from route
  const orderDetails = orderdetails?.route?.params?.item;
  console.log("orderdetails", orderDetails?.assigndriverid);
  // console.log("orderdetails:", orderDetails?.orderstatus == "Out Of delivery");

  // setOrderDetailsData(orderDetails)

  const fillAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [showMore, setShowMore] = useState(false);
  const [order, setOrder] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [firstProductName, setFirstProductName] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [driverId, setDriverId] = useState("");
  const [driverDetails, setDriverDetails] = useState([]);
  console.log(`driverImage ${imageUrl}${driverDetails[0]?.profileimg}`);

  console.log("percentage", percentage);

  const handlePercentage = (orderStatus) => {
    console.log("handle Percenatege", orderStatus);

    if (orderStatus?.toLowerCase() == "pending") {
      setPercentage(25);
    } else if (orderStatus?.toLowerCase() == "confirmed") {
      setPercentage(50);
    } else if (orderStatus?.toLowerCase() == "out for delivery") {
      setPercentage(75);
    } else if (orderStatus?.toLowerCase() == "delivered") {
      setPercentage(100);
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
    setOrderDetailsData([orderDetails]);
    setDriverId(orderDetails?.assigndriverid);
  };

  useEffect(() => {
    loadOrdersData();
    handlePercentage(orderDetails?.orderstatus);
  }, []);

  const getDriver = async () => {
    try {
      const response = await getDriverDetails(driverId);
      setDriverDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("calling driver details");
    getDriver();
  }, [driverId]);

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
                {orderDetails?.orderstatus == "pending"
                  ? "Packing your order..."
                  : orderDetails?.orderstatus}
              </Text>
              <View style={{ paddingTop: 5 }}>
                {orderDetails?.orderstatus !== "Delivered" && (
                  <Text style={{ fontWeight: "semibold" }}>
                    Arriving <Text style={styles.boldText}>10:15</Text>
                  </Text>
                )}

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
                  {orderDetails?.orderstatus !== "Delivered" ? (
                    <Text>
                      Estimated arrival by{" "}
                      <Text style={styles.boldText}>10:15</Text>
                    </Text>
                  ) : (
                    <Text>
                      Arrived at <Text style={styles.boldText}>10:00</Text>
                    </Text>
                  )}
                  {/* Additional content */}
                </View>

                {orderDetails?.orderstatus !== "Out for delivery" && (
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 50,
                    }}
                  >
                    {
                      <Image
                        source={require("../../assets/orderbackground.png")}
                      />
                    }
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
                )}

                {orderDetails?.orderstatus == "Out for delivery" && (
                  <View style={{ marginVertical: 15 }}>
                    <MapView
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      style={{ width: "100%", height: 350 }}
                    />
                  </View>
                )}

                {orderDetails?.orderstatus == "Out for delivery" &&
                  driverDetails && (
                    <View
                      style={{
                        justifyContent: "center",
                        gap: 10,
                        marginVertical: 10,
                        paddingHorizontal: 7,
                        paddingVertical: 10,
                        borderRadius: 5,
                        shadowColor: "#E3E3E3", // Change this to adjust shadow color
                        shadowOffset: { width: 0, height: 2 }, // Change shadow offset as needed
                        shadowOpacity: 0.8, // Change opacity (0-1)
                        shadowRadius: 2, // Change radius
                        elevation: 3,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <View style={{backgroundColor:"#f0f0f0",borderRadius:100,elevation:4}}>
                          <Image
                            source={{
                              uri: `${imageUrl}${driverDetails[0]?.profileimg}`,
                            }}
                            width={100}
                            height={100}
                            borderRadius={100}
                          />
                          <View
                            style={{
                              backgroundColor: "rgb(105,175,94)",
                              borderRadius: 100,
                              justifyContent: "center",
                              alignItems: "center",
                              // paddingVertical: 1,
                              position: "absolute",
                              bottom: 0,
                              width: 70,
                              marginLeft: 17,
                              elevation:4
                            }}
                          >
                            <Text style={{ color: "rgb(255,229,0)",fontWeight:"bold"}}>
                              {" "}
                              4.5 <Entypo name="star" />
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          {/* <Feather name="user-check" size={20} /> */}
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "rgb(105,175,94)",
                              fontSize: 15,
                            }}
                          >
                            {`Mr.${driverDetails[0]?.driverfirst_name} ${driverDetails[0]?.driverlast_name}`}
                          </Text>
                        </View>

                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(
                                `tel:${"+91" + driverDetails?.contact}`
                              )
                            }
                            style={{
                              backgroundColor: "rgb(105,175,94)",
                              width: 50,
                              height: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 100,
                              elevation:5
                            }}
                          >
                            <Feather name="phone" size={20} color={"#fff"} style={{elevation:5}}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}

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
                      Order Number :{" "}
                      <Text style={{ color: "rgb(105,195,74)" }}>
                        {orderDetailsData[0]?.orderid}
                      </Text>
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
                        {orderDetailsData[0]?.orderitems[0]?.product_name}
                      </Text>
                      {orderDetailsData[0]?.orderitems?.length > 1 && (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                          }}
                          onPress={() => setShowMore(!showMore)}
                        >
                          {showMore ? (
                            ""
                          ) : (
                            <>
                              <Text
                                style={{
                                  fontWeight: "semibold",
                                  fontSize: 13,
                                  color: "rgb(105,175,94)",
                                }}
                              >
                                Show more
                              </Text>
                              <Image
                                source={require("../../assets/arrowbottom.png")}
                              />
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  {order &&
                    showMore &&
                    orderDetailsData[0]?.orderitems?.map((item, index) => {
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
                            {showMore && index == totalOrder - 1 && (
                              <TouchableOpacity
                                onPress={() => setShowMore(!showMore)}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "semibold",
                                    fontSize: 13,
                                    color: "rgb(105,175,94)",
                                  }}
                                >
                                  Show less
                                </Text>
                                <Image
                                  source={require("../../assets/arrowbottom.png")}
                                />
                              </TouchableOpacity>
                            )}
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
                    <Text style={{ color: "rgb(105,175,94)" }}>
                      ₹{orderDetailsData[0]?.totalamt}
                    </Text>
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
                    style={{ fontWeight: "bold", color: "white", fontSize: 14 }}
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

// <View>
{
  /* <View>
  <Image
    source={require("../../assets/driverscooter.png")}
  />
</View> */
}
// </View>

{
  /* <View> */
}
{
  /* <Image source={require("../../assets/driverscooter.png")} /> */
}

{
  /* <Text
  style={{
    fontWeight: 500,
    color: "rgb(105,175,94)",
  }}
>
  Drake Balakrishna
</Text>
</View>


<View>
<Text
  style={{ fontWeight: 500, color: "rgb(105,175,94)" }}
>
  Drake Balakrishna
</Text>
</View>

<View
style={{
  width: 50,
  height: 50,
  backgroundColor: "rgb(105,175,94)",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 100,
}}
>
<Feather name="phone" size={20} />
</View>

<Image
source={{
  uri: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}}
width={80}
height={80}
borderRadius={100}
/> */
}
