import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

// const googleApiKey="";
const googleApiKey="AIzaSyBpcS0RtHe9js4JhdXVZ5J2Omf4bVe6dkI";


const SelectLocation = () => {
    const focus = useIsFocused();
    const [refresh,setRefresh] = useState(true);

    const [location,setLocation] = useState("");
    const navigation = useNavigation();

    // handleLocationSubmit
    const handleSubmit = async () => {
      const placeId = location?.place_id;
      
        if(!location){
            alert("Please select your location");
            // showAlert();
        }else{
          getPostalCode(placeId)
          ref.current?.setAddressText('');
          navigation.navigate("BottomNav");
        }
    }

    // getting loaction postal code
    const getPostalCode = (placeId) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${googleApiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log("dd",data?.results[0]?.geometry);
        
        const result = data.results[0];
        if (result) {
          const addressComponents = result.address_components;
          let postalCode = null;
    
          if (addressComponents) {
            addressComponents.forEach(component => {
              if (component.types.includes('postal_code')) {
                postalCode = component.long_name;
              }
            });
          }
    
          console.log('Postal Code:', postalCode);
        } else {
          console.error('No results found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
    }
    

    const ref = useRef();

    return (
      <>
      <StatusBar backgroundColor='#fff'/>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View>
            <Image source={require("../../assets/location.png")} style={{height:200,width:"100%",backfaceVisibility:"hidden"}}/>
        </View>
        <Text style={{fontWeight:"bold",color:"rgb(140,140,140)"}}>Your Location</Text>

              <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
           
              <GooglePlacesAutocomplete
                ref={ref}
                autoFocus={true}
                placeholder='Search your location'
                debounce={100}
                query={{
                    key:googleApiKey,
                    language: 'en',
                    components: 'country:in',
                }}
                styles={styles.textInput}
                onPress={item => {
                    setLocation(item);
                }}
            />
            <Text style={{borderBottomWidth:1,borderBottomColor:"rgb(233,233,233)",position:"absolute",width:"100%",top:20}}></Text>
            {/* <Text style={{borderBottomWidth:2,borderBottomColor:"red"}}></Text> */}
              <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",paddingVertical:15,borderRadius:10,position:"absolute",width:"100%",bottom:30}}>
                <Text style={{textAlign:"center",fontSize:15,fontWeight:"bold",color:"white"}} onPress={() =>handleSubmit()}>Submit</Text>
              </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
          </>
      );
}



export default SelectLocation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor:"red"
    },
    inner: {
      paddingHorizontal: 24,
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor:"white"
      
    },
    header: {
      fontSize: 36,
      marginBottom: 48,
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      // marginBottom: 36,
      // backgroundColor:"red",
      // width:"100%"
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12
    },
  });
  

