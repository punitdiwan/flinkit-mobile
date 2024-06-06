import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import CategoryScreen from "../screens/CategoryScreen";
import BottomNav from "../screens/BottomNav";
// import { fetchData } from "../screens/supabaseClient";
const Stack = createNativeStackNavigator<RootStackParamList>();
export const CategoryData = [
  {
    id: "1523654",
    name: "Vegetables & Fruits",
    imgUrl:
      "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
    bg: "#66CDAA",
    price: 25,
  },
  {
    id: "1523654sgay",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "#FFE4C4",
    price: 255,
  },
  {
    id: "1523654sada",
    name: "Munchies",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
    bg: "#F5F5DC",
    price: 158,
  },
  {
    id: "1523654isfji",
    name: "Cold Drinks & Juices",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
    bg: "#b7d8ed",
    price: 25,
  },
  {
    id: "1523654dsfhj",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    price: 256,
  },
  {
    id: "1523654dsfjiao",
    name: "Bakery & Biscuits",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/888_1688712847171.png",
    bg: "#db93ba",
    price: 25,
  },
  {
    id: "1523654sefiakwef",
    name: "Sweet Tooth",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/9_1693202755712.png",
    bg: "#97d3db",
    price: 25,
  },
  {
    id: "1523654sdifajo",
    name: "Atta, Rice & Dal",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/16_1670926686695.png",
    bg: "#5c6e70",
    price: 25,
  },
  {
    id: "1523654asdheu",
    name: "Cleaning Essentials",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/18_1692167327246.png",
    bg: "#798e91",
    price: 25,
  },
  {
    id: "1523654eadiedwd",
    name: "Personal Care",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/163_1698986628342.png",
    bg: "#bddbc6",
    price: 25,
  },
  {
    id: "1523654sdefcik0esow",
    name: "Vegetables & Fruits",
    imgUrl:
      "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
    bg: "#e6d29c",
    price: 25,
  },
  {
    id: "1523654aqwde-q0kd",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "#eaedaf",
    price: 25,
  },
  {
    id: "1523654ewsfold-sp0l",
    name: "Munchies",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
    bg: "#ebc5ae",
    price: 25,
  },
  {
    id: "1523654easdj9isajd",
    name: "Cold Drinks & Juices",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/332_1680269002502.png",
    bg: "#b7d8ed",
    price: 25,
  },
  {
    id: "1523654sewofkwedf",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    price: 25,
  },
  {
    id: "1523654sepflk-ewf0",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "#b299d1",
    price: 25,
  },
];
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw";

type Values = {
  bg: string;
  category_imgpath: string;
  category_name: string;
};
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState<any>("");
  // const{setcategoryname}=useMyContext();
  const navigation = useNavigation<any>();

  // const setCategoryName = async (category_id: string) => {
  //   // console.log("name", category_id);

  //   // navigation.navigate("CategoryScreen", { category_id });
  //   console.log("yes categoryId",category_id)
  // };
  // // const showProducts = ({item.category_id}) => {
  // //   Alert.alert(item.category_id);
  // //   // navigation.navigate("CategoryScreen");
  // // };

const setCategoryName = async (category_id:string) => {
      navigation.navigate("CategoryScreen",{category_id})
}

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://backend.delivery.maitretech.com/rest/v1/categories",
        {
          headers: {
            Apikey: apikey,
          },
        }
      );
      const data = await resp.json();
      console.log("searchdata.com",data);
      setCategories(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <View style={{ padding: 10 }}>
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
          {CategoryData &&
            categories?.map((item, index): any => (
              <TouchableOpacity
                onPress={() => setCategoryName(item.category_id)}
                // onPress={() => navigation.navigate()}
                // onPress={() => {
                //   // setProductId(item.category_id),
                //   setProductId(item.category_id) ,showProducts();
                // }}
                key={index}
                style={styles.cardBody}
              >
                <View style={[styles.imgBody, { backgroundColor: "#EEEDEB" }]}>
                  <Image
                    style={{ width: "60%", aspectRatio: 1 }}
                    source={{ uri: item.category_imgpath }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        fontStyle: "normal",
                        fontWeight: "500",
                      }}
                    >
                      {item.category_name}
                    </Text>
                  </View>
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
    width: "48%",
    height: 190,
    // backgroundColor: "pink",
    display: "flex",
    alignItems: "center",
    padding: 2,
    overflow: "hidden",
    borderRadius: 40,
    // justifyContent:"center"
  },
  imgBody: {
    width: "100%",
    height: "100%",
    // backgroundColor:"#666666",
    borderRadius: 35,
    padding: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
