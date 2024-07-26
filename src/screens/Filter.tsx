// import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Entypo } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox";
// // import  AppLoading  from 'expo-app-loading';
// import * as Font from 'expo-font';
// import { getProductsRelatedToCategoryId } from "./supabaseClient";
// import { useNavigation } from "@react-navigation/native";
// // const Category=["Eggs","Noodles & Pasta","Chips & Crisps","Fast Food"]
// const Brand =["Individidual callection","Cocola","Ifad","Kazi Farmas"]

// const loadFonts = async () => {
//   await Font.loadAsync({
//       'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
//       'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
//       'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf')
//     });

// };

// const Filter = ({navigation}) => {
//   const [isChecked, setChecked] = useState(false);
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [categoryName,setCategoryName] = useState("");
//   const [categoryId,setCategoryId] = useState("");
//   const [brandName,setBrandName] = useState("");
//   const [category,setCategory] = useState([]);
//   const [products,setProducts] = useState([]);
  
//   // console.log(category);
  

//   // if (!fontLoaded) {
//   //     return (
//   //       <AppLoading
//   //         startAsync={loadFonts}
//   //         onFinish={() => setFontLoaded(true)}
//   //         onError={console.warn}
//   //       />
//   //     );
//   //   }

//   const apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw"


//   const fetchData = async (categoryId : any) => {
//     const data = await getProductsRelatedToCategoryId(categoryId);
   
//     const productBrand = new Set();
//     const filterData = data.map(item => item?.product_brand);
//     filterData.forEach(element => {
//       element = element.toLowerCase();
//       productBrand.add(element);
//     });
//     const convertSetObjectToArr = [...productBrand];
    
//     const firstLetterUpperCase = convertSetObjectToArr.map( a => a.charAt(0).toUpperCase() + a.substr(1) );
//     setProducts(firstLetterUpperCase);
  
//   };


//   const loadCategory = async () => {
//       const response = await fetch(
//         "https://backend.delivery.maitretech.com/rest/v1/categories",
//         {
//           headers: {
//             Apikey: apiKey,
//           },
//         }
//       );
//       const jsonData = await response.json();
//       const categorynamee = jsonData.map((item:any) => ({id:item?.category_id,name:item?.category_name}));
//       setCategory(categorynamee);
//   }

//   const nav = useNavigation();

//   // const applyFilter = (category,id,brand) => {
//   //       console.log(category,id,brand);
//   //       nav.navigate("ShowingFilterData")
        
//   // }
// // handling Aert
//   const handleMsgAlert = (title: any, message: any) => {
//     Alert.alert(
//       title,
//       message,
//       [{ text: "OK", onPress: () => console.log("Press ok") }],
//       { cancelable: true }
//     );
//   };

//   useEffect(() => {
//     loadCategory();
//   },[])

//   return (
//     <SafeAreaView style={{backgroundColor:'white'}}>
//       <ScrollView>
//       <View
//         style={{
//           backgroundColor: "white",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           gap: 10,
//           height: 50,
//         }}
//       >
//         <View style={{ marginLeft: 10 }}>
//         <TouchableOpacity onPress={()=>{
//           navigation.navigate('SearchScreen');
//           setCategoryName("");
//           setBrandName("");
//           setProducts([]);
//           }}>

//           <Entypo name="cross" size={24} color="black"/>
//         </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "80%",
//             marginTop:10,
//             marginBottom:10
//           }}
//         >
//           <Text style={{fontSize:20,fontWeight:"bold"}}>Filter</Text>
//         </View>
//       </View>
//       <View style={{height:"100%",padding:10,backgroundColor:'rgb(242,243,242)',width:'100%',borderRadius:40}}>

      
//       <View>
//         <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',marginBottom:10,paddingHorizontal:15}}>Categories</Text>
//         {
//           category?.length > 0 ? category.map((item,index) => <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
//             <Checkbox
//               value={item?.name}
//               onValueChange={() => {
//                   setCategoryName(item?.name);
//                   fetchData(item?.id);
//                   setBrandName("");
//                   setCategoryId(item?.id);
//               }
//               }
//               color={categoryName == item?.name ? "#69AF5D":"white"}
//               style={categoryName == item?.name ? {backgroundColor:"#69AF5D",borderRadius:5,width:20,height:20}:{backgroundColor:"white"}}
//             />
//             <Text style={{fontFamily:'Gilroy-Medium',fontSize:16}}>{item?.name}</Text>
//           </View> ) : <View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingTop:100}}><ActivityIndicator size={50} color={"rgb(105,175,93)"}/></View>
//         }
       
//       </View>
//       <View>
//         {products?.length > 0 && <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',paddingHorizontal:15,marginTop:15,marginBottom:15}}>Brand</Text>}
//         {
//           products &&  products?.map((item,index)=>(
//             <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
//             <Checkbox
//               value={item}
//               onValueChange={() => setBrandName(item)}
//               color={brandName == item ? "#69AF5D":"white"}
//               style={brandName == item ? {backgroundColor:"#69AF5D",borderRadius:5,width:20,height:20}:{backgroundColor:"white",borderRadius:5,width:20,height:20}}
//             />
//             <Text style={{fontFamily:'Gilroy-Medium',fontSize:16}}>{item}</Text>
//           </View>
//           ))
//         }
       
