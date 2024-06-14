import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Location = () => {
  const navigation = useNavigation<string | any>();
  const GOOGLE_PLACES_API_KEY = "AIzaSyD7ewqZWwuXaGnh7eSQzebePd5uEmlCwKg";
  const [currentLocation, setCurrentLocation] = useState(
    "Waiting for Location"
  );
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          rowGap: 40,
          width: "98%",
          marginHorizontal: "1%",
          minHeight: "100%",
          borderColor: "red",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            height: "30%",
            marginTop: "30%",
          }}
        >
          <Image
            source={require("../../assets/location.png")}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",

              padding: 5,
              display: "flex",

              justifyContent: "space-between",
              flexDirection: "column",
              rowGap: 20,
            }}
          >
            <View
              style={{
                width: "100%",

                padding: 5,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 26,
                  fontWeight: 900,
                }}
              >
                Select Your Location
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Swithch on your location to stay in tune with what’s happening
                in your area
              </Text>
            </View>
            <View
              style={{
                width: "100%",

                padding: 5,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>Your Zone</Text>
              <View
                style={{
                  width: "100%",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  flexDirection: "row",
                  rowGap: 5,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {currentLocation}
                </Text>
                <TouchableOpacity>
                  <AntDesign name="down" size={18} color="grey" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                borderColor: "green",
                padding: 5,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <View>
                <Text style={{ fontSize: 16 }}>Your Area</Text>
              </View>

              <View
                style={{
                  width: "100%",

                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  rowGap: 5,
                }}
              >
                <GooglePlacesAutocomplete
                  placeholder="Types of your area"
                  query={{ key: GOOGLE_PLACES_API_KEY }}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    setCurrentLocation(data.description);
                    console.log("data", data.description, details);
                  }}
                  onFail={(error) => console.log(error)}
                  onNotFound={() => console.log("no results")}
                  enablePoweredByContainer={false}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BottomNav", {
                  location: currentLocation,
                })
              }
            >
              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor: "#69AF5E",
                  padding: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Gilroy-Semibold",
                  }}
                >
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Location;
const style = StyleSheet.create({});
