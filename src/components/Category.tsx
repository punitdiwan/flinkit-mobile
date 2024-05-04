import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useMyContext } from "../context/Context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

export const CategoryData = [
  {
    id: "1523654",
    name: "Vegetables & Fruits",
    imgUrl:
      "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
    bg: "#e6d29c",
    buttonActive: false,
    price: 200,
    qty: 0,
  },
  {
    id: "1523654sgay",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "#eaedaf",
    buttonActive: false,
    price: 210,
    qty: 0,
  },
  {
    id: "1523654sada",
    name: "Munchies",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
    bg: "#ebc5ae",
    buttonActive: false,
    price: 250,
    qty: 0,
  },
  {
    id: "1523654isfji",
    name: "Cold Drinks & Juices",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
    bg: "#b7d8ed",
    buttonActive: false,
    price: 220,
    qty: 0,
  },
  {
    id: "1523654dsfhj",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    buttonActive: false,
    price: 230,
    qty: 0,
  },
  {
    id: "1523654dsfjiao",
    name: "Bakery & Biscuits",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/888_1688712847171.png",
    bg: "#db93ba",
    buttonActive: false,
    price: 240,
    qty: 0,
  },
  {
    id: "1523654sefiakwef",
    name: "Sweet Tooth",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/9_1693202755712.png",
    bg: "#97d3db",
    buttonActive: false,
    price: 250,
    qty: 0,
  },
  {
    id: "1523654sdifajo",
    name: "Atta, Rice & Dal",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/16_1670926686695.png",
    bg: "#5c6e70",
    buttonActive: false,
    price: 260,
    qty: 0,
  },
  {
    id: "1523654asdheu",
    name: "Cleaning Essentials",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/18_1692167327246.png",
    bg: "#798e91",
    buttonActive: false,
    price: 270,
    qty: 0,
  },
  {
    id: "1523654eadiedwd",
    name: "Personal Care",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/163_1698986628342.png",
    bg: "#bddbc6",
    buttonActive: false,
    price: 280,
    qty: 0,
  },
  {
    id: "1523654sdefcik0esow",
    name: "Vegetables & Fruits",
    imgUrl:
      "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
    bg: "#e6d29c",
    buttonActive: false,
    price: 290,
    qty: 0,
  },
  {
    id: "1523654aqwde-q0kd",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "#eaedaf",
    buttonActive: false,
    price: 300,
    qty: 0,
  },
  {
    id: "1523654ewsfold-sp0l",
    name: "Munchies",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
    bg: "#ebc5ae",
    buttonActive: false,
    price: 310,
    qty: 0,
  },
  {
    id: "1523654easdj9isajd",
    name: "Cold Drinks & Juices",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
    bg: "#b7d8ed",
    buttonActive: false,
    price: 320,
    qty: 0,
  },
  {
    id: "1523654sewofkwedf",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    buttonActive: false,
    price: 330,
    qty: 0,
  },
  {
    id: "1523654sepflk-ewf0",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    buttonActive: false,
    price: 340,
    qty: 0,
  },
];

const Category = () => {
  const { setcategoryname } = useMyContext();
  const navigation = useNavigation<any>();
  const setCategoryName = async (name: string) => {
    console.log(name);
    navigation.navigate("CategoryScreen");
  };

  return (
    <>
      <View style={{ padding: 10 }}>
        <View style={{ paddingLeft: 10, marginVertical: 25 }}>
          <Text style={{ fontSize: 25, fontWeight: "600" }}>Shop Category</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {CategoryData?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setCategoryName(item.name)}
              key={index}
              style={styles.cardBody}
            >
              <View style={[styles.imgBody, { backgroundColor: `${item.bg}` }]}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: item.imgUrl }}
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontStyle: "normal",
                    fontWeight: "500",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  cardBody: {
    width: 100,
    height: 150,
    // backgroundColor: "pink",
    display: "flex",
    alignItems: "center",
    padding: 2,
    overflow: "hidden",
    // justifyContent:"center"
  },
  imgBody: {
    width: "100%",
    height: 100,
    // backgroundColor:"#666666",
    borderRadius: 20,
    padding: 7,
  },
});
