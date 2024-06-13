import React,{ useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
// import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
      'Gilroy-Semibold': require('../../assets/fonts/Gilroy-SemiBold.ttf'),
      'Gilroy-Medium': require('../../assets/fonts/Gilroy-Medium.ttf'),
      'Gilroy-Bold': require('../../assets/fonts/Gilroy-Bold.ttf')
    });

};
const ErrorCard = ({message, navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

    // if (!fontLoaded) {
    //     return (
    //       <AppLoading
    //         startAsync={loadFonts}
    //         onFinish={() => setFontLoaded(true)}
    //         onError={console.warn}
    //       />
    //     );
    //   }
  return (
    <View style={styles.container}>
        <View style={{ marginRight:300,zIndex:1 }}>
      <Entypo name="cross" size={26} color="black" 
      onPress={() => navigation.replace("Profile")}/></View>
      <Image source={require('../../assets/error.png')} style={styles.image} />

     
      <Text style={styles.message}>{message} Oops! Order Failed</Text>
        <Text style={{fontSize:16, marginBottom:20,fontFamily:'Gilroy-Medium'}}>Something went terribly wrong.</Text>
      
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, marginLeft: 20, }}>
        <TouchableOpacity onPress={() => navigation.replace("Productdetail")} style={styles.otpBtn}>
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '600',fontFamily:'Gilroy-Semibold'}}>Please Try Again</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1, marginLeft: 20, }}>
        <TouchableOpacity onPress={() => navigation.replace("Onboarding")} style={styles.otpBtn}>
          <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600',fontFamily:'Gilroy-Semibold' }}>Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 222,
    height: 222,
    marginBottom: 50,
    marginTop: 20
  },
  message: {
    fontSize: 28,
    marginBottom: 15,
    textAlign: 'center',
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
    marginBottom: 5
  },
});

export default ErrorCard;
