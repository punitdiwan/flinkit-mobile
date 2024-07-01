import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
// import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { getProductsRelatedToCategoryId } from "./supabaseClient";
import { useNavigation } from "@react-navigation/native";
// const Category=["Eggs","Noodles & Pasta","Chips & Crisps","Fast Food"]
const Brand =["Individidual callection","Cocola","Ifad","Kazi Farmas"]

const loadFonts = async () => {
  await Font.loadAsync({
      'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
      'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
      'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf')
    });

};

const Filter = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [categoryName,setCategoryName] = useState("");
  const [categoryId,setCategoryId] = useState("");
  const [brandName,setBrandName] = useState("");
  const [category,setCategory] = useState([]);
  const [products,setProducts] = useState([]);
  
  // console.log(category);
  

  // if (!fontLoaded) {
  //     return (
  //       <AppLoading
  //         startAsync={loadFonts}
  //         onFinish={() => setFontLoaded(true)}
  //         onError={console.warn}
  //       />
  //     );
  //   }

  const apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzE3NDM5NDAwLAogICJleHAiOiAxODc1MjA1ODAwCn0.JEhCAjkG0KvAc7H6A4RkQNsF-lZW_OpYuT--XKHlAlw"


  const fetchData = async (categoryId) => {
    const data = await getProductsRelatedToCategoryId(categoryId);
    // console.log(data);
    
    // setProducts(data);
    // let unique_values = products
    // .map((item) => item?.product_brand.toLowerCase())
    // .filter(
    //     (value, index, current_value) => current_value.indexOf(value) === index
    // );
    // if(unique_values?.length == 0){
    //   // setProducts(unique_values);
    //   console.log("uniq",unique_values);
    //   unique_values=[]
      
    // }else{
    //   const filterBrand = data.map(item => item?.product_brand);
    //   // setProducts(filterBrand)
    //   console.log("filter",filterBrand);
    //   filterBrand=[]
      
    // }
    const productBrand = new Set();
    const filterData = data.map(item => item?.product_brand);
    filterData.forEach(element => {
      element = element.toLowerCase();
      productBrand.add(element);
    });
    const convertSetObjectToArr = [...productBrand];
    
    const firstLetterUpperCase = convertSetObjectToArr.map( a => a.charAt(0).toUpperCase() + a.substr(1) );
    setProducts(firstLetterUpperCase);
  
  };


  const loadCategory = async () => {
      const response = await fetch(
        "https://backend.delivery.maitretech.com/rest/v1/categories",
        {
          headers: {
            Apikey: apiKey,
          },
        }
      );
      const jsonData = await response.json();
      const categorynamee = jsonData.map((item:any) => ({id:item?.category_id,name:item?.category_name}));
      setCategory(categorynamee);
  }

  const nav = useNavigation();

  // const applyFilter = (category,id,brand) => {
  //       console.log(category,id,brand);
  //       nav.navigate("ShowingFilterData")
        
  // }

  useEffect(() => {
    loadCategory();
  },[])

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
          height: 50,
        }}
      >
        <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('SearchScreen');
          setCategoryName("");
          setBrandName("");
          setProducts([]);
          }}>

          <Entypo name="cross" size={24} color="black"/>
        </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            marginTop:10,
            marginBottom:10
          }}
        >
          <Text style={{fontSize:20,fontWeight:"bold"}}>Filter</Text>
        </View>
      </View>
      <View style={{height:"100%",padding:10,backgroundColor:'rgb(242,243,242)',width:'100%',borderRadius:40}}>

      
      <View>
        <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',marginBottom:10,paddingHorizontal:15,fontWeight:"semibold"}}>Categories</Text>
        {
          category?.length > 0 ? category.map(item => <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
            <Checkbox
              value={item?.name}
              onValueChange={() => {
                  setCategoryName(item?.name);
                  fetchData(item?.id);
                  setBrandName("");
                  setCategoryId(item?.id);
              }
              }
              color={categoryName == item?.name ? "#69AF5D":"white"}
              style={categoryName == item?.name ? {backgroundColor:"#69AF5D",borderRadius:5,width:20,height:20}:{backgroundColor:"white"}}
            />
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:14}}>{item?.name}</Text>
          </View> ) : <View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingTop:100}}><ActivityIndicator size={50} color={"rgb(105,175,93)"}/></View>
        }
       
      </View>
      <View>
        {products?.length > 0 && <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',paddingHorizontal:15,marginTop:15,marginBottom:15}}>Brand</Text>}
        {
          products &&  products?.map((item,index)=>(
            <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
            <Checkbox
              value={item}
              onValueChange={() => setBrandName(item)}
              color={brandName == item ? "#69AF5D":"white"}
              style={brandName == item ? {backgroundColor:"#69AF5D",borderRadius:5,width:20,height:20}:{backgroundColor:"white",borderRadius:5,width:20,height:20}}
            />
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:14}}>{item}</Text>
          </View>
          ))
        }
       
      </View>
      {categoryName ? <TouchableOpacity style={{width:"100%",height:68,backgroundColor:'#69AF5E',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:19,marginTop:130}}    onPress={() =>
                        navigation.navigate("ShowingFilterData", {
                            id:categoryId,
                            category:categoryName,
                            brand:brandName
                        })
                      }>
        <Text style={{color:"#ffffff",fontSize:18,fontFamily:'Gilroy-Semibold',fontWeight:"bold"}}>Apply Filter</Text>
      </TouchableOpacity> : <TouchableOpacity style={{width:"100%",height:68,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:19,marginTop:130}}>
        <Text style={{color:"#69AF5E",fontSize:18,fontFamily:'Gilroy-Semibold',fontWeight:"bold"}}>Select Category to Apply filter</Text>
      </TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
    borderRadius: 5,
    marginLeft:15
  },
});

// {"category_id": 5, "created_at": "2024-06-05T14:04:09.938313+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "price": 50, "product_brand": " UNIBIC", "product_category": "Dairy & Egg", "product_details": "Base Flavor: Almond, Cashew", "product_discount": "10%", "product_id": 23, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/cookie.jpeg", "product_imgeid": "d187b504-c943-4f8d-86e8-88b64635b67b", "product_name": "Fruit & Nut Cookies", "product_packing_type": "kilogram", "product_total_qty": 150, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-05T14:04:09.938313+00:00", "uuid": "6c72343b-1fb6-49b0-ba9f-93c4c104fef3", "variant_group_id": null, "visibility": true, "weight": null}