import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    
  } from "react-native";
  import React from "react";
  import {useState} from "react";
  import { useNavigation } from "@react-navigation/native";
  import { FontAwesome } from '@expo/vector-icons';
  import { AntDesign } from '@expo/vector-icons';
  import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
  
  const Signin = () => {
    const navigation = useNavigation<any>();
    const loadFonts = async () => {
      await Font.loadAsync({
          'Gilroy-Semibold': require('../../../assets/fonts/Gilroy-SemiBold.ttf'),
        });
  
    };
    
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
      <View>
        <ImageBackground
          source={require("../../../assets/Masksignin.png")}
          resizeMode="cover"
          style={{ height: 395 }}
        ></ImageBackground>
        <Text style={{ width: 250, fontSize: 25,marginLeft:20,fontFamily:'Gilroy-Semibold' }}>
          Get your groceries with necter
        </Text>
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
          <TouchableOpacity
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
            onPress={()=>navigation.replace('Login')}
          >
            <Image
              source={require("../../../assets/india.png")}
              style={{ width: 34, height: 24 }}
            />
            <Text style={{ fontSize: 25 }}>+91</Text>
            
          </TouchableOpacity>
        </View>
  
        {/* <View
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
            onPress={()=>navigation.replace('Signup')}
            style={[styles.otpBtn,{display:'flex',justifyContent:'center',alignItems:'center',gap:30,flexDirection:'row'}]}
          >
              <AntDesign name="google" size={24} color="white" />
            <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "600" }}>
            Continue with Google
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            onPress={()=>navigation.replace('Maillogin')}
            style={[styles.otpBtn,{backgroundColor:'#4A66AC',display:'flex',justifyContent:'center',alignItems:'center',gap:30,flexDirection:'row'}]}
          >
            <FontAwesome name="facebook" size={24} color="white" />
            <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "600", }}>
              Continue with facebook
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };
  
  export default Signin;
  
  const styles = StyleSheet.create({
    otpBtn: {
      width: 300,
      height: 65,
      backgroundColor: "#5383EC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 37,
    },
  });
  