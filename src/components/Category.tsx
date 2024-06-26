import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
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
    bg: "",
    price: 25,
  },
  {
    id: "1523654sgay",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "",
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
    bg: "",
    price: 25,
  },
  {
    id: "1523654dsfhj",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "",
    price: 256,
  },
  {
    id: "1523654dsfjiao",
    name: "Bakery & Biscuits",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/888_1688712847171.png",
    bg: "",
    price: 25,
  },
  {
    id: "1523654sefiakwef",
    name: "Sweet Tooth",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/9_1693202755712.png",
    bg: "",
    price: 25,
  },
  {
    id: "1523654sdifajo",
    name: "Atta, Rice & Dal",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/16_1670926686695.png",
    bg: "",
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
    bg: "",
    price: 25,
  },
  {
    id: "1523654sdefcik0esow",
    name: "Vegetables & Fruits",
    imgUrl:
      "https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702618300089-5",
    bg: "",
    price: 25,
  },
  {
    id: "1523654aqwde-q0kd",
    name: "Dairy & Breakfast",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/14_1678949221877.png",
    bg: "",
    price: 25,
  },
  {
    id: "1523654ewsfold-sp0l",
    name: "Munchies",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/1237_1670927167688.png",
    bg: "",
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
    bg: "",
    price: 25,
  },
  {
    id: "1523654sepflk-ewf0",
    name: "Instant & Frozen Food",
    imgUrl:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/app/images/category/cms_images/icon/15_1676610279582.png",
    bg: "",
    price: 25,
  },
];


const apiKey=""
 


type Values = {
  bg: string;
  category_imgpath: string;
  category_name: string;
};
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState<any>("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [myColor, setMyColor] = useState<string>();
  const [myBorder, setBorder] = useState<string>();

  const colorArray = [
    "    rgba(240, 247, 239, 0.7)",
    "  rgba(254, 246, 237, 0.8)",
    "  rgba(253, 232, 228, 0.5)",
    "  rgba(244, 235, 247, 0.8)",
    "  rgba(255, 248, 229, 0.6)",
    "  rgba(237, 247, 252, 0.5)",
    "  rgba(231, 228, 249, 0.7)",
    "  rgba(241, 219, 228, 0.5)",
  ];
  const borderColorArray = [
    "    rgba(240, 247, 239, 2)",
    "  rgba(254, 246, 237, 1)",
    "  rgba(253, 232, 228, 1)",
    "  rgba(244, 235, 247, 1)",
    "  rgba(255, 248, 229, 1)",
    "  rgba(237, 247, 252, 1)",
    "  rgba(231, 228, 249, 1)",
    "  rgba(241, 219, 228, 1)",
  ];
  function getRandomColor() {
    let color = Math.floor(Math.random() * 9);
    console.log(color);
    setMyColor(colorArray[color]);
    setBorder(borderColorArray[color]);
    console.log(myColor);
  }

  // const{setcategoryname}=useMyContext();
  const navigation = useNavigation<any>();
  const setCategoryName = async (
    category_id: string,
    category_name: string
  ) => {
    // console.log("category_id", category_id);
    // console.log("product_category", category_name);

    navigation.navigate("CategoryScreen", {
      category_id,
      name: `${category_name}`,
    });
  };
  // const showProducts = ({item.category_id}) => {
  //   Alert.alert(item.category_id);
  //   // navigation.navigate("CategoryScreen");
  // };
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://backend.delivery.maitretech.com/rest/v1/categories",
        {
          headers: {
            Apikey: apiKey,
          },
        }
      );
      const data = await resp.json();
      console.log(data);
      setCategories(data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    getRandomColor();
  }, [refreshing]);

  return (
    <>
      <ScrollView>
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
            {categories?.map((item: any, index: any): any => (
              <TouchableOpacity
                onAccessibilityAction={() => setRefreshing(!false)}
                onPress={() =>
                  setCategoryName(item.category_id, item.category_name)
                }
                // onPress={() => {
                //   // setProductId(item.category_id),
                //   setProductId(item.category_id) ,showProducts();
                // }}
                key={index}
                style={styles.cardBody}
              >
                <View
                  style={[
                    styles.imgBody,
                    {
                      backgroundColor: `${colorArray[index]}`,
                      borderColor: `${borderColorArray[index]}`,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Image
                    style={{ width: "60%", aspectRatio: 1 }}
                    source={{ uri: item.category_imgpath }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontFamily: "Gilroy-Bold",
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
      </ScrollView>
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
    // backgroundColor: "#666666",
    borderRadius: 35,
    padding: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
