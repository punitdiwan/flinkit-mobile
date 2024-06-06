import React,{ useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
      'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
      'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
      'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf')
    });

};

const Orderaccepted = ({ navigation }) => {
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
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/loginbackground.png')} resizeMode="cover" style={{height:'100%',width:'100%'}} >
      <View style={{ marginTop: 60, marginLeft: 20,zIndex:1 }}>
        
      </View>
      <Image
        style={styles.image}
        source={require('../../../flinkit-mobile/assets/done.png')}
      />
      <Text style={styles.text}>Your Order have been accepted.</Text>
      <Text style={{fontSize:16,textAlign:'center',width:'80%',color:'#7C7C7C',marginLeft:33,fontFamily:'Gilroy-Bold',}}>
        Your item has been placed and is on it's way to being processed.</Text>
    

      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 70, marginLeft: 20, }}>
        <TouchableOpacity onPress={() => navigation.replace("ErrorCard")} style={styles.otpBtn}>
          <Text style={{ color: '#ffffff', fontSize: 18,fontFamily:'Gilroy-Bold', fontWeight: '600' }}>error card</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, marginLeft: 20, }}>
        <TouchableOpacity onPress={() => navigation.replace("Signin")} style={styles.otpBtn}>
          <Text style={{ color: '#000000', fontSize: 18,fontFamily:'Gilroy-Bold', fontWeight: '600' }}>Back To Home</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    marginLeft:60
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
    textAlign:'center',
    fontFamily:'Gilroy-Bold',
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
    marginBottom: 5
  },
});

export default Orderaccepted;