import React, { useState } from 'react';
import {View,Text,Image, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const googleApiKey = "";

const SelectLocation = () => {
    const navigation = useNavigation();

    const [location,setLocation] = useState("");
    // console.log("location",location);
    
    const showAlert = () => {
        Alert.alert(
          'Location',
          'Select your Location',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      };
    
    const handleSubmit = () => {
        if(!location){
            // alert("Please select your location");
            showAlert();
        }else{
             navigation.navigate("BottomNav");
        }
    }

  return (
    <SafeAreaView>
        <ScrollView style={{minHeight:"100%",backgroundColor:"white"}}>
    <View style={{minHeight:"100%",width:"100%",paddingHorizontal:5,backgroundColor:"white"}}>
        <View style={{marginBottom:20}}>
            <Image source={require("../../assets/location.png")} style={{height:200,backfaceVisibility:"hidden"}}/>
        </View>
        <View style={{justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:25,fontWeight:"400",color:"rgb(24,23,37)"}}>Select Your Location</Text>
            <Text style={{textAlign:"center",paddingTop:5,color:"rgb(164,164,164)"}}>Switch on your location to stay in tune with{"\n"}What's happening in your area</Text>
        </View>
        <View style={{paddingHorizontal:20,marginTop:50}}>
            <Text style={{fontWeight:"bold",fontSize:15,color:"rgb(164,164,164)",marginBottom:10}}>Your Location</Text>
            <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
            <GooglePlacesAutocomplete
                placeholder='Search your location'
                debounce={400}
                query={{
                    key:googleApiKey,
                    language: 'en',
                    components: 'country:in',
                }}
                styles={{borderBottomWidth:1,borderBottomColor:"rgb(164,164,164)",paddingVertical:3,marginBottom:10}}
                onPress={item => {
                    setLocation(item);
                }}
            />
            </View>
        </View>
        <View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingHorizontal:20,marginTop:50}}>
            <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",width:"100%",paddingHorizontal:10,paddingVertical:15,justifyContent:"center",alignItems:"center",borderRadius:10}} onPress={handleSubmit}>
                <Text style={{fontSize:16,fontWeight:"bold",color:"white"}} >Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SelectLocation