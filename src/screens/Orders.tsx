import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { loadOrders } from "./supabaseClient";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { imageUrl } from "../../lib/constant";

// order history page

const Orders = () => {
  const focus = useIsFocused();

  const [upcomingOrder, setUpcomingOrder] = useState(true);
  const [ordersdata, setOrdersData] = useState([]);

  let checkUpcomingProductOrNot = 0;
  let checkPreviousProductOrNot = 0;


  //   navigation
  const navigation = useNavigation();

  // calling useEffect to load Order related to user
  const gettingOrdersRelatedToUser = async () => {
    const orders = await loadOrders();
    const date = Date(orders[0]?.created_at);
    setOrdersData(orders);
  };

  
  useEffect(() => {
    gettingOrdersRelatedToUser();
  }, [focus]);

  return (
    <View
      style={{
        width: "100%",
        minHeight: "100%",
        // backgroundColor: "rgb(238,238,238)",
        backgroundColor: "#FFFFFF",
      }}
    >
      {ordersdata?.length == 0 ? (
        <View>
          <View
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "semibold",
                color: "#969696",
                textAlign: "center",
              }}
            >
              " You not orders anything yet "
            </Text>
            <View style={{ width: "100%", position: "absolute", bottom: 100 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(105,174,94)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate("SearchScreen")}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                 
                >
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 10,
              // gap: 5,
              paddingHorizontal: 10,
              height: "auto",
              //   backgroundColor:"red"
            }}
          >
            <TouchableOpacity
              style={
                upcomingOrder
                  ? {
                      backgroundColor: "rgb(105,174,94)",
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                    }
                  : {
                      backgroundColor: "transparent",
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderWidth: 1,
                      borderColor: "rgb(105,174,94)",
                    }
              }
              onPress={() => setUpcomingOrder(!upcomingOrder)}
            >
              <Text
                style={
                  upcomingOrder
                    ? { color: "white", fontWeight: "500" }
                    : { color: "rgb(105,174,94)", fontWeight: "500" }
                }
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                upcomingOrder
                  ? {
                      backgroundColor: "white",
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      borderWidth: 1,
                      borderColor: "rgb(105,174,94)",
                    }
                  : {
                      backgroundColor: "rgb(105,174,94)",
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    }
              }
              onPress={() => setUpcomingOrder(!upcomingOrder)}
            >
              <Text
                style={
                  upcomingOrder
                    ? { color: "rgb(105,174,94)", fontWeight: "500" }
                    : { color: "white", fontWeight: "500" }
                }
              >
                Previous
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* upcoming order */}
            {upcomingOrder ? (
              <View
                style={{
                  gap: 10,
                  paddingHorizontal: 15,
                  minHeight: "100%",
                  paddingTop: 10,
                  marginBottom: 100,
                }}
              >

                {ordersdata &&
                  ordersdata.map((item) => {
                    // console.log("itemsss",item?.orderstatus)
                    if(item?.orderstatus?.toLowerCase() == 'delivered') {
                      return 
                    }else{
                      checkUpcomingProductOrNot = checkUpcomingProductOrNot + 1;
                    }
                    return(
                    <View
                      style={{
                        flexDirection: "column",
                        width: "100%",
                        //   paddingHorizontal: 10,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        paddingVertical: 10,
                        shadowColor: "#818181",
                        elevation: 3,
                        height: "auto",
                        borderWidth: 1,
                        borderColor: "rgb(233,233,233)",
                      }}
                      key={item?.orderid}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 5,
                          paddingHorizontal: 20,
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: 500 }}>
                            Order Id :{" "}
                            <Text style={{ color: "rgb(105,174,94)" }}>
                              {item?.orderid}
                            </Text>
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontWeight: "500" }}>
                            Date :{" "}
                            <Text style={{ color: "black" }}>
                              {item?.dateoforder}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View style={{ paddingHorizontal: 15 }}>
                        <Text
                          style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "rgb(233,233,233)",
                          }}
                        ></Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: `${imageUrl}${item?.orderitems[0]?.imagename[0]?.name}`,
                            }}
                            style={{
                              width: 70,
                              height: 70,
                              //   backgroundColor: "red",
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View style={{ width: 200, height: 40 }}>
                          <Text style={{ fontWeight: "500", color: "black" }}>
                            {item?.orderitems[0]?.product_name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontWeight: "500",
                              color: "rgb(105,175,94)",
                            }}
                          >
                            +
                            <Text style={{ color: "rgb(105,174,94)" }}>
                              {item?.orderitems.length - 1}
                            </Text>
                          </Text>
                        </View>
                      </View>

                      {/* { more &&
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                          }}
                        >
                          <View>
                            <Image
                              source={{
                                uri: item?.orderitems[0]?.product_imagename,
                              }}
                              style={{
                                width: 70,
                                height: 70,
                                //   backgroundColor: "red",
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={{ width: 200, height: 40 }}>
                            <Text style={{ fontWeight: "500", color: "black" }}>
                              {item?.orderitems[0]?.product_name}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "rgb(105,175,94)",
                              }}
                            >
                              +
                              <Text style={{ color: "rgb(105,174,94)" }}>
                                {item?.orderitems.length - 1}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      } */}

                      <View
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "rgb(105,175,94)",
                            paddingVertical: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "rgb(105,175,94)",
                            width: "100%",
                          }}
                          onPress={() =>
                            navigation.navigate("Order", {
                              item,
                            })
                          }
                        >
                          <Text
                            style={{
                              fontWeight: "500",
                              fontSize: 14,
                              color: "white",
                            }}
                          >
                            Order details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )})}
                
                {checkUpcomingProductOrNot == 0 ? <><View style={{paddingTop:300}}><Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",color:"#D1D1D1"}}>"There is no order Processing"</Text></View></>:  ""}
              </View>
            ) : (
              <View
              style={{
                gap: 10,
                paddingHorizontal: 15,
                minHeight: "100%",
                paddingTop: 10,
                marginBottom: 100,
              }}
            >
              {/* <ScrollView style={{backgroundColor:"red",height:"auto"}}> */}
              {ordersdata &&
                ordersdata.map((item) => {
                  if(item?.orderstatus?.toLowerCase() !== "delivered") {
                    return 
                  }else{
                    checkPreviousProductOrNot = checkPreviousProductOrNot + 1;
                  }
                  return(
                  <View
                    style={{
                      flexDirection: "column",
                      width: "100%",
                      //   paddingHorizontal: 10,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 10,
                      paddingVertical: 10,
                      shadowColor: "#818181",
                      elevation: 3,
                      height: "auto",
                      borderWidth: 1,
                      borderColor: "rgb(233,233,233)",
                    }}
                    key={item?.orderid}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: 500 }}>
                          Order Id :{" "}
                          <Text style={{ color: "rgb(105,174,94)" }}>
                            {item?.orderid}
                          </Text>
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontWeight: "500" }}>
                          Date :{" "}
                          <Text style={{ color: "black" }}>
                            {item?.dateoforder}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                      <Text
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor: "rgb(233,233,233)",
                        }}
                      ></Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                      }}
                    >
                      <View>
                        <Image
                          source={{
                            uri: item?.orderitems[0]?.product_imagename,
                          }}
                          style={{
                            width: 70,
                            height: 70,
                            //   backgroundColor: "red",
                            borderRadius: 10,
                          }}
                        />
                      </View>
                      <View style={{ width: 200, height: 40 }}>
                        <Text style={{ fontWeight: "500", color: "black" }}>
                          {item?.orderitems[0]?.product_name}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: "500",
                            color: "rgb(105,175,94)",
                          }}
                        >
                          +
                          <Text style={{ color: "rgb(105,174,94)" }}>
                            {item?.orderitems.length - 1}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    {/* { more &&
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: item?.orderitems[0]?.product_imagename,
                            }}
                            style={{
                              width: 70,
                              height: 70,
                              //   backgroundColor: "red",
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View style={{ width: 200, height: 40 }}>
                          <Text style={{ fontWeight: "500", color: "black" }}>
                            {item?.orderitems[0]?.product_name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontWeight: "500",
                              color: "rgb(105,175,94)",
                            }}
                          >
                            +
                            <Text style={{ color: "rgb(105,174,94)" }}>
                              {item?.orderitems.length - 1}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    } */}

                    <View
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgb(105,175,94)",
                          paddingVertical: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "rgb(105,175,94)",
                          width: "100%",
                        }}
                        onPress={() =>
                          navigation.navigate("Order", {
                            item,
                          })
                        }
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            fontSize: 14,
                            color: "white",
                          }}
                        >
                          Order details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )})}
              {/* </ScrollView> */}
              {checkPreviousProductOrNot == 0 ? <View style={{paddingTop:300}}><Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",color:"rgb(105,175,94)"}}>"There is no previos products"</Text></View> : ""}
            </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Orders;