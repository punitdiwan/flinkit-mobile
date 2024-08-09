// import React, { useEffect, useState } from "react";
// import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { Linking } from "react-native";
// import { googleApiKey } from "../../lib/constant";
// import { useIsFocused } from "@react-navigation/native";

// const AddAddress = () => {
//   const focused = useIsFocused();

//   const [useLocation, setUseLocation] = useState(false);
//   const [coords,setCoords] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   })
  
//   const getLocationFormattedDataUsingCoords = async (latitude,longitude) => {
//      try {
//          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`);
//          const jsonData = await response?.json();
//          console.log("locationname",jsonData?.results[1]?.formatted_address);
//      } catch (error) {
//        console.log(error);
       
//      }
//   }

//   const getUserCurrentLocation = async () => {
//     try {
//       if(useLocation == true){
//       const {status} = await Location.requestForegroundPermissionsAsync();
//       console.log("status",status);
//       if(status !== "granted"){
//         Alert.alert('Invalid', 'Location is required to use (use current location) option', [
//           {
//             text: 'Cancel',
//             onPress: () => {setUseLocation(!useLocation)},
//             style: 'cancel',
//           },
//           {text: 'Open setting', onPress: () => {Linking.openSettings();getUserCurrentLocation()}},
//         ]);
//       }else{
//         const location = await Location.getCurrentPositionAsync();
//         const {latitude,longitude} = location?.coords;
        
//         setCoords(prevCoords => ({
//           ...prevCoords,
//           latitude:latitude,
//           longitude:longitude
//         }))

//         getLocationFormattedDataUsingCoords(latitude,longitude);
//         return location;
  
//       }
//     }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     console.log("calling second");
    
//      getUserCurrentLocation();
//   },[useLocation]);

//  useEffect(() => {
//     getUserCurrentLocation();
 
//  },[focused])


