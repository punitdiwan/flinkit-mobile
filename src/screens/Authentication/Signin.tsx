// import {
//     StyleSheet,
//     Text,
//     View,
//     ImageBackground,
//     Image,
//     TouchableOpacity,
//     TextInput,
//     StatusBar,
    
//   } from "react-native";
//   import React, { useEffect } from "react";
//   import {useState} from "react";
//   import { useNavigation } from "@react-navigation/native";
//   import { FontAwesome } from '@expo/vector-icons';
//   import { AntDesign } from '@expo/vector-icons';
  
//   import * as SplashScreen  from 'expo-splash-screen';
// import * as Font from 'expo-font';
  
//   const Signin = () => {
//     const navigation = useNavigation<any>();

//     useEffect(() => {
//       async function loadFonts() {
//         await Font.loadAsync({
//           'Gilroy-Semibold': require('../../../assets/fonts/Gilroy-SemiBold.ttf'),
//           'Gilroy-Medium': require('../../../assets/fonts/Gilroy-Medium.ttf'),
//           'Gilroy-Bold': require('../../../assets/fonts/Gilroy-Bold.ttf'),
//         });
//         // Font loading is completed, hide SplashScreen
//         SplashScreen.hide();
//       }
  
//       // Load fonts and hide SplashScreen when fonts are loaded
//       loadFonts();
//     }, []); 


//     return (
//       <>
//       <View>
//         <ImageBackground
//           source={require("../../../assets/Masksignin.png")}
//           resizeMode="cover"
//           style={{width:"100%",height:400}}
//         ></ImageBackground>
//         <Text style={{ width: 250, fontSize: 25,marginLeft:20,marginBottom:15,fontFamily:"Gilroy-Semibold"}}>
//           Get your groceries with Santheyyy
//         </Text>
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
//           <TouchableOpacity
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
//             onPress={()=>navigation.replace('Login')}
//           >
//             <Image
//               source={require("../../../assets/india.png")}
//               style={{ width: 34, height: 24 }}
//             />
//             <Text style={{ fontSize: 25 }}>+91</Text>
            
//           </TouchableOpacity>
//         </View>
//       </View>
//       </>
//     );
//   };
  
//   export default Signin;
  
//   const styles = StyleSheet.create({
//     otpBtn: {
//       width: 300,
//       height: 65,
//       backgroundColor: "#5383EC",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: 20,
//       marginRight: 37,
//     },
//   });

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Signin = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
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
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ImageBackground
        source={require('../../../assets/Masksignin.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Get your groceries with Santheyyy</Text>
      <View style={styles.phoneContainer}>
        <TouchableOpacity
          style={styles.phoneButton}
          onPress={() => navigation.replace('Login')}
        >
          <Image
            source={require('../../../assets/india.png')}
            style={styles.countryFlag}
          />
          <Text style={styles.countryCode}>+91</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: height * 0.4, // Responsive height (40% of screen height)
    marginBottom: 20,
  },
  title: {
    fontSize: width * 0.07, // Responsive font size (7% of screen width)
    marginBottom: 15,
    fontFamily: 'Gilroy-Semibold',
    textAlign: 'center',
  },
  phoneContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneButton: {
    width: '90%', // Responsive width
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  countryFlag: {
    width: 34,
    height: 24,
  },
  countryCode: {
    fontSize: width * 0.06, // Responsive font size (6% of screen width)
  },
});

export default Signin;

  