import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MinusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMyContext } from "../context/Context";

// const CategoryData = [
//   {
//     id: "1",
//     name: "Vegetables & Fruits",
//     imgUrl:
//       "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
//     bg: "#e6d29c",
//     price: 200,
//   },

//   {
//     id: "2",
//     name: "Dairy & Breakfast",
//     imgUrl:
//       "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
//     bg: "#eaedaf",
//     price: 375,
//   },
//   {
//     id: "3",
//     name: "Munchies",
//     imgUrl:
//       "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
//     bg: "#ebc5ae",
//     price: 180,
//   },
// ];

type ItemProps = { name: string; imgUrl: string; price: number };

const Cart = () => {
  const { myCart, finalPrice, totalPrice } = useMyContext();

  return (
    <ScrollView>
      <View>
        <View
          style={{
            display: "flex",
            // borderWidth: 1,
            height: "auto",
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "green", textAlign: "center" }}>
            Free delivery on all orders
          </Text>
          <Text style={{ color: "red", textAlign: "center" }}>
            Discount up to 60% on items
          </Text>
          <FlatList
            // data={CategoryData}
            data={myCart}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderColor: "lightgrey",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    width: "20%",
                    // height: "auto",

                    borderColor: "lightgrey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: 1,
                      borderColor: "black",
                    }}
                  />
                </View>
                <View
                  style={{
                    // borderWidth: 1,
                    width: "75%",
                    height: "auto",
                    borderRadius: 10,
                    borderColor: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                  <Text style={{ color: "green", fontSize: 18 }}>
                    {item.price}
                  </Text>

                  <TouchableOpacity
                    style={{
                      // backgroundColor: "#c3e3c1",

                      // padding: 5,
                      borderRadius: 8,
                      flexDirection: "row",
                      //   borderWidth: 1,
                      borderColor: "#c3e3c1",
                      width: "40%",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <MinusIcon
                        name="minus-circle"
                        color={"green"}
                        size={20}
                      />
                      <Text style={{ fontSize: 20 }}>1</Text>
                      <PlusIcon name="plus-circle" color={"green"} size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View
          style={{
            width: "100%",
            // borderWidth: 1,
            paddingHorizontal: 10,
            marginVertical: 20,
            paddingVertical: 10,
            display: "flex",
            rowGap: 10,
          }}
        >
          <Text style={{ fontSize: 22 }}>Bill Details</Text>
          <Text style={{ fontSize: 18 }}>
            Total Price:
            {myCart.reduce((total, cartItem) => {
              return total + cartItem.price;
            }, 0)}
          </Text>

          <Text style={{ fontSize: 18 }}>Discount:0</Text>
          <Text style={{ fontSize: 18 }}>Delivery Charge:0</Text>
          <Text style={{ fontSize: 18 }}>Packing Charge:0</Text>
          <View
            style={{
              width: "100%",
              // borderWidth: 1,
              backgroundColor: "royalblue",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", marginLeft: 20, fontSize: 20 }}>
              Final Price:
              {myCart.reduce((total, cartItem) => {
                return total + cartItem.price;
              }, 0)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Cart;
