import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

import { imageUrl } from "../../lib/constant";
import { StatusBar } from "expo-status-bar";
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator<RootStackParamList>();

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gilroy-Semibold': require("../../assets/fonts/Gilroy-SemiBold.ttf"),
        'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  const windowWidth = useWindowDimensions().width;

  const colorArray = [
    "rgb(244,235,247)",
    "rgb(240,247,239)",
    "rgb(254,246,237)",
    "rgb(253,232,229)",
    "rgb(254,248,229)",
    "rgb(237,247,252)",
  ];
  const borderColorArray = [
    "rgb(216,186,228)",
    "rgb(113,200,158)",
    "rgb(250,190,124)",
    "rgb(248,176,160)",
    "rgb(253,235,178)",
    "rgb(201,231,247)",
  ];

  const getRandomColor = () => {
    return Math.floor(Math.random() * 6);
  };

  const navigation = useNavigation<any>();

  const setCategoryName = async (category_id: string, category_name: string) => {
    navigation.navigate("CategoryScreen", {
      category_id,
      name: `${category_name}`,
    });
  };


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
      data.reverse();
      setCategories(data);
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {categories.length > 0 ? (
          categories.map((item: any, index: number) => {
            const randomNum = getRandomColor();
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cardBody,
                  {
                    width: windowWidth > 600 ? "30%" : "45%",
                    marginBottom: 20,
                  },
                ]}
                onPress={() =>
                  setCategoryName(item.category_id, item.category_name)
                }
              >
                <View
                  style={[
                    styles.imgBody,
                    {
                      backgroundColor: colorArray[randomNum],
                      borderColor: borderColorArray[randomNum],
                    },
                  ]}
                >
                  <Image
                    style={{ width: "60%", aspectRatio: 1,borderRadius:5}}
                    source={{ uri: `${imageUrl}${item.category_imgpath}` }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "Gilroy-Bold", // Replace with your Gilroy font family
                      marginTop: 10,
                    }}
                  >
                    {item.category_name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <ActivityIndicator size={50} color={"rgb(105,175,94)"} />
        )}
      </View>
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  cardBody: {
    height: 189,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "white",
  },
  imgBody: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    padding: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   useWindowDimensions,
// } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
// import { RootStackParamList } from "../../App";

// import { imageUrl } from "../../lib/constant";
// import { StatusBar } from "expo-status-bar";
// import * as Font from "expo-font";

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const apiKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [fontLoaded, setFontLoaded] = useState(false); // useState from react

//   const navigation = useNavigation(); // useNavigation from react-navigation/native

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
//         "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
//         "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
//       });
//       setFontLoaded(true);
//     }
//     loadFonts();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resp = await fetch(
//           "https://backend.delivery.maitretech.com/rest/v1/categories",
//           {
//             headers: {
//               Apikey: apiKey,
//             },
//           }
//         );
//         if (resp.ok) {
//           const data = await resp.json();
//           data.reverse();
//           setCategories(data);
//         } else {
//           console.error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const windowWidth = useWindowDimensions().width;

//   const colorArray = [
//     "rgb(244,235,247)",
//     "rgb(240,247,239)",
//     "rgb(254,246,237)",
//     "rgb(253,232,229)",
//     "rgb(254,248,229)",
//     "rgb(237,247,252)",
//   ];
//   const borderColorArray = [
//     "rgb(216,186,228)",
//     "rgb(113,200,158)",
//     "rgb(250,190,124)",
//     "rgb(248,176,160)",
//     "rgb(253,235,178)",
//     "rgb(201,231,247)",
//   ];

//   const getRandomColor = () => {
//     return Math.floor(Math.random() * 6);
//   };

//   const setCategoryName = (category_id, category_name) => {
//     navigation.navigate("CategoryScreen", {
//       category_id,
//       name: `${category_name}`,
//     });
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
//       <View
//         style={{
//           flex: 1,
//           flexDirection: "row",
//           flexWrap: "wrap",
//           justifyContent: "space-around",
//           padding: 10,
//         }}
//       >
//         {categories.length > 0 ? (
//           categories.map((item, index) => {
//             const randomNum = getRandomColor();
//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.cardBody,
//                   {
//                     width: windowWidth > 600 ? "30%" : "45%",
//                     marginBottom: 20,
//                   },
//                 ]}
//                 onPress={() => setCategoryName(item.category_id, item.category_name)}
//               >
//                 <View
//                   style={[
//                     styles.imgBody,
//                     {
//                       backgroundColor: colorArray[randomNum],
//                       borderColor: borderColorArray[randomNum],
//                     },
//                   ]}
//                 >
//                   <Image
//                     style={{ width: "60%", aspectRatio: 1, borderRadius: 5 }}
//                     source={{ uri: `${imageUrl}${item.category_imgpath}` }}
//                   />
//                   <Text
//                     style={{
//                       textAlign: "center",
//                       fontSize: 15,
//                       fontFamily: "Gilroy-Bold", // Make sure "Gilroy-Bold" matches loaded font name
//                       marginTop: 10
//                     }}
//                   >
//                     {item?.category_name}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         ) : (
//           <ActivityIndicator size={50} color={"rgb(105,175,94)"} />
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Category;

// const styles = StyleSheet.create({
//   cardBody: {
//     height: 200,
//     display: "flex",
//     alignItems: "center",
//     overflow: "hidden",
//     borderRadius: 15,
//     elevation: 5,
//     backgroundColor: "white",
//   },
//   imgBody: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 15,
//     padding: 7,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//   },
// });