//   return (
//     <View style={{backgroundColor:"#fff"}}>
//       <View style={{ flexDirection: "row", justifyContent: "space-around",marginVertical:10}}>
//         <TouchableOpacity
//           style={useLocation ? {
//             backgroundColor:"rgb(105,175,94)",
//             paddingHorizontal: 20,
//             paddingVertical: 5,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 20,
//           } : {
//             backgroundColor: "#fff",
//             paddingHorizontal: 20,
//             paddingVertical: 5,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 20,
//              borderWidth:1,
//             borderColor:"rgb(233,233,233)"
//           }}
//           onPress={() => setUseLocation(!useLocation)}
//         >
//           <Text style={useLocation ? {fontWeight:"bold",color:"#fFf"} :{ fontWeight: "bold", color: "black" }}>
//             Use current Location
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={useLocation ? {
         

//             backgroundColor: "#fff",
//             paddingHorizontal: 20,
//             paddingVertical: 5,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 20,
//             borderWidth:1,
//             borderColor:"rgb(233,233,233)"
//           } : {
//             backgroundColor:"rgb(105,175,94)",
//             paddingHorizontal: 20,
//             paddingVertical: 5,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 20,
//           }}
//           onPress={() => setUseLocation(!useLocation)}
//         >
//           <Text style={useLocation ? { color: "black", fontWeight: "bold" } : { color: "#fff", fontWeight: "bold" }}>
//             Enter Location
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{paddingHorizontal:10,marginBottom:115,backgroundColor:"#fff"}}>
//         {useLocation ? (
//           <View>
//             <MapView
//               initialRegion={coords}
//               style={{width:"100%",height:"100%"}}
//             >
//               <Marker coordinate={coords}/>
//             </MapView>
//           </View>
//         ) : (
//           ""
//         )}
//       </View>
//     </View>
//   );
// };

// export default AddAddress;



import React, { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Linking } from "react-native";
import { googleApiKey } from "../../lib/constant";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

const AddAddress = () => {
  const route = useRoute()
  const cords =  route?.params
  const {latitude,longitude} = route?.params?.coords;
  const navigation = useNavigation();
  
  const focused = useIsFocused();

  const [userLocation, setUserLocation] = useState("");

  const [coords,setCoords] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  
  const getLocationFormattedDataUsingCoords = async (latitude : any,longitude:any) => {
     try {
         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`);
         const jsonData = await response?.json();
         console.log("locationname",jsonData?.results[1]?.formatted_address);
         setUserLocation(jsonData?.results[1]?.formatted_address);
     } catch (error) {
       console.log(error);
       
     }
  }

const saveAddress = () => {
  console.log("address",);
  navigation.navigate("Home")
  
}

useEffect(() => {
   getLocationFormattedDataUsingCoords(latitude,longitude);
},[focused])


  return (
    <View style={{backgroundColor:"#fff"}}>

      <View style={{backgroundColor:"#fff"}}>
          <View>
            <MapView
              initialRegion={coords}
              style={{width:"100%",height:"100%"}}
            >
              <Marker coordinate={coords}/>
            </MapView>
          </View>
         
         <View style={{width:"100%",height:"auto",position:"absolute",flexDirection:"row",paddingHorizontal:10,marginVertical:7,justifyContent:"center",bottom:10}}>
           {userLocation.length > 0 && <TouchableOpacity style={{backgroundColor:"#000",paddingHorizontal:60,borderRadius:10,paddingVertical:8,width:"100%",justifyContent:"center",alignItems:"center"}} onPress={() => saveAddress()}>
              <Text style={{color:"white",fontWeight:"bold",fontSize:18}}>Save</Text>
            </TouchableOpacity>}
        </View>

      </View>
    </View>
  );
};

export default AddAddress;





// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import Search from "./Search";
// import AddNewAddressBtn from "./AddNewAddress";
// import { Text } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// // import { googleApiKey } from "../../lib/constant";
// import { Entypo, AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import GetLocation from 'react-native-get-location'
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// const googleApiKey = "AIzaSyBpcS0RtHe9js4JhdXVZ5J2Omf4bVe6dkI"

// const AddAddress = () => {
//   const navigation = useNavigation();
//   const ref = useRef();
//   const [newLocation, setNewLocation] = useState("");

//   const [location,setLocation] = useState({
//     latitude:"",
//     longitude:""
//   });

//   console.log("actualLocation",location);

//   const handleChangeLocation = () => {
//     console.log("changing location");
//     if (!newLocation) {
//       Alert.alert("Invalid", "Please enter your location");
//     } else {
//       navigation.navigate("BottomNav");
//     }
//   };

//   const updateLatitudeAndLongitude = (cords) => {
//     setLocation({
//       latitude: cords?.latitude,
//       longitude:cords?.longitude
//     })
//     getAddressNameUsingLatitudeAndLongitude();
//   }

//   const getAddressNameUsingLatitudeAndLongitude = async () => {
//     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${googleApiKey}`);

//     const json = await response.json();
//     console.log("json",json?.results[1]?.formatted_address);
//   }

//   const getCurrentLocation = async () => {
//     try {

//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Location's Permission",
//           "If you not give location permission then you not able to track user location",
//           [
//             {
//               text: "Give Location Permission",
//               onPress: () => {
//                 Linking.openSettings();
//                 // navigation.navigate("BottomNav");
//               },
//               // style: 'cancel',
//             },
//             { text: "OK", onPress: () => navigation.navigate("(tabs)") },
//           ]
//         );
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       console.log("locatuin",location);

//       // setLocation(location);
//       updateLatitudeAndLongitude(location?.coords);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [option,setOption] = useState("false")

//   return (
//     <View
//       style={{
//         width: "100%",
//         height: "100%",
//         gap: 25,
//         // paddingVertical: 20,
//         paddingHorizontal: 10,console.log("calling");
      
//         backgroundColor: "#fff",
//         justifyContent: "space-around",
//       }}
//     >
//       <View style={{flexDirection:"row",justifyContent:"space-around"}}>
//         <View style={{backgroundColor:"rgb(105,175,94)",paddingHorizontal:30,paddingVertical:5,borderRadius:5}}><Text style={{color:"white",fontWeight:"500"
//         }}>Enter Address</Text></View>
//           <View style={{backgroundColor:"rgb(105,175,94)",paddingHorizontal:10,paddingVertical:5,borderRadius:5}}><Text style={{color:"white",fontWeight:"500"
//         }}>use current Location</Text></View>
//       </View>

//        <TouchableOpacity onPress={() => getCurrentLocation()} style={{borderWidth:1.5,borderColor:"rgb(105,175,94)",paddingVertical:5,paddingHorizontal:10,width:200,flexDirection:"row",gap:5,borderRadius:5}}>
//        <MaterialIcons name="my-location" size={24} color="rgb(105,175,94)" /><Text style={{color:"rgb(105,175,94)"}}>use current location</Text>
//        </TouchableOpacity>

//         <View style={{backgroundColor:"red"}}>
//        <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <Image
//           source={{
//             uri: "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png",
//           }}
//           style={{ width: 100, height: 100 }}
//         />
//       </View>

//       <View style={{ height: 340 }}>
//         <GooglePlacesAutocomplete
//           placeholder="Enter your full address"
//           minLength={2}
//           autoFocus={true}
//           returnKeyType={"default"}
//           fetchDetails={true}
//           query={{
//             key: "AIzaSyBpcS0RtHe9js4JhdXVZ5J2Omf4bVe6dkI",
//             language: "en",
//           }}
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             console.log(data, details);
//             setNewLocation(data);
//           }}
//           styles={{
//             textInputContainer: {
//               backgroundColor: "#Fff",
//               borderRadius: 5,
//               elevation: 10,
//             },
//             textInput: {
//               height: 38,
//               color: "#000",
//               fontSize: 16,
//               backgroundColor: "#fff",
//               borderRadius: 10,
//             },
//             predefinedPlacesDescription: {
//               color: "#1faadb",
//             },
//           }}
//         />
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: "rgb(105,175,94)",
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               paddingVertical: 12,
//               borderRadius: 10,
//             }}
//             onPress={() => {
//               handleChangeLocation();
//             }}
//           >
//             <Text style={{ fontWeight: 500, color: "white", fontSize: 16 }}>
//               Save
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//       </View>
//     </View>
//   );
// };

// export default AddAddress;

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     justifyContent: "space-around",
//   },
//   map: {
//     width: "100%",
//     height: "92%",
//   },
//   addNewAddressMain: {
//     width: "100%",
//   },

//   addNewAddress: {
//     width: "100%",
//     height: 70,
//     display: "flex",
//     justifyContent: "space-around",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   addNewText: {
//     backgroundColor: "green",
//     width: "96%",
//     marginHorizontal: "2%",
//     paddingVertical: 12,
//     textAlign: "center",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 18,
//     borderRadius: 10,
//   },
//   searchAddress: {
//     width: "85%",
//     borderWidth: 1,
//     borderColor: "red",
//   },
// });

// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import Search from "./Search";
// import AddNewAddressBtn from "./AddNewAddress";
// import { Text } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { googleApiKey } from "../../lib/constant";
// import { Entypo, AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const AddAddress = () => {
//   const navigation = useNavigation();
//   const ref = useRef();
//   const [newLocation, setNewLocation] = useState("");

//   const handleChangeLocation = () => {
//     console.log("changing location");
//     if (!newLocation) {
//       Alert.alert("Invalid", "Please enter your location");
//     } else {
//       navigation.navigate("BottomNav");
//     }
//   };

//   return (
//     <View
//       style={{
//         width: "100%",
//         height: "100%",
//         gap: 25,
//         paddingVertical: 20,
//         paddingHorizontal: 10,
//         backgroundColor: "#fff",
//         justifyContent: "space-around",
//       }}
//     >
// <View style={{ justifyContent: "center", alignItems: "center" }}>
//   <Image
//     source={{
//       uri: "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png",
//     }}
//     style={{ width: 100, height: 100 }}
//   />
// </View>

//       <View style={{paddingHorizontal:10}}>
//         <Text>Your location</Text>
//       </View>

//       <View style={{ height: 340 }}>
//         <GooglePlacesAutocomplete
//           placeholder="Enter your full address"
//           minLength={2}
//           autoFocus={true}
//           returnKeyType={"default"}
//           fetchDetails={true}
//           query={{
//             key: "AIzaSyBpcS0RtHe9js4JhdXVZ5J2Omf4bVe6dkI",
//             language: "en",
//           }}
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             console.log(data, details);
//             setNewLocation(data);
//           }}
//           styles={{
//             textInputContainer: {
//               backgroundColor: "#Fff",
//               borderRadius: 5,
//               elevation: 10,
//             },
//             textInput: {
//               height: 38,
//               color: "#000",
//               fontSize: 16,
//               backgroundColor: "#fff",
//               borderRadius: 10,
//             },
//             predefinedPlacesDescription: {
//               color: "#1faadb",
//             },
//           }}
//         />

//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: "rgb(105,175,94)",
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//               paddingVertical: 12,
//               borderRadius: 10,
//             }}
//             onPress={() => {
//               handleChangeLocation();
//             }}
//           >
//             <Text style={{ fontWeight: 500, color: "white", fontSize: 16 }}>
//               Save
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default AddAddress;

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     justifyContent: "space-around",
//   },
//   map: {
//     width: "100%",
//     height: "92%",
//   },
//   addNewAddressMain: {
//     width: "100%",
//   },

//   addNewAddress: {
//     width: "100%",
//     height: 70,
//     display: "flex",
//     justifyContent: "space-around",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   addNewText: {
//     backgroundColor: "green",
//     width: "96%",
//     marginHorizontal: "2%",
//     paddingVertical: 12,
//     textAlign: "center",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 18,
//     borderRadius: 10,
//   },
//   searchAddress: {
//     width: "85%",
//     borderWidth: 1,
//     borderColor: "red",
//   },
// });
