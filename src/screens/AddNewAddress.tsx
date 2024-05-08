import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";

import Modal from "react-native-modal";
import React, { useState } from "react";
const AddNewAddressBtn = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [homeAddress, setHomeAddress] = useState(true);
  const [officeAddress, setOfficeAddress] = useState(false);
  const [otherAddress, setOtherAddress] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const addressMenu = (value: string) => {
    if (value === "home") {
      setHomeAddress(true);
      setOfficeAddress(false);
      setOtherAddress(false);
    } else if (value === "office") {
      setOfficeAddress(true);
      setHomeAddress(false);
      setOtherAddress(false);
    } else {
      setHomeAddress(false);
      setOfficeAddress(false);
      setOtherAddress(true);
    }
  };
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.btnContainer}>
          <Text style={styles.btnText} onPress={toggleModal}>
            Add new address
          </Text>
        </View>
      </TouchableOpacity>
      {isModalVisible ? (
        <View style={{ width: "100%" }}>
          <Button title="Show modal" />

          <Modal
            isVisible={isModalVisible}
            animationIn="fadeInUp"
            style={styles.modal}
            swipeDirection="down"
            onSwipeCancel={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{
                width: "100%",
                height: "80%",
                backgroundColor: "white",
                display: "flex",
                marginTop: 400,
              }}
            >
              {/* style={styles.homebtnTouchable} */}
              <View style={styles.btnContainer2}>
                <TouchableOpacity
                  onPress={() => addressMenu("home")}
                  style={homeAddress ? styles.activebtn : styles.homeBtn}
                >
                  <Text
                    style={
                      homeAddress
                        ? styles.addressBtnText
                        : styles.addressBtnText2
                    }
                  >
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => addressMenu("office")}
                  style={officeAddress ? styles.activebtn : styles.homeBtn}
                >
                  <Text
                    style={
                      officeAddress
                        ? styles.addressBtnText
                        : styles.addressBtnText2
                    }
                  >
                    Office
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => addressMenu("other")}
                  style={otherAddress ? styles.activebtn : styles.homeBtn}
                >
                  <Text
                    style={
                      otherAddress
                        ? styles.addressBtnText
                        : styles.addressBtnText2
                    }
                  >
                    Other
                  </Text>
                </TouchableOpacity>
                {/* <Button title="Other" /> */}
              </View>
              {homeAddress ? (
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Receiver Name"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Complete Address"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Floor (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Landmark (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Phone (optional)"
                    style={styles.input1}
                  />
                  <Text style={styles.savtBtn}>Save Address</Text>
                </TouchableOpacity>
              ) : null}

              {/* Office Address */}
              {officeAddress ? (
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Receiver Name"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Complete Address"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Floor (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Landmark (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Phone (optional)"
                    style={styles.input1}
                  />
                  <Text style={styles.savtBtn}>Save Address</Text>
                </TouchableOpacity>
              ) : null}
              {/* Other Address */}
              {otherAddress ? (
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput placeholder="Type" style={styles.input1} />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Receiver Name"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Complete Address"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Floor (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Landmark (optional)"
                    style={styles.input1}
                  />
                  <TextInput
                    selectionColor={"green"}
                    placeholder="Phone (optional)"
                    style={styles.input1}
                  />
                  <Text style={styles.savtBtn}>Save Address</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

export default AddNewAddressBtn;
const styles = StyleSheet.create({
  btnContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    height: 60,

    display: "flex",

    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -120,
  },
  btnText: {
    width: "96%",
    marginHorizontal: "2%",
    paddingVertical: 10,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
  },
  btnContainer2: {
    width: "100%",

    // borderWidth: 1,
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  homebtnTouchable: {
    width: "25%",
    // borderWidth: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeBtn: {
    width: "20%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "green",
  },
  activebtn: {
    width: "20%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  addressBtnText: {
    color: "white",
  },
  addressBtnText2: {
    color: "green",
  },
  modal: {
    width: "100%",
    marginHorizontal: 0,
    display: "flex",
    marginBottom: 0,
    
  },
  inputContainer: {
    width: "100%",

    // borderWidth: 1,
    display: "flex",
    justifyContent: "space-around",
    height: 390,
  },
  input1: {
    width: "90%",
    marginHorizontal: "5%",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "green",
    paddingHorizontal: 10,
  },
  savtBtn: {
    width: "90%",
    marginHorizontal: "5%",
    paddingVertical: 6,
    backgroundColor: "green",
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
  },
});
