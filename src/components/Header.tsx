import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Icon2 from "react-native-vector-icons/Fontisto";
// import Icon from "react-native-vector-icons/Fontisto";
import Icon from "@expo/vector-icons/FontAwesome";
import Icon2 from "@expo/vector-icons/Fontisto";
import Carousel from "./Carousel";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { LinearGradient } from "expo-linear-gradient";
import Carousel2 from "./Carousel2";
// import { Font } from 'expo'

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};
const Header = ({ navigation, route }: HomeProps) => {
  // const Navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  // const img = {
  //   uri: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // };
  const [fontLoaded, setFontLoaded] = useState(false);
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
    <SafeAreaView>
      <View style={styles.header}>
        <LinearGradient
          colors={["#69AF5D", "#4B933F"]}
          style={{ borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}
        >
          <ScrollView>
            <View style={styles.main}>
              <View>
                <Text
                  style={[
                    styles.headerText,
                    { fontSize: 14, fontFamily: "Gilroy-Bold" },
                  ]}
                >
                  Delivery in
                </Text>
                <Text
                  style={[
                    styles.headerText,
                    { fontSize: 26, fontFamily: "Gilroy-Bold" },
                  ]}
                >
                  10 minutes
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        fontSize: 14,
                        marginTop: 10,
                        fontFamily: "Gilroy",
                        color: "white",
                      },
                    ]}
                    onPress={() => setModalVisible(true)}
                  >
                    Home - Vijay Nagar, Lalghati, Bhopal-462030{" "}
                    <Icon
                      name="chevron-down"
                      size={15}
                      color="#ffffff"
                      onPress={() => setModalVisible(true)}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", { userId: "123" })
                  }
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#ffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: "#000000",
                    padding: 10,
                  }}
                >
                  <Text>
                    <Icon name="user" size={30} color="#000000" />
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
              style={{
                backgroundColor: "white",
                margin: 20,
                borderRadius: 15,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 20,
                  padding: 12,
                }}
              >
                <View>
                  <Icon name="search" size={20} color="gray" />
                </View>
                <View>
                  <Text style={{ color: "#0000004d", fontSize: 17 }}>
                    Search store
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
        <Carousel />
        {modalVisible ? (
          <View style={styles.addressParent}>
            <View>
              <TouchableOpacity>
                <Icon2
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  name="minus-a"
                  size={40}
                  color="rgba(0, 0, 0, 0.459)"
                  style={styles.minusIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.selectAddressMainContainer}>
              <Text style={styles.addressText}>Select Address</Text>
              <Text style={styles.noAddressText}>No address available</Text>

              <View style={styles.addressBtnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddAddress");
                  }}
                >
                  <View style={styles.addressBtnContainerText}>
                    <Text style={styles.addressText2}>Add new address</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "auto",
  },
  main: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  headerText: {
    color: "white",
  },

  //   Bottom Popup
  addressParent: {
    width: "100%",
    height: "85%",
  },
  minusIcon: {
    textAlign: "center",
  },
  addressBtnContainer: {
    width: "100%",

    backgroundColor: "lightgrey",

    height: 60,
    display: "flex",
    paddingHorizontal: "2%",

    justifyContent: "center",
  },
  selectAddressMainContainer: {
    width: "100%",
    paddingHorizontal: "2%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    height: 80,
  },
  addressText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  noAddressText: {
    textAlign: "center",
    fontSize: 12,
  },
  addressBtnContainerText: {
    borderRadius: 5,

    width: "98%",
    marginHorizontal: "1%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  addressText2: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
function componentDidMount() {
  throw new Error("Function not implemented.");
}
