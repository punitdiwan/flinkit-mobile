import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as React from "react";
import RupeeIcon from "react-native-vector-icons/FontAwesome6";
import { useMyContext } from "../context/Context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";


const Product_Details = ({ route }: any) => {
  const { imgUrl, id }: any = route.params;


type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Product_Details"
>;
const Product_Details = ({ navigate, route, name }: any) => {
  const id: any = route.params;
  const navigation = useNavigation<any>();

  const {
    getItemQuintity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromcart,
  } = useMyContext();"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw"
  const quantity = getItemQuintity(id);
  return (
    <View style={{ padding: 15 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{ uri: imgUrl }}
            style={{ width: "100%", height: 300 }}
            resizeMode="cover"
          />
        </View>
        <View style={{ width: "100%", height: "auto", marginVertical: 10 }}>
          <Text style={{ color: "#5c5a5a", fontSize: 25, fontWeight: "700" }}>
            Vegetables &fruits
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 12,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <RupeeIcon
              name="indian-rupee-sign"
              style={{ fontSize: 15, color: "#616362" }}
            />
            <Text
              style={{
                textDecorationLine: "line-through",
                fontSize: 15,
                color: "#616362",
              }}
            >
              150
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <RupeeIcon
              name="indian-rupee-sign"
              style={{ color: "#316e41", fontSize: 20 }}
            />
            <Text style={{ color: "#316e41", fontSize: 20, fontWeight: "400" }}>
              140
            </Text>
          </View>
          {quantity === 0 ? (
            <TouchableOpacity
              onPress={() => increaseCardQuantity(id)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: "#316e41",
                borderRadius: 25,
              }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "500" }}>ADD</Text>
            </TouchableOpacity>
          ) : (
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
                width: "30%",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                // paddingVertical:10
              }}
            >
              <Text
                onPress={() => decreaseCardQuantity(id)}
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
                style={{ fontSize: 15, fontWeight: "500", color: "#ffffff" }}
              >
                {quantity}
              </Text>
              <Text
                onPress={() => increaseCardQuantity(id)}
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
          )}
        </View>
        <View
          style={{
            marginVertical: 30,
            width: "100%",
            height: 0.5,
            backgroundColor: "#919993",
          }}
        ></View>
        <View style={{ display: "flex", gap: 15 }}>
          {/* <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Brand</Text>
            <Text style={{ color: '#616362' }}>Amul</Text>
          </View>
          <View style={{ display: 'flex', gap: 5 }}>
            <Text style={{ color: '#383b39', fontWeight: "700", fontSize: 15 }}>Shelf life</Text>
            <Text style={{ color: '#616362' }}>6 months</Text>
          </View> */}
          <View style={{ display: "flex", gap: 5 }}>
            <Text style={{ color: "#383b39", fontWeight: "700", fontSize: 15 }}>
              Product details
            </Text>
            <Text style={{ color: "#616362" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              incidunt, molestias placeat cupiditate iste amet autem recusandae
              soluta quaerat corporis? Porro tenetur laboriosam asperiores modi,
              saepe esse voluptas perferendis autem placeat temporibus, fugiat
              nisi nemo velit. Perspiciatis numquam autem quasi?
            </Text>
          </View>
          <View style={{ display: "flex", gap: 5 }}>
            <Text style={{ color: "#383b39", fontWeight: "700", fontSize: 15 }}>
              Nutritions
            </Text>
            <Text style={{ color: "#616362" }}>
              Total Fat 0.2 g, Cholesterol 0 mg 0% Sodium 1 mg 0% Potassium 107
              mg
            </Text>
          </View>
          <View style={{ display: "flex", gap: 5 }}>
            <Text style={{ color: "#383b39", fontWeight: "700", fontSize: 15 }}>
              review
            </Text>
            <Text style={{ color: "#616362" }}>
              Lorem ipsum dolor sit amet consectetur
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, display: "flex", gap: 15 }}>
          <button
            title="go to cart"
            color="#57a336"
            onProgress={() => navigation.navigate("cart")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Product_Details;
const styles = StyleSheet.create({});
