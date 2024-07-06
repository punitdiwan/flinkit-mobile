import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
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
import { imageUrl } from "../../lib/constant";
import { StatusBar } from "expo-status-bar";

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


// const apiKey=""





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
  let index ;

  const colorArray = [
    "rgb(244,235,247)",
    "rgb(240,247,239)",
    "rgb(254,246,237)",
    "rgb(253,232,229)",
    "rgb(254,248,229)",
    "rgb(237,247,252)"

  ];
  const borderColorArray = [
    "rgb(216,186,228)",
    "rgb(113,200,158)",
    "rgb(250,190,124)",
    "rgb(248,176,160)",
    "rgb(253,235,178)",
    "rgb(201,231,247)"
  ];

  // console.log("color",myColor,"border",myBorder);

  function getRandomColor() {
    let randomNumber = Math.floor(Math.random() * 6);
    // setMyColor(colorArray[randomNumber]);
    // setBorder(borderColorArray[randomNumber]);
    return randomNumber;
   
    
    
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
      data?.reverse();
      setCategories(data);
      console.log("category",data);
      
    };

    fetchData();
  }, []);
  useEffect(() => {
    getRandomColor();
  }, [refreshing]);
  

 

  return (
    <>
    <StatusBar backgroundColor="#fff"/>
      <ScrollView style={{minHeight:"100%"}} showsVerticalScrollIndicator={false}>
        <View style={{width:"100%",backgroundColor:"white",justifyContent:"center",alignItems:"center",minHeight:"100%",paddingVertical:10,marginLeft:16}}>
          <View
           style={{
            display: "flex",
            flexDirection:"row",    
            minHeight: "100%",
            width:"100%",
            backgroundColor:"white",
            flexWrap:"wrap",
            alignItems:"center",
            gap:10,
            paddingTop:10,
            justifyContent:'flex-start'
          }}
          >
            {categories.length > 0 ? categories?.map((item: any,index:any) => {
              const randomNum = getRandomColor();
              console.log("category",item?.category_imgpath);
              
              return(
              <TouchableOpacity
                onAccessibilityAction={() => setRefreshing(!false)}
                onPress={() =>
                  setCategoryName(item.category_id, item.category_name)
                }
                key={index}
                style={styles.cardBody}
              >
                <View
                  style={[
                    styles.imgBody,
                    {
                      // backgroundColor: `${colorArray[index]}`,
                      // borderColor: `${borderColorArray[index]}`,
                      backgroundColor:`${colorArray[randomNum]}`,
                      borderColor:`${borderColorArray[randomNum]}`,
                      borderWidth: 1,
                    },
                  ]}
                  // style={getRandomColor() ? colorArray[2] : borderColorArray[2]}
                >
                  <Image
                    style={{ width: "60%", aspectRatio: 1 }}
                    source={{ uri: `${imageUrl + item?.category_imgpath}`}}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontStyle: "normal",
                        fontWeight:"bold",
                        fontFamily: "Gilroy-Bold",
                      }}
                    >
                      {item.category_name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}): <View style={{width:"100%",justifyContent:"center",alignContent:'center',paddingTop:200}}><ActivityIndicator size={50} color={"rgb(105,175,94)"}/></View>}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  cardBody: {
    width: "45%",
    height: 200,
    // backgroundColor: "pink",
    display: "flex",
    alignItems: "center",
    padding: 2,
    overflow: "hidden",
    // borderRadius: 0,
    // justifyContent:"center"
  },
  imgBody: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#666666",
    borderRadius: 15,
    padding: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
