import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
const Category=["Eggs","Noodles & Pasta","Chips & Crisps","Fast Food"]
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
  const [brandName,setBrandName] = useState("");
  // console.log(categoryName);
  // console.log(brandName);
  
  

  if (!fontLoaded) {
      return (
        <AppLoading
          startAsync={loadFonts}
          onFinish={() => setFontLoaded(true)}
          onError={console.warn}
        />
      );
    }

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
      <View style={{height:"100%",padding:10,backgroundColor:'#EEEEEE',width:'100%',borderRadius:40}}>

      
      <View>
        <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',marginBottom:10,paddingHorizontal:15}}>Category</Text>
        {
          Category?.map((item,index)=>(
            <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
            <Checkbox
              // style={styles.checkbox}
              // value={isChecked}
              // onValueChange={setChecked}
              // color={isChecked ? "#69AF5D" : undefined}
              value={item}
              onValueChange={() => setCategoryName(item)}
              color={categoryName == item ? "#69AF5D":"white"}
              style={categoryName == item ? {backgroundColor:"#69AF5D"}:{backgroundColor:"white"}}
            />
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:16}}>{item}</Text>
          </View>
          ))
        }
       
      </View>
      <View>
        <Text style={{fontSize:24,marginVertical:5,fontFamily:'Gilroy-Semibold',paddingHorizontal:15,marginTop:15,marginBottom:15}}>Brand</Text>
        {
          Brand?.map((item,index)=>(
            <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',gap:7,marginVertical:5,marginHorizontal:15}}>
            <Checkbox
              value={item}
              onValueChange={() => setBrandName(item)}
              color={brandName == item ? "#69AF5D":"white"}
              style={brandName == item ? {backgroundColor:"#69AF5D"}:{backgroundColor:"white"}}
            />
            <Text style={{fontFamily:'Gilroy-Medium',fontSize:16}}>{item}</Text>
          </View>
          ))
        }
       
      </View>
      <TouchableOpacity style={{width:"100%",height:68,backgroundColor:'#69AF5E',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:19,marginTop:130}}>
        <Text style={{color:"#ffffff",fontSize:18,fontFamily:'Gilroy-Semibold'}}>Apply Filter</Text>
      </TouchableOpacity>
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
