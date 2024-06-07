import React,{useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { addData, deleteParticulerData, editParticular, editParticularData, showAllData } from './supabaseClient';


const image = { url: 'C:/Users/HP/Desktop/Madhukant/flinkit-mobile/assets/homeImage.png' };



  const loadFonts = async () => {
    await Font.loadAsync({
        'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
      });

  };
const Onboarding = () => {
    const navigation = useNavigation<any>();
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
      
      const addDataToBackend =async () => {
                // const res= await addData();
                // const res = await showAllData();
                // const res = await deleteParticulerData();
                const res = await editParticularData();
                console.log("res",res)
;      }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/homeImage.png")} resizeMode="cover" style={styles.image}>
                <LinearGradient colors={['#0A40', '#0A4500', '#0A4500']}style={ styles.containerStyle}>
                    <View>
                        <Text style={[styles.text]}>Welcome            to Santheyyy</Text>
                    </View>
                    <View style={{ width:'100%', marginBottom:65, marginLeft: 50, }}>
                        <Text style={{ color: '#FCFCFC', fontSize: 15,fontFamily:'Gilroy-Semibold' }}>
                            Get your groceries in as fast as 15 mins
                        </Text>
                    </View>
                  
                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginLeft: 20, }}>
                        <TouchableOpacity onPress={() => navigation.replace("Signin")} style={styles.otpBtn}>
                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '600',fontFamily:'Gilroy-Semibold' }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, marginLeft: 20, }}>
                        <TouchableOpacity onPress={() => addDataToBackend()} style={styles.otpBtn}>
                            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '600',fontFamily:'Gilroy-Semibold' }}>Add Data</Text>
                        </TouchableOpacity>
                    </View> */}
                    
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
        width: 300,
        height: 65,
        backgroundColor: "#69AF5D",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 37,
        marginBottom:950
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