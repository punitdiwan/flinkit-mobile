import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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

const SelectAddress = () => {
  const navigation = useNavigation();
  const ref = useRef();
  const [newLocation, setNewLocation] = useState("");


//   getting zipCodeAndLatitude&Longitude
   const getZipCodeRelatedToPlaceId = async (place_id:any) => {
    const emptyString = "";
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${googleApiKey}`)
     const jsonData = await response.json();

      const fullAddress =  emptyString.concat(jsonData?.results[0]?.formatted_address);
      const houseNumber = jsonData?.results[0]?.address_components[0]?.short_name;
      const areaName = jsonData?.results[0]?.address_components[1]?.short_name;
      const areaName1 = jsonData?.results[0]?.address_components[2]?.short_name;
      const areaName2 = jsonData?.results[0]?.address_components[3]?.short_name;
      const city = jsonData?.results[0]?.address_components[4]?.short_name;
      const country = jsonData?.results[0]?.address_components[7]?.short_name
      
      return {
        houseNumber,
        areaName,
        areaName1,
        areaName2,
        city,
        country
      }
   }



  const handleChangeLocation = async () => {
    if (!newLocation) {
      Alert.alert("Invalid", "Please enter your location");
    } else {
       const address = await getZipCodeRelatedToPlaceId(newLocation?.place_id);
        navigation.navigate("ConfirmAddress",{
          address
        });
    }
  };

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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png",
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View style={{ height: 340 }}>
        <GooglePlacesAutocomplete
          placeholder="Enter your full address"
          minLength={2}
          autoFocus={true}
          returnKeyType={"default"}
          fetchDetails={true}
          query={{
            key: "AIzaSyBpcS0RtHe9js4JhdXVZ5J2Omf4bVe6dkI",
            language: "en",
            types: ['address'],
            components: "country:in",
          }}
          onPress={(data, details = null) => {
            console.log(data, details);
            setNewLocation(data);
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "#Fff",
              borderRadius: 5,
              elevation: 10,
            },
            textInput: {
              height: 38,
              color: "#000",
              fontSize: 16,
              backgroundColor: "#fff",
              borderRadius: 10,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "rgb(105,175,94)",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 12,
              borderRadius: 10,
            }}
            onPress={() => {
              handleChangeLocation();
            }}
          >
            <Text style={{ fontWeight: 500, color: "white", fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SelectAddress;

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


