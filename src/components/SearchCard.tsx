import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useMyContext } from "../context/Context";
import CartIcon from "react-native-vector-icons/FontAwesome6";
type Props = {
  item: {
    id: string;
    name: string;
    imgUrl: string;
    price: number;
  };
};

const SearchCard = ({ item }: Props) => {
  const navigation = useNavigation<any>();
  // const [quantity,setQuantity] =useState<number>(0);
  const { getItemQuintity, increaseCardQuantity, decreaseCardQuantity, removeFromcart } = useMyContext()
  const quantity = getItemQuintity(item.id);
  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() =>
        navigation.navigate("Product_Details", {
          name: item.name,
          imgUrl: item.imgUrl,
          id:item.id,
        })
      }
    >
      <View>
        <Image
          style={{ width: "100%", height: 110 }}
          resizeMode="contain"
          source={{ uri: item.imgUrl }}
        />
        <Text
          style={{
            margin: 10,
            fontSize: 15,
            color: "#6b6e6a",
            fontWeight: "600",
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                textDecorationLine: "line-through",
                fontSize: 15,
                color: "#6b6e6a",
                fontWeight: "600",
              }}
            >
              ₹ 500
            </Text>
            <Text style={{ fontSize: 15, color: "#000000", fontWeight: "600" }}>
              ₹ {item.price}
            </Text>
          </View>
          {quantity === 0 ? (
            <>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#b5e8ae",
                  borderRadius: 5,
                  borderColor: "green",
                  borderWidth: 1,
                }}
                onPress={() => increaseCardQuantity(item.id)}
              >
                <Text style={{ color: "green" }}>ADD</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  borderRadius: 5,
                  borderColor: "green",
                  borderWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  width: "50%",
                  justifyContent: 'center',
                  paddingHorizontal: 5 
                }}
                onPress={() => navigation.navigate("Cart")}
              >
                <CartIcon
                    name="cart-plus"
                    size={20}
                    color={"white"}
                   
                  />
                {/* <Text onPress={()=>decreaseCardQuantity(item.id)} style={{fontSize:30,fontWeight:'500',color:"#ffffff",height:'100%'}}>-</Text> */}
                {/* <Text style={{fontSize:15,fontWeight:'500',color:'#ffffff'}}>{quantity}</Text> */}
                {/* <Text onPress={()=>increaseCardQuantity(item.id)} style={{fontSize:30,fontWeight:'500',color:'#ffffff',height:'100%'}}>+</Text> */}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  body: {
    width: "45%",
    height: 250,
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
