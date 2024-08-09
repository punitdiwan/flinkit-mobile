import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Text,
} from "react-native";
import { useState } from "react";
import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
const Search = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <TouchableOpacity style={styles.addNewAddressMain}>
        <View style={styles.addNewAddress}>
          <TextInput
            onPressIn={toggleModal}
            selectionColor={"black"}
            placeholder="Where to deliver?"
            style={styles.searchAddress}
          />
          <Icon name="search" size={20} color="rgba(0, 0, 0, 0.459)" />
        </View>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Button title="Show modal" />

        <Modal
          isVisible={isModalVisible}
          style={styles.serachModal}
          swipeDirection="down"
          onSwipeComplete={toggleModal}
          onBackdropPress={toggleModal}
        >
          <View style={styles.searchContainer}>
            <Icon2
              name="minus"
              size={40}
              color="rgba(0, 0, 0, 0.459)"
              style={styles.minusIcon}
              onPress={toggleModal}
            />
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
        </Modal>
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  addNewAddressMain: {
    width: "100%",
    backgroundColor:"#fff"
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
    // width: "85%",
    borderWidth: 1,
    paddingHorizontal: 5,
    borderColor: "grey",
    borderRadius: 5,
    fontSize: 20,
    paddingVertical: 5,
  },
  searchContainer: {
    flex: 1,
    width: "100%",
  },
  serachModal: {
    width: "100%",
    marginTop: 200,
    marginHorizontal: 0,
    backgroundColor: "white",
    borderBottomEndRadius: 0,
    marginBottom: 0,
  },
  minusIcon: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 0,
  },
});
