import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Search from "./Search";
import AddNewAddressBtn from "./AddNewAddressBtn";

const AddAddress = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,

    latitudeDelta: 0.0922,

    longitudeDelta: 0.0421,
  });
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      Alert.alert(errorMsg);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,

      longitudeDelta: 0.0421,
    });
  };
  useEffect(() => {
    userLocation();
  }, []);
  {
    /* <Search /> */
  }
  return (
    <View style={styles.container}>
      <Search />
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <AddNewAddressBtn />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "85%",
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
