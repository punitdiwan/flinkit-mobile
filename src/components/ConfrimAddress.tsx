import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import MapView, { Marker } from "react-native-maps";
  import * as Location from "expo-location";
  import Search from "./Search";
  import AddNewAddressBtn from "./AddNewAddress";
  import { Text } from "react-native";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import { googleApiKey } from "../../lib/constant";
  import { Entypo, AntDesign } from "@expo/vector-icons";
  import { useNavigation, useRoute } from "@react-navigation/native";
  
  const ConfrimAddress = () => {
    const route = useRoute();
    const paramsData = route?.params;
    const {houseNumber,areaName,areaName1,areaName2,city,country} = paramsData?.address;
    let fullAddress = "";
    fullAddress = fullAddress.concat(houseNumber).concat(" ",areaName).concat(" ",areaName1).concat(" ",areaName2)
    console.log("addressFull",fullAddress);
    
    
    
    const navigation = useNavigation();
    const ref = useRef();
    const [newLocation, setNewLocation] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    console.log("isEdit",isEdit);
    console.log("newwLocation",newLocation);
    
    
  
  //    handling location save
    const handleChangeLocation = () => {
      
      if (!newLocation) {
        Alert.alert("Invalid", "Please enter your location");
      } else {
         navigation.navigate("Home");
      }
    };

    useEffect(() => {
      setNewLocation(fullAddress);
    },[])
  
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          gap: 25,
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
          justifyContent: "space-around",
        }}
      >

        <View style={{paddingVertical:5,backgroundColor:"#f0f0f0",borderRadius:5,paddingHorizontal:10}}>
            {isEdit ? <TextInput value={newLocation} autoFocus={true} onChangeText={setNewLocation} /> : 
            <TextInput value={newLocation} autoFocus={false} editable={false}/>}
        </View>

        <View style={{flexDirection:"row",position:"absolute",right:20,top:70,backgroundColor:"#f0f0f0",paddingHorizontal:5,paddingVertical:2,borderRadius:5}}>
          <View>
          <Text style={{color:"#000",fontWeight:"bold",fontSize:16}}>{city},</Text>
          </View>
          <View>
          <Text style={{color:"#000",fontWeight:"bold",fontSize:16}}>{country}</Text>
          </View>
        </View>
  
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ position: "absolute", width: "100%", bottom: 0,gap:5 }}>
            {isEdit ?  <TouchableOpacity
              style={{
                backgroundColor: "rgb(105,175,94)",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 5
              }}
              onPress={() => {
                handleChangeLocation();
              }}
            >
              <Text style={{ fontWeight: 500, color: "white", fontSize: 16 }}>
                Save
              </Text>
            </TouchableOpacity>  : <View style={{gap:5}}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgb(105,175,94)",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                borderRadius: 5
              }}
              onPress={() => {
                handleChangeLocation();
              }}
            >
              <Text style={{ fontWeight: 500, color: "white", fontSize: 16 }}>
                Confrim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 7,
                borderRadius:5,
                borderWidth:1,
                borderColor:"rgb(105,175,94)"
              }}
              onPress={() => setIsEdit(!isEdit)}
            >
              <Text style={{ fontWeight: 500, color: "rgb(105,175,94)", fontSize: 16 }} >
                Edit
              </Text>
            </TouchableOpacity>
            </View>}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default ConfrimAddress;
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "space-around",
    },
    map: {
      width: "100%",
      height: "92%",
    },
    addNewAddressMain: {
      width: "100%",
    },
  
    addNewAddress: {
      width: "100%",
      height: 70,
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center",
    },
    addNewText: {
      backgroundColor: "green",
      width: "96%",
      marginHorizontal: "2%",
      paddingVertical: 12,
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      borderRadius: 10,
    },
    searchAddress: {
      width: "85%",
      borderWidth: 1,
      borderColor: "red",
    },
  });
  
  
  