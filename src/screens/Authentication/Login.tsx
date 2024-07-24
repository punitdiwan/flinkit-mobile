import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { channel, checkAutomatically } from "expo-updates";
import {
  getuserbyphone,
  signUpUser,
  setConfirmation,
  verifyOtp,
  supabase,
  checkUserExistingOrCreatingNewUser,
} from "../supabaseClient";

import * as SplashScreen  from 'expo-splash-screen';
import * as Font from 'expo-font';

type Props = {};


const Login = (props: Props) => {
  const navigation = useNavigation<any>();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  // console.log("MobileNumber",mobileNumber);

  // generateOTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP',otp);
    return otp;
    
  }

  const handleLogin = async () => {
    if(mobileNumber.length == 10){
      const otp = generateOTP();
      if(otp){
        await checkUserExistingOrCreatingNewUser(mobileNumber,otp);
        navigation.replace("Otp", {mobileNumber});
      }
    }else{
      Alert.alert("Please enter valid mobile number");
    }
  }
  

 


  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gilroy-Semibold': require('../../../assets/fonts/Gilroy-SemiBold.ttf'),
        'Gilroy-Medium': require('../../../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('../../../assets/fonts/Gilroy-Bold.ttf'),
      });
      // Font loading is completed, hide SplashScreen
      SplashScreen.hide();
    }

    // Load fonts and hide SplashScreen when fonts are loaded
    loadFonts();
  }, []); 


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

        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "500",
              width: "90%",
              marginLeft: 20,
              color: "#000000",
              fontFamily: "Gilroy-Semibold",
            }}
          >
            Enter your mobile number
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#7C7C7C",
              marginLeft: 20,
              fontFamily: "Gilroy-Semibold",
            }}
          >
            Mobile Number
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
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
              paddingVertical: 5,
            }}
          >
            <Image
              source={require("../../../assets/india.png")}
              style={{ width: 34, height: 24 }}
            />
            <Text style={{ fontSize: 25 }}>+91</Text>
            <TextInput
              style={{ width: "75%", fontSize: 25 }}
              value={mobileNumber}
              maxLength={10}
              keyboardType="phone-pad"
              onChangeText={setMobileNumber}
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: 350,
          }}
        >
          <TouchableOpacity style={styles.otpBtn} onPress={handleLogin}>
            <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}>
              <AntDesign name="right" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

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
    fontSize: 25,
    marginLeft: 20,
    width: "100%",
    height: 100,
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





// const apikey = "";
// const handleLogin = async () => {
//   const apiUrl = "https://admin.delivery.launchmysite.in/api/setConfirmation";

//   if (MobileNumber.length == 10) {
//     // const response = await fetch(apiUrl, {
//     //   method: "POST",
//     //   headers: {
//     //     Apikey: apikey,
//     //   },
//     //   body: JSON.stringify({
//     //     phone_number: MobileNumber,
//     //     code: "654321",
//     //   }),
//     // });
//     // const data = await response.json();
//     // console.log(data);
//     // ------------------------------------------------------

//     const response = await supabase.rpc("set_confirmation", {
//       phone_number: MobileNumber,
//       code: "654321",
//     });
//     console.log("Login.tsx, response:", response);
     
//     const otp = generateOTP();
//     checkUserExistingOrCreatingNewUser(MobileNumber);

//     navigation.replace("Otp", { MobileNumber });

//     // ---------------------------------------------------------
//     // const resp = await supabase.auth.admin.createUser({
//     //   phone: MobileNumber,
//     //   phone_confirm: true,
//     // });
//     // console.log("resp", resp);
//     // navigation.replace("Otp", { MobileNumber });
//   }
// };