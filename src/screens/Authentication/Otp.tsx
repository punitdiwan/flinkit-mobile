import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import OTPInputView from "rn-otp-textinput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getUserRelatedToMobile, removeOTPAfterValidation } from "../supabaseClient";
import { useMyContext } from "../../context/Context";


const Otp = (mobileNumber: any) => {
  const focus = useIsFocused();
  const navigation = useNavigation();
  const phone = mobileNumber.route.params.mobileNumber;

  const [userNumber,setUserNumber] = useState("");
  const [userEnterOtp,setUserEnterOtp] = useState("");
  const [userValidationOtp,setUserValidationOtp] = useState("");
  const [resendText,setResendText] = useState("Resend Code");
  const [user,setUser] = useState([]);

  const generateOTP = () => {

  }

  const handleOtpSubmit = async() => {
      if(userEnterOtp.length == 6){
        if(userEnterOtp == userValidationOtp){
          // const {mobile} = user
          await removeOTPAfterValidation(userNumber);
          AsyncStorage.setItem("isLoggedIn","true");
          AsyncStorage.setItem("userMobileNumber",userNumber);
          navigation.navigate("SelectLocation");
        }else{
          Alert.alert("Invalid","Invalid OTP")
        }
      }else{
        Alert.alert("Invalid","Please enter OTP")
      }
      
  }

  const getUserAndSetUser = async () => {
    const user = await getUserRelatedToMobile(userNumber);
    setUser(user);
    const {otp} = user[0];
    setUserValidationOtp(otp);
  
    if(user?.data > 0){
        const {otp} = user.data[0];
        console.log("userOTP",otp);
        
    }
  }

  useEffect(() => {
    getUserAndSetUser();
  },[userNumber])

  useEffect(() => {
    setUserNumber(phone);
  },[focus])

  return (
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

      <View style={{ marginLeft: 20, marginTop: 60 }}>
        <Text style={{ fontWeight: "500", fontSize: 26,fontFamily:"Gilroy-Semibold" }}>
          Enter your 6-digit code
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "rgb(124,124,124)",
            fontWeight: "500",
          }}
        >
          Code
        </Text>
      </View>

      <View style={styles.container}>
        <OTPInputView
          pinCount={6}
          inputFieldStyle={styles.inputFieldStyle}
          onCodeFilled={(code) => setUserEnterOtp(code)} // Call your function here
          secureTextEntry={false} // Set to true to hide the input characters for added security
        />
      </View>

      <View style={{paddingHorizontal:20}}>
      <Text style={{borderBottomWidth:2,width:"100%",borderBottomColor:"rgb(233,233,233)"}}></Text>
      </View>

      <TouchableOpacity style={{ marginTop: 40, marginLeft: 20 }} onPress={() => {
        setGenratedOtp(generateOtp());
        setUserEnterOtp("");
        }}>
        <Text style={{ color: "rgb(105,175,94)", fontWeight: "500" }}>
           Resend code
        </Text>
      </TouchableOpacity>

      {userValidationOtp && <Text>{userValidationOtp}</Text>}

      <View style={{ position: "absolute", right:50, bottom:40 }}>
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: "rgb(105,175,94)",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleOtpSubmit}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  input: {
    height: 50,
    width: 40,
    borderBottomWidth: 3,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 10,
  },
  inputFieldStyle: {
    borderBottomWidth: 4,
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    width: 30,
  },
});

export default Otp;






// AsyncStorage.setItem("isLoggedIn","true");
























// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// import React, { useEffect, useRef } from "react";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useMyContext } from "../../context/Context";
// import { AntDesign } from "@expo/vector-icons";
// import * as Font from "expo-font";
// import { supabase, verifyOtp } from "../supabaseClient";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type Props = {};
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Gilroy-Semibold": require("../../../assets/fonts/Gilroy-SemiBold.ttf"),
//     "Gilroy-Medium": require("../../../assets/fonts/Gilroy-Medium.ttf"),
//   });
// };

// const generateOtp = () => {
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   console.log("Otp", otp);
// };

// // generate otp
// const Otp = (MobileNumber: any) => {
//   console.log("MobileNumber", MobileNumber);

//   const [password, setpassword] = useState<any>("");

