import React, { useState } from 'react';
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

// const googleApiKey="";



const SelectLocation = () => {
    const [location,setLocation] = useState("");
    const navigation = useNavigation();
    const handleSubmit = () => {
        if(!location){
            alert("Please select your location");
            // showAlert();
        }else{
             navigation.navigate("BottomNav");
        }
    }

    return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
         
              
              {/* <TextInput placeholder="Username" style={styles.textInput} />*/}
              <View style={{marginBottom:10}}>
            <Image source={require("../../assets/location.png")} style={{height:200,width:"100%",backfaceVisibility:"hidden"}}/>
        </View>
        <Text style={{fontWeight:"bold",color:"rgb(140,140,140)"}}>Your Location</Text>

              <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
           
              <GooglePlacesAutocomplete
                placeholder='Search your location'
                debounce={300}
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
              <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",paddingVertical:15,borderRadius:10}}>
                <Text style={{textAlign:"center",fontSize:15,fontWeight:"bold",color:"white"}} onPress={() =>handleSubmit()}>Submit</Text>
              </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
      );
}



export default SelectLocation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      padding: 24,
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
      marginBottom: 36,
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
    },
  });
  

