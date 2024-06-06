import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMyContext } from "../../context/Context";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { supabase, verifyOtp } from "../supabaseClient";

type Props = {};
const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../../../assets/fonts/Gilroy-Medium.ttf"),
  });
};
// (props: Props, data: any)
// (MobileNumber: string, data: any)
const Otp = (MobileNumber: any) => {
  console.log("MobileNumber", MobileNumber);

  const [password, setpassword] = useState<any>("");

  const navigation = useNavigation<any>();
  const et1 = useRef<any>("");
  const et2 = useRef<any>("");
  const et3 = useRef<any>("");
  const et4 = useRef<any>("");
  const et5 = useRef<any>("");
  const et6 = useRef<any>("");

  const [fontLoaded, setFontLoaded] = useState(false);

  const ValidateOtp = async (MobileNumber: any) => {
    const phone = MobileNumber.route.params.MobileNumber;
    console.log("vv", MobileNumber.route.params.MobileNumber);
    const token = "654321";

    const response = await supabase.auth.verifyOtp({
      phone: phone,
      token: token,
      type: "sms",
    });
    console.log("Otp.tsx, response:", response);

    navigation.navigate("BottomNav");
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // const { loginToggle } = useMyContext();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/loginbackground.png")}
        style={{ height: "100%" }}
      >
        <View style={{ marginTop: 70, marginLeft: 20 }}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => navigation.replace("Login")}
          />
        </View>
        <Text style={styles.title}>Enter your 6-digit code</Text>
        <Text
          style={{
            color: "#7C7C7C",
            marginTop: 20,
            marginHorizontal: 30,
            fontFamily: "Gilroy-Semibold",
          }}
        >
          Code
        </Text>
        <View style={styles.otpView}>
          <TextInput
            ref={et1}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et2}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                et3.current.focus();
              } else if (txt.length < 1) {
                et1.current.focus();
              }
            }}
          />
          <TextInput
            ref={et3}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                et4.current.focus();
              } else if (txt.length < 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et4}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                et5.current.focus();
              } else if (txt.length < 1) {
                et3.current.focus();
              }
            }}
          />
          <TextInput
            ref={et5}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                et6.current.focus();
              } else if (txt.length < 1) {
                et4.current.focus();
              }
            }}
          />
          <TextInput
            ref={et6}
            style={styles.inputView}
            keyboardType="phone-pad"
            maxLength={1}
            onChangeText={(txt) => {
              if (txt.length < 1) {
                et5.current.focus();
              }
            }}
          />
          {/* <TextInput onChangeText={(e) => setpassword(e.target.value)} /> */}
        </View>
        <View style={{ width: "100%", marginTop: 30, marginLeft: 33 }}>
          <Text style={{ color: "#69AF5D", fontFamily: "Gilroy-Medium" }}>
            Resend code
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 300,
            marginLeft: 120,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              ValidateOtp(MobileNumber);
            }}
            style={styles.otpBtn}
          >
            <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}>
              <AntDesign name="right" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginTop: 100,
    alignSelf: "flex-start",
    marginLeft: 30,
    color: "#000",
    fontFamily: "Gilroy-Semibold",
  },
  otpView: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 20,
  },

  inputView: {
    width: 30,
    height: 40,
    // borderWidth: 0.5,
    borderBottomWidth: 4,
    // borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  otpBtn: {
    width: 65,
    height: 65,
    backgroundColor: "#69AF5D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginRight: 20,
  },
});
