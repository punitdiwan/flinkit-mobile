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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addFavouriteItem, addToCart, getAllTopRatedProducts, loadCartData } from "../screens/supabaseClient";
import { useMyContext } from "../context/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";


const HomePageCard = ({ name, data }: any) => {
  console.log("data",data);
  const [count,setCount] = React.useState(0);
  
  const imgUrl =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png";


  const {cartItem,addingItemInCart,increaseCartQuantity,decreaseCartQuantity} = useMyContext();

  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{}}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginVertical: 5,
            backgroundColor: "rgb(255,255,255)"
          }}
        >
          <Text
            style={{
              width: "60%",
              color: "#181725",
              fontSize: 22,
              // fontFamily: "Gilroy-Bold",
              fontWeight:"bold"
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              width: "auto",
              color: "#69AF5D",
              fontSize: 15,
              // fontFamily: "Gilroy-Bold",
              fontWeight:"bold"
            }}
            onPress={() => navigation.navigate("TopRated")}
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
            // marginBottom:20,
            backgroundColor: "rgb(255,255,255)",
            gap:10
          }}
        >
          {/* {data?.map(
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
                borderColor:"rgb(233,233,233)",
                borderWidth:1,
                width: 180,
                padding: 20,
                height: "100%",
                // borderWidth: 2,
                borderRadius: 15,
                marginHorizontal: 5,
              }}
              onPress={() => navigation.navigate("Productdetail", { id: item?.product_id })}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor:"rgb(233,233,233)",
                }}
              >
                <Image
                  source={{ uri: item?.product_imagename}}
                  style={{ width: "100%", height: "auto", aspectRatio: 1 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "semibold",
                    // fontFamily: "Gilroy-Medium",
                  }}
                >
                  {item?.product_brand}
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
                    // fontFamily: "Gilroy-Bold",
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
        )} */}

          {data?.length > 0 ? data.map(item =>
            <View key={item?.product_id} style={{ backgroundColor: "white", width: 185, marginVertical: 3, paddingVertical: 30, paddingHorizontal: 10, borderRadius: 20, height: 270, borderColor: "rgb(233,233,233)", borderWidth: 1 }}>
              <TouchableOpacity onPress={() =>
                navigation.navigate("Productdetail", {
                  id: item?.product_id,
                })
              }>
                <View>
                  <Image style={{ width: "100%", height: 110 }} resizeMode="contain" source={{ uri: item?.product_imagename }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>{item?.product_name}</Text>
                  <Text style={{ paddingTop: 5, color: "rgb(205,205,205)", fontWeight: "bold" }}>325ml,Price</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, alignItems: "center" }}>

                  <View>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "rgb(38,37,50)" }}>₹{item?.price}</Text>
                  </View>

                  {cartItem.filter(itemm => itemm?.product_id == item?.product_id).length > 0 ? <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 2 }}>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}
                      onPress={() => decreaseCartQuantity(item?.product_id)}
                    >
                      <Text style={{ color: "#bab7b6" }}>
                        <Entypo name="minus" size={20} />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      // backgroundColor:"red",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }}>
                      <Text style={{ fontSize: 20 }}>
                        {cartItem.filter(itemm => itemm?.product_id == item?.product_id)?.[0]?.qty}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // borderWidth:1,
                      borderColor: "#bab7b6",
                      borderRadius: 5
                    }} onPress={() => increaseCartQuantity(item?.product_id)}>
                      <Entypo name='plus' style={{ fontSize: 20, color: "#69AF5D" }} />
                    </TouchableOpacity>
                  </View> : <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgb(105,175,93)",
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "white",
                        // backgroundColor:"red",
                        // backgroundColor:""

                      }}
                      onPress={() => addingItemInCart(item)}
                    >
                      +
                    </Text>
                  </TouchableOpacity>

                  }

                </View>
              </TouchableOpacity>
            </View>
          ): <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width:"100%"
          }}><ActivityIndicator size={"large"} color={"rgb(105,175,94)"}/></View>}


        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



export default HomePageCard;

const styles = StyleSheet.create({});
