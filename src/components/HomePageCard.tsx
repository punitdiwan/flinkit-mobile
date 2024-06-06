import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomePageCard = ({ name, data }: any) => {
  const imgUrl =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png";

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
        <Text style={{ color: "#181725", fontSize: 25 }}>{name}</Text>
        <Text style={{ color: "#69AF5D" }}>See all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        {data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              backgroundColor: "white",
              width: 150,
              padding: 20,
              height: 250,
              borderWidth: 2,
              borderRadius: 15,
              borderColor: "#E2E2E2",
              marginHorizontal: 5,
            }}
            onPress={() => navigation.navigate("Product_Details")}
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
                style={{ width: 70, height: 70 }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{item?.name}</Text>
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
              <Text>Rs{item?.price}</Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#69AF5D",
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 25, color: "white" }}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePageCard;

const styles = StyleSheet.create({});
