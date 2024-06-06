import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
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
    product_imagename: string;
    product_name: string;
    products: any;
  };
};

const SearchCard = ({ item }: any) => {
  const navigation = useNavigation<any>();

  // const [quantity,setQuantity] =useState<number>(0);
  const [products, setProducts] = useState(item);

  const {
    getItemQuintity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromcart,
  } = useMyContext();

  useEffect(() => {
    console.log("products", products);
  }, [products]);
  const quantity = getItemQuintity(item.id);
  return (
    <>
      {products.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.body}
            onPress={() =>
              navigation.navigate("Product_Details", {
                name: item.name,
                imgUrl: item.imgUrl,
                id: item.id,
              })
            }
          >
            <View>
              <Image
                style={{ width: "100%", height: 110 }}
                resizeMode="contain"
                source={{ uri: item.product_imagename }}
              />
              <Text
                style={{
                  margin: 10,
                  fontSize: 15,
                  color: "#6b6e6a",
                  fontWeight: "600",
                }}
              >
                {item.product_name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  {/* <Text
                    style={{
                      textDecorationLine: "line-through",
                      fontSize: 15,
                      color: "#6b6e6a",
                      fontWeight: "600",
                    }}
                  >
                    ₹
                  </Text> */}
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#000000",
                      fontWeight: "600",
                    }}
                  >
                    ₹ {item.price}
                  </Text>
                </View>
                {quantity === 0 ? (
                  <>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: "#b5e8ae",
                          borderRadius: 5,
                          borderColor: "green",
                          borderWidth: 1,
                          width: "80%",
                        }}
                        onPress={() => increaseCardQuantity(item.id)}
                      >
                        <Text style={{ color: "green", textAlign: "center" }}>
                          ADD
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "green",
                          borderRadius: 5,
                          borderColor: "green",
                          borderWidth: 1,
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                          width: "80%",
                          justifyContent: "space-between",
                          paddingHorizontal: 10,
                          // paddingVertical:10
                        }}
                      >
                        <Text
                          onPress={() => decreaseCardQuantity(item.id)}
                          style={{
                            fontSize: 30,
                            fontWeight: "500",
                            color: "#ffffff",
                            height: "100%",
                          }}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "#ffffff",
                          }}
                        >
                          {quantity}
                        </Text>
                        <Text
                          onPress={() => increaseCardQuantity(item.id)}
                          style={{
                            fontSize: 30,
                            fontWeight: "500",
                            color: "#ffffff",
                            height: "100%",
                          }}
                        >
                          +
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  body: {
    width: "45%",
    height: "auto",
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
