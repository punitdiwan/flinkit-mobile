import React,{useEffect, useLayoutEffect, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
// import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';


const image = { url: 'C:/Users/HP/Desktop/Madhukant/flinkit-mobile/assets/homeImage.png' };



  const loadFonts = async () => {
    await Font.loadAsync({
        'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
      });

  };
const Onboarding = () => {
    const navigation = useNavigation<any>();
    // const [fontLoaded, setFontLoaded] = useState(false);

    // if (!fontLoaded) {
    //     return (
    //       <AppLoading
    //         startAsync={loadFonts}
    //         onFinish={() => setFontLoaded(true)}
    //         onError={console.warn}
    //       />
    //     );
    //   }

    const checkIsLoggedIn = async () => {
       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
       console.log("isLoggedInState",isLoggedIn);
       if(isLoggedIn === "true"){
          navigation.navigate("BottomNav");
       }else{
        navigation.navigate("Onboarding");
       }
    }

    useEffect(() => {
        checkIsLoggedIn();
    },[])

    // useLayoutEffect(() => {
    //     checkIsLoggedIn();
    // },[])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"black"}/>
            <ImageBackground source={require("../../assets/homeImage.png")} resizeMode="cover" style={styles.image}>
                <LinearGradient colors={['#0A40', '#0A4500', '#0A4500']}style={ styles.containerStyle}>

                    <View style={{justifyContent:"center",flexDirection:"row",alignItems:"center"}}>
                    <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"auto"}}>
                        <Text style={{textAlign:"center",color:"white",fontSize:50,fontFamily:"Gilroy-Semibold"}}>Welcome{"\n"}to Santheyyy</Text>
                    </View>
                    </View>

                    <View style={{ width:'100%', marginBottom:65}}>
                        <View style={{width:"100%",height:23}}>
                        <Text style={{ color: '#AAAAAA', fontSize: 16,fontFamily:'Gilroy-Semibold',textAlign:"center",fontWeight:"bold"}}>
                            Get your groceries in as fast as 15 mins
                        </Text>
                        </View>
                    </View>
                  
                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginLeft: 20, }}>
                        <TouchableOpacity onPress={() => navigation.replace("Signin")} style={styles.otpBtn}>
                            <Text style={{ color: '#ffffff', fontSize:18, fontWeight:"bold",fontFamily:'Gilroy-Semibold' }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 48,
        lineHeight: 50,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80,
        marginBottom:10,
        fontFamily:'Gilroy-Semibold'

    },
    otpBtn: {
        width: 353,
        height: 68,
        backgroundColor: "rgb(105,175,94)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 37,
        marginBottom:700,
        elevation:10
    },
    containerStyle :{
        backgroundColor: 'linear-gradient(to bottom, rgb((8,56,1)), rgb((10,69,0))), url(${backgroundImage})', // rgba(144, 238, 144, 0.7) is light green
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        color: 'white', // Ensure text is readable on the gradient background
        marginTop:700
    }

});

export default Onboarding; 