//       </View>
//       {<TouchableOpacity style={{width:"100%",height:60,backgroundColor:'#69AF5E',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:10,marginTop:130}}    onPress={() =>{
//                       if(categoryName){
//                         navigation.navigate("ShowingFilterData", {
//                           id:categoryId,
//                           category:categoryName,
//                           brand:brandName
//                       })
//                       }else{
//                         handleMsgAlert("Invalid","Please select category before apply filter")
//                       }
                      
//                       }}>
//         <Text style={{color:"#ffffff",fontSize:18,fontFamily:'Gilroy-Semibold',fontWeight:"bold"}}>Apply Filter</Text>
//       </TouchableOpacity>}
//       </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Filter;

// const styles = StyleSheet.create({
//   checkbox: {
//     margin: 8,
//     borderRadius: 5,
//     marginLeft:15
//   },
// });

import React, { useEffect, useState } from "react";
import { 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import * as Font from 'expo-font';
import { getProductsRelatedToCategoryId } from "./supabaseClient";
import { useNavigation } from "@react-navigation/native";

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw"; // Replace with your actual API key
const Brand = ["Individual Collection", "Cocola", "Ifad", "Kazi Farmas"];

const loadFonts = async () => {
  await Font.loadAsync({
    'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf'),
  });
};

const Filter = ({ navigation }:any) => {
  const [isChecked, setChecked] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async (categoryId:any) => {
    const data = await getProductsRelatedToCategoryId(categoryId);
    const productBrand = new Set(data.map(item => item?.product_brand.toLowerCase()));
    const brands = Array.from(productBrand).map(brand => 
      brand?.charAt(0).toUpperCase() + brand?.slice(1)
    );
    setProducts(brands);
  };

  const loadCategory = async () => {
    try {
      const response = await fetch(
        "https://backend.delivery.maitretech.com/rest/v1/categories",
        { headers: { Apikey: apiKey } }
      );
      const jsonData = await response.json();
      const categories = jsonData?.map(item => ({
        id: item?.category_id,
        name: item?.category_name
      }));
      setCategory(categories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleMsgAlert = (title:any, message:any) => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: () => console.log("Press ok") }],
      { cancelable: true }
    );
  };

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    if (fontLoaded) return;
    loadFonts().then(() => setFontLoaded(true));
  }, [fontLoaded]);

  if (!fontLoaded) {
    return <ActivityIndicator size="large" color="#69AF5D" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SearchScreen');
            setCategoryName("");
            setBrandName("");
            setProducts([]);
          }}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter</Text>
        </View>
        <View style={styles.mainContent}>
          <View>
            <Text style={styles.sectionTitle}>Categories</Text>
            {category.length > 0 ? category.map((item, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <Checkbox
                  value={item?.name}
                  onValueChange={() => {
                    setCategoryName(item?.name);
                    fetchData(item?.id);
                    setBrandName("");
                    setCategoryId(item?.id);
                  }}
                  color={categoryName === item?.name ? "#69AF5D" : "white"}
                  style={[
                    styles.checkbox,
                    { backgroundColor: categoryName === item?.name ? "#69AF5D" : "white" }
                  ]}
                />
                <Text style={styles.checkboxLabel}>{item?.name}</Text>
              </View>
            )) : (
              <View style={styles.loader}>
                <ActivityIndicator size={50} color="#69AF5D" />
              </View>
            )}
          </View>
          <View>
            {products.length > 0 && (
              <Text style={styles.sectionTitle}>Brand</Text>
            )}
            {products.map((item, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <Checkbox
                  value={item}
                  onValueChange={() => setBrandName(item)}
                  color={brandName === item ? "#69AF5D" : "white"}
                  style={[
                    styles.checkbox,
                    { backgroundColor: brandName === item ? "#69AF5D" : "white" }
                  ]}
                />
                <Text style={styles.checkboxLabel}>{item}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              if (categoryName) {
                navigation.navigate("ShowingFilterData", {
                  id: categoryId,
                  category: categoryName,
                  brand: brandName
                });
              } else {
                handleMsgAlert("Invalid", "Please select category before applying filter");
              }
            }}
          >
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  mainContent: {
    padding: 10,
    backgroundColor: 'rgb(242,243,242)',
    borderRadius: 40,
  },
  sectionTitle: {
    fontSize: 24,
    marginVertical: 5,
    fontFamily: 'Gilroy-Semibold',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  checkbox: {
    borderRadius: 5,
    width: 20,
    height: 20,
    marginRight: 10,
  },
  checkboxLabel: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  loader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  applyButton: {
    width: "100%",
    height: 60,
    backgroundColor: '#69AF5E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 130,
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: 'Gilroy-Semibold',
    fontWeight: "bold",
  },
});

export default Filter;
