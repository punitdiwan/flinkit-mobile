import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
const Search = () => {
  return (
    <View>
      <TouchableOpacity style={styles.addNewAddressMain}>
        <View style={styles.addNewAddress}>
          <TextInput
            selectionColor={"black"}
            placeholder="Where to deliver?"
            style={styles.searchAddress}
          />
          <Icon name="search" size={20} color="rgba(0, 0, 0, 0.459)" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  addNewAddressMain: {
    width: "100%",
  },

  addNewAddress: {
    width: "96%",
    height: 70,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    marginHorizontal: "2%",
    paddingVertical: 5,
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
    paddingHorizontal: 5,
    borderColor: "grey",
    borderRadius: 5,
    fontSize: 20,
    paddingVertical: 5,
  },
});
