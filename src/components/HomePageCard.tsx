import * as React from "react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addFavouriteItem, addToCart, deleteParticularItemInCart, loadCartData } from "../screens/supabaseClient";
import { useDispatch } from "react-redux";
import { addItemInCart, clearCartList } from "../../redux/slices/cartSlice";

const HomePageCard = ({ name, data,cartItem }: any) => {
  const dispatch = useDispatch();
  const imgUrl =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png";

    const callAddToCart = async() => {
       addToCart(3,"orange",50)
       await dispatch(clearCartList());
       const response = await loadCartData();
       await dispatch(addItemInCart(response))
    }

   
    

  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            width: "60%",
            color: "#181725",
            fontSize: 22,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            width: "auto",
            color: "#69AF5D",
            fontSize: 15,
            fontFamily: "Gilroy-Bold",
          }}
        >
          See all
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        {data?.map(
          (
            item: {
              imgUrl: any;
              name:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              price:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            },
            index: Key | null | undefined
          ) => (
            <TouchableOpacity
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                backgroundColor: "white",

                width: "5%",
                padding: 20,
                height: "100%",
                // borderWidth: 2,
                borderRadius: 15,
                borderColor: "#E2E2E2",
                marginHorizontal: 5,
              }}
              onPress={() => navigation.navigate("Productdetail", { id: 1 })}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item?.imgUrl }}
                  style={{ width: "100%", height: "auto", aspectRatio: 1 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "semibold",
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  {item?.name}
                </Text>
                <Text style={{ color: "#7C7C7C" }}>7ps Price</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "#181725",
                    fontFamily: "Gilroy-Bold",
                    fontSize: 18,
                  }}
                >
                  ₹ {item?.price}
                </Text>
                <TouchableOpacity
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#69AF5D",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      color: "white",
                    }}
                    onPress={callAddToCart}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default HomePageCard;

const styles = StyleSheet.create({});
