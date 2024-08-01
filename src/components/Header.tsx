import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Icon2 from "react-native-vector-icons/Fontisto";
// import Icon from "react-native-vector-icons/Fontisto";
import Icon from "@expo/vector-icons/FontAwesome";
import Icon2 from "@expo/vector-icons/Fontisto";
import Carousel from "./Carousel";

import { Entypo } from "@expo/vector-icons";

import * as Font from "expo-font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { LinearGradient } from "expo-linear-gradient";
import Carousel2 from "./Carousel2";
import * as Location from "expo-location";
// import { Font } from 'expo'

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
const loadFonts = async () => {
  await Font.loadAsync({
    "Gilroy-Semibold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
  });
};

const Header = ({ navigation, route }: HomeProps) => {
  // const Navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [showLocationOption,setShowLocationOption] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
      setIsLoading(true);
      const {status} = await Location.requestForegroundPermissionsAsync();
      console.log("status",status);
      if(status !== "granted"){
        Alert.alert('Invalid', 'Location is required to use (use current location) option', [
          {
            text: 'Cancel',
            onPress: () => {
              Alert.alert("Alert !!","If you not give location permission then you are not able to change addresss");
              setIsLoading(false);
            },
            style: 'cancel',
          },
          {text: 'Open setting', onPress: () => {
            Linking.openSettings();
            setIsLoading(false);
          }},
        ]);
  }else{
    const location = await Location.getCurrentPositionAsync();
        const {latitude,longitude} = location?.coords;
        console.log("location coords",latitude,longitude);
        setIsLoading(false)
      
    setModalVisible(!modalVisible);
    setShowLocationOption(false);
    navigation.navigate("AddAddress",{
      coords:{latitude,longitude}
    })
  }
}

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <LinearGradient
          colors={["#69AF5D", "#4B933F"]}
          style={{ borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}
        >
          <ScrollView>
            <View style={styles.main}>
              <View>
                <Text
                  style={[
                    styles.headerText,
                    { fontSize: 14, fontFamily: "Gilroy-Bold" },
                  ]}
                >
                  Delivery in
                </Text>
                <Text
                  style={[
                    styles.headerText,
                    { fontSize: 26, fontFamily: "Gilroy-Bold" },
                  ]}
                >
                  10 minutes
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        fontSize: 14,
                        marginTop: 10,
                        fontFamily: "Gilroy",
                        color: "white",
                      },
                    ]}
                    onPress={() => setModalVisible(true)}
                  >
                    Home - Vijay Nagar, Lalghati, Bhopal-462030{" "}
                    <Icon
                      name="chevron-down"
                      size={15}
                      color="#ffffff"
                      onPress={() => setModalVisible(true)}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
              style={{
                backgroundColor: "white",
                margin: 20,
                borderRadius: 15,
                marginTop: 30,
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 20,
                  padding: 12,
                }}
              >
                <View>
                  <Icon name="search" size={20} color="gray" />
                </View>
                <View>
                  <Text style={{ color: "#0000004d", fontSize: 17 }}>
                    Search Products
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
        <Carousel />
        {modalVisible ? (
         <View style={{width:"100%",height:"80%",backgroundColor:"#fff"}}>
            <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
            <View style={{position:"absolute",width:60,height:60,backgroundColor:"#FFf",justifyContent:"center",alignItems:"center",borderRadius:50,padding:5}}>
              <TouchableOpacity style={{width:50,height:50,justifyContent:"center",alignItems:"center",backgroundColor:"rgb(105,175,94)",borderRadius:50}} onPress={() => {
                setModalVisible(!modalVisible);
                setShowLocationOption(false);
              }}>
                <Entypo name="cross" size={20} color={"#fff"}/>
              </TouchableOpacity>
             </View>
            </View>

             <View style={{justifyContent:"center",alignItems:"center",marginTop:100,gap:40}}>
              <Text style={{fontSize:18,fontWeight:"500",color:"#818181"}}>Update your Address</Text>
               <View style={{paddingHorizontal:10,width:"100%"}}>
               {showLocationOption == false && <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",width:"100%",justifyContent:"center",alignItems:"center",paddingVertical:15,borderRadius:10}} onPress={() => {
                // getCurrentLocation();
                setShowLocationOption(!showLocationOption);
               
               }}>
                <Text style={{color:"white",fontWeight:"bold"}}>Add new address</Text>
              </TouchableOpacity>}

              {showLocationOption && <View style={{gap:5}}>
              <TouchableOpacity style={{backgroundColor:"rgb(105,175,94)",width:"100%",justifyContent:"center",alignItems:"center",paddingVertical:15,borderRadius:10}} onPress={() => {
                getCurrentLocation();
               
               }}>
                {isLoading ? <ActivityIndicator size={20} color={"#fff"}/> : <Text style={{color:"white",fontWeight:"bold"}}>Use Current Location</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:"#fff",width:"100%",justifyContent:"center",alignItems:"center",paddingVertical:15,borderRadius:10,borderWidth:1.5,borderColor:"rgb(233,233,233)"}} onPress={() => navigation.navigate("SelectAddress")}>
                <Text style={{color:"rgb(105,175,94)",fontWeight:"bold"}}>Select Location</Text>
              </TouchableOpacity>
              </View>
}
               </View>
             </View>
         </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "auto",
  },
  main: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  headerText: {
    color: "white",
  },

  //   Bottom Popup
  addressParent: {
    width: "100%",
    height: "85%",
    // paddingTop:50
  },
  minusIcon: {
    textAlign: "center",
  },
  addressBtnContainer: {
    width: "100%",

    backgroundColor: "lightgrey",

    height: 60,
    display: "flex",
    paddingHorizontal: "2%",

    justifyContent: "center",
  },
  selectAddressMainContainer: {
    width: "100%",
    paddingHorizontal: "2%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  addressText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  noAddressText: {
    textAlign: "center",
    fontSize: 12,
  },
  addressBtnContainerText: {
    borderRadius: 5,

    width: "98%",
    marginHorizontal: "1%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  addressText2: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
function componentDidMount() {
  throw new Error("Function not implemented.");
}

{
  /* <View>
<TouchableOpacity>
  <Icon2
    onPress={() => {
      setModalVisible(false);
    }}
    name="minus-a"
    size={40}
    color="rgba(0, 0, 0, 0.459)"
    style={styles.minusIcon}
  />
</TouchableOpacity>
</View>
<View style={styles.selectAddressMainContainer}>
<Text style={styles.addressText}>Select Address</Text>
<Text style={styles.noAddressText}>No address available</Text>

<View style={styles.addressBtnContainer}>
  <TouchableOpacity
    onPress={() => {
      navigation.navigate("AddAddress");
    }}
  >
    <View style={styles.addressBtnContainerText}>
      <Text style={styles.addressText2}>Add new address</Text>
    </View>
  </TouchableOpacity>
</View>
</View> */
}
