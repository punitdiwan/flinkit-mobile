// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ImageBackground,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import * as React from "react";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";
// import { channel, checkAutomatically } from "expo-updates";
// import {
//   getuserbyphone,
//   signUpUser,
//   setConfirmation,
//   verifyOtp,
//   supabase,
//   checkUserExistingOrCreatingNewUser,
// } from "../supabaseClient";

// import * as SplashScreen  from 'expo-splash-screen';
// import * as Font from 'expo-font';

// type Props = {};


// const Login = (props: Props) => {
//   const navigation = useNavigation<any>();
//   const [fontLoaded, setFontLoaded] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState("");
//   // console.log("MobileNumber",mobileNumber);

//   // generateOTP
//   const generateOTP = () => {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     console.log('OTP',otp);
//     return otp;
    
//   }

//   const handleLogin = async () => {
//     if(mobileNumber.length == 10){
//       const otp = generateOTP();
//       if(otp){
//         await checkUserExistingOrCreatingNewUser(mobileNumber,otp);
//         navigation.replace("Otp", {mobileNumber});
//       }
//     }else{
//       Alert.alert("Please enter valid mobile number");
//     }
//   }
  

 


//   React.useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         'Gilroy-Semibold': require('../../../assets/fonts/Gilroy-SemiBold.ttf'),
//         'Gilroy-Medium': require('../../../assets/fonts/Gilroy-Medium.ttf'),
//         'Gilroy-Bold': require('../../../assets/fonts/Gilroy-Bold.ttf'),
//       });
//       // Font loading is completed, hide SplashScreen
//       SplashScreen.hide();
//     }

//     // Load fonts and hide SplashScreen when fonts are loaded
//     loadFonts();
//   }, []); 


//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require("../../../assets/loginbackground.png")}
//         resizeMode="cover"
//         style={{ height: "100%" }}
//       >
//         <View style={{ marginTop: 70, marginLeft: 20, zIndex: 1 }}>
//           <AntDesign
//             name="left"
//             size={24}
//             color="black"
//             style={{ width: 40 }}
//             onPress={() => navigation.replace("Signin")}
//           />
//         </View>

//         <View style={{ marginTop: 50 }}>
//           <Text
//             style={{
//               fontSize: 26,
//               fontWeight: "500",
//               width: "90%",
//               marginLeft: 20,
//               color: "#000000",
//               fontFamily: "Gilroy-Semibold",
//             }}
//           >
//             Enter your mobile number
//           </Text>
//         </View>

//         <View style={{ marginTop: 30 }}>
//           <Text
//             style={{
//               fontSize: 16,
//               color: "#7C7C7C",
//               marginLeft: 20,
//               fontFamily: "Gilroy-Semibold",
//             }}
//           >
//             Mobile Number
//           </Text>
//         </View>
//         <View
//           style={{
//             width: "100%",
//             height: "auto",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginVertical: 10,
//           }}
//         >
//           <View
//             style={{
//               width: "90%",
//               borderBottomWidth: 1,
//               borderBottomColor: "#E2E2E2",
//               display: "flex",
//               flexDirection: "row",
//               gap: 10,
//               alignItems: "center",
//               paddingVertical: 5,
//             }}
//           >
//             <Image
//               source={require("../../../assets/india.png")}
//               style={{ width: 34, height: 24 }}
//             />
//             <Text style={{ fontSize: 25 }}>+91</Text>
//             <TextInput
//               style={{ width: "75%", fontSize: 25 }}
//               value={mobileNumber}
//               maxLength={10}
//               keyboardType="phone-pad"
//               onChangeText={setMobileNumber}
//             />
//           </View>
//         </View>
//         <View
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             justifyContent: "center",
//             marginTop: 350,
//           }}
//         >
//           <TouchableOpacity style={styles.otpBtn} onPress={handleLogin}>
//             <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "600" }}>
//               <AntDesign name="right" size={24} color="white" />
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   text: {
//     // backgroundColor: '#ffffff',
//     marginTop: 350,
//     fontSize: 25,
//     marginLeft: 20,
//     width: "100%",
//     height: 100,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     // borderWidth: 1,
//     padding: 10,
//     width: "70%",
//   },
//   inputBox: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "#ffffff",
//     marginRight: 40,
//     width: "100%",
//     gap: 10,
//     borderRadius: 100,
//     borderBottomWidth: 0.5,
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

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { checkUserExistingOrCreatingNewUser } from '../supabaseClient';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation<any>();
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState('');

  // Function to generate OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP', otp);
    return otp.toString(); // Ensure OTP is returned as string
  }

  // Handle login button press
  const handleLogin = async () => {
    if (mobileNumber.length === 10) {
      const otp = generateOTP();
      if (otp) {
        await checkUserExistingOrCreatingNewUser(mobileNumber, otp);
        navigation.replace('Otp', { mobileNumber });
      }
    } else {
      Alert.alert('Please enter a valid 10-digit mobile number');
    }
  }

  // Load fonts and hide SplashScreen when fonts are loaded
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gilroy-Semibold': require('../../../assets/fonts/Gilroy-SemiBold.ttf'),
        'Gilroy-Medium': require('../../../assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('../../../assets/fonts/Gilroy-Bold.ttf'),
      });
      SplashScreen.hide();
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/loginbackground.png')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.headerContainer}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            style={styles.backButton}
            onPress={() => navigation.replace('Signin')}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter your mobile number</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Mobile Number</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <Image
              source={require('../../../assets/india.png')}
              style={styles.countryIcon}
            />
            <Text style={styles.countryCode}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            maxLength={10}
            keyboardType="phone-pad"
            onChangeText={setMobileNumber}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <AntDesign name="right" size={24} color="white" />
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
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top
    height: '100%',
    paddingTop: height * 0.05, // Add padding at the top for better alignment
  },
  headerContainer: {
    marginLeft: width * 0.05,
    zIndex: 1,
  },
  backButton: {
    width: 40,
  },
  titleContainer: {
    marginTop: height * 0.03,
    marginLeft: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '500',
    width: '90%',
    color: '#000000',
    fontFamily: 'Gilroy-Semibold',
  },
  subtitleContainer: {
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#7C7C7C',
    fontFamily: 'Gilroy-Semibold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    gap: 10,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: height * 0.01,
  },
  countryIcon: {
    width: width * 0.1,
    height: height * 0.03,
  },
  countryCode: {
    fontSize: width * 0.05,
  },
  input: {
    flex: 1,
    fontSize: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: height * 0.01,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: height * 0.05, // Adjusted margin top for button container
    paddingRight: width * 0.05,
  },
  button: {
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: '#69AF5D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: height * 0.12,
  },
});