//   const navigation = useNavigation<any>();
//   const et1 = useRef<any>("");
//   const et2 = useRef<any>("");
//   const et3 = useRef<any>("");
//   const et4 = useRef<any>("");
//   const et5 = useRef<any>("");
//   const et6 = useRef<any>("");

//   const [fontLoaded, setFontLoaded] = useState(false);

//   const ValidateOtp = async (MobileNumber: any) => {
// const phone = MobileNumber.route.params.MobileNumber;
//     const token = "654321";

//     console.log("et1",et1);

//     const response = await supabase.auth.verifyOtp({
//       phone: phone,
//       token: token,
//       type: "sms",
//     });
//     console.log("Otp.tsx, response:", response);

//     // set data in async storage
//     AsyncStorage.setItem("isLoggedIn", "true");

//     // navigation.navigate("BottomNav");
//     navigation.navigate("SelectLocation");
//   };

//   useEffect(() => {
//     generateOtp();
//   }, []);

//   return (
//     <View style={styles.container}>
// <ImageBackground
//   source={require("../../../assets/loginbackground.png")}
//   style={{ height: "100%" }}
// >
// <View style={{ marginTop: 70, marginLeft: 20 }}>
//   <AntDesign
//     name="left"
//     size={24}
//     color="black"
//     onPress={() => navigation.replace("Login")}
//   />
// </View>
//         <Text style={styles.title}>Enter your 6-digit code</Text>
//         <Text
//           style={{
//             color: "#7C7C7C",
//             marginTop: 20,
//             marginHorizontal: 30,
//             // fontFamily: "Gilroy-Semibold",
//           }}
//         >
//           Code
//         </Text>
//         <View style={styles.otpView}>
//           <TextInput
//             ref={et1}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               console.log("txt",txt);

//               if (txt.length >= 1) {
//                 et2.current.focus();
//               }
//             }}
//           />
//           <TextInput
//             ref={et2}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               if (txt.length >= 1) {
//                 et3.current.focus();
//               } else if (txt.length < 1) {
//                 et1.current.focus();
//               }
//             }}
//           />
//           <TextInput
//             ref={et3}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               if (txt.length >= 1) {
//                 et4.current.focus();
//               } else if (txt.length < 1) {
//                 et2.current.focus();
//               }
//             }}
//           />
//           <TextInput
//             ref={et4}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               if (txt.length >= 1) {
//                 et5.current.focus();
//               } else if (txt.length < 1) {
//                 et3.current.focus();
//               }
//             }}
//           />
//           <TextInput
//             ref={et5}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               if (txt.length >= 1) {
//                 et6.current.focus();
//               } else if (txt.length < 1) {
//                 et4.current.focus();
//               }
//             }}
//           />
//           <TextInput
//             ref={et6}
//             style={styles.inputView}
//             keyboardType="phone-pad"
//             maxLength={1}
//             onChangeText={(txt) => {
//               if (txt.length < 1) {
//                 et5.current.focus();
//               }
//             }}
//           />
//           {/* <TextInput onChangeText={(e) => setpassword(e.target.value)} /> */}
//         </View>
//         <View style={{ width: "100%", marginTop: 30, marginLeft: 33 }}>
//           <Text style={{ color: "#69AF5D" }}>Resend code</Text>
//         </View>
//         <View
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 300,
//             marginLeft: 120,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               ValidateOtp(MobileNumber);
//             }}
//             style={styles.otpBtn}
//           >
//             <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}>
// <AntDesign name="right" size={24} color="white" />
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default Otp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
    // fontSize: 26,
    // fontWeight: "500",
    // marginTop: 100,
    // alignSelf: "flex-start",
    // marginLeft: 30,
    // color: "#000",
//     // fontFamily: "Gilroy-Semibold",
//   },
//   otpView: {
//     width: "100%",
//     justifyContent: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     gap: 20,
//   },

//   inputView: {
//     width: 30,
//     height: 40,
//     // borderWidth: 0.5,
//     borderBottomWidth: 4,
//     // borderRadius: 10,
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   otpBtn: {
//     width: 65,
//     height: 65,
//     backgroundColor: "#69AF5D",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 100,
//     marginRight: 20,
//   },
// });