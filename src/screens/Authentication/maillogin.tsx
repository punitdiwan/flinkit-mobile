import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

type Props = {};

const Maillogin = (props: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/loginbackground.png")}
        resizeMode="cover"
        style={{ height: "100%" }}
      >
        <View style={{ marginTop: 70, marginLeft: 20, zIndex: 1 }}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            style={{ width: 40 }}
            onPress={() => navigation.replace("Signin")}
          />
        </View>

        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "500",
              width: "70%",
              marginLeft: 20,
              color: "#000000",
            }}
          >
            Loging
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              width: "70%",
              marginLeft: 20,
              color: "#000000",
            }}
          >
            enter your email and password
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 15, color: "#7C7C7C", marginLeft: 20 }}>
            Email
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 2,
          }}
        >
          <View
            style={{
              width: "90%",
              borderBottomWidth: 1,
              borderBottomColor: "#E2E2E2",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontSize: 25 }}></Text>
            <TextInput
              style={{ width: "75%", fontSize: 15 }}
              maxLength={20}
              keyboardType="email-address"
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, color: "#7C7C7C", marginRight: 250 }}>
              Password
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              borderBottomWidth: 1,
              borderBottomColor: "#E2E2E2",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 25 }}></Text>
            <TextInput
              style={{ width: "75%", fontSize: 15 }}
              maxLength={20}
              keyboardType="hidden-password"
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15, color: "#7C7C7C", marginLeft: 200 }}>
              Forgot password ?
            </Text>
            <TextInput
              style={{ width: "75%", fontSize: 25 }}
              maxLength={15}
              keyboardType="visible-password"
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.otpBtn}
          >
            <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 15, color: "#7C7C7C", marginLeft: 70 }}>
            Don't have an account?{" "}
            <Text style={{ color: "#69AF5D" }}>Sign Up</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Maillogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    // backgroundColor: '#ffffff',
    marginTop: 350,
    fontSize: 20,
    marginLeft: 20,
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
    width: "70%",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff",
    marginRight: 40,
    width: "100%",
    gap: 10,
    borderRadius: 100,
    borderBottomWidth: 0.5,
  },
  otpBtn: {
    width: 300,
    height: 65,
    backgroundColor: "#69AF5D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 35,
  },
});
