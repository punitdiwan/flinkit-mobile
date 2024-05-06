import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MinusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CategoryData } from "./Category";
import { useMyContext } from "../context/Context";

type cardItemsProps = {
  item: {
    id: string;
    quantity: number;
  };
};
const CartItemCard = ({ item }: cardItemsProps) => {
  const items:any = CategoryData.find((i) => i.id === item.id);
  const{getItemQuintity,increaseCardQuantity,decreaseCardQuantity,removeFromcart}=useMyContext()
  if (item == null) {
    return null;
  }
  return (
    <View
      style={{
        // borderWidth: 1,
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
          source={{ uri: items?.imgUrl }}
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
        <Text style={{ fontSize: 20 }}>{items?.name}</Text>
        <Text style={{ color: "green", fontSize: 20 }}>₹{items?.price}</Text>

        <View
          style={{
            // backgroundColor: "#c3e3c1",

            // padding: 5,
            borderRadius: 8,
            flexDirection: "row",
            //   borderWidth: 1,
            borderColor: "#c3e3c1",
            width: "80%",
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
            <TouchableOpacity  onPress={()=>decreaseCardQuantity(items?.id)}>
              <MinusIcon name="minus-circle" color={"green"} size={35} />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontWeight:"500" }}>{item.quantity}</Text>
            <TouchableOpacity onPress={()=>increaseCardQuantity(items?.id)}>
              <PlusIcon name="plus-circle" color={"green"} size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({});
