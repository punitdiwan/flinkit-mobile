import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MinusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PlusIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CategoryData } from "./Category";
import { useMyContext } from "../context/Context";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type cardItemsProps = {
  item: {
    id: string;
    quantity: number;
  };
};
const CartItemCard = ({ item }: cardItemsProps) => {
  const items: any = CategoryData.find((i) => i.id === item.id);
  const {
    getItemQuintity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromcart,
  } = useMyContext();
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
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          // borderWidth: 1,
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
            // borderColor: "black",
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
          position: "relative",
        }}
      >
        <Text style={{ fontSize: 20 }}>{items?.name}</Text>
        <Text
          style={{
            color: "green",
            fontSize: 20,
            position: "absolute",
            right: 5,
            bottom: 10,
          }}
        >
          ₹{items?.price}
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 0, top: 0 }}
          onPress={() => removeFromcart(item?.id)}
        >
          <Entypo name="cross" size={20} color="#B3B3B3" />
        </TouchableOpacity>

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
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => decreaseCardQuantity(items?.id)}
              style={{
                width: 46,
                height: 46,
                borderWidth: 2,
                borderColor: "#F0F0F0",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontWeight: "500" }}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => increaseCardQuantity(items?.id)}
              style={{
                width: 46,
                height: 46,
                borderWidth: 2,
                borderColor: "#F0F0F0",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="plus" size={24} color="#69AF5D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({});